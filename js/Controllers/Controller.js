define([
    'jquery',
    'Views/HeaderView',
    'Views/BodyView',
    'Views/FooterView',
    'Models/Todo',
], function ($, HeaderView, BodyView, FooterView, Todo) {
    var ENTER_KEY = 13,
        ESC_KEY = 27;
    var str = localStorage.getItem('todos-data');
    var todos = str ? JSON.parse(str) : [];
    var filter = window.location.hash.substring(2) || 'all';
    var saveStorage = function () {
        localStorage.setItem('todos-data', JSON.stringify(todos));
    };
    var callbackTodosChange = function () {
        HeaderView.setToggleAllButton(
            todos.every(function (todo) {
                return todo.isCompleted;
            })
        );
        BodyView.renderTodos(todos);
        FooterView.updateFooter(todos);
        saveStorage();
    };

    todos = todos.map(function (todo) {
        return new Todo(todo);
    });

    callbackTodosChange();

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value.trim();
        var todo = new Todo({ title: value });

        if (e.keyCode === ENTER_KEY && typeof value !== 'undefined' && value) {
            todos.push(todo);
            saveStorage();
            BodyView.addTodo(todo);
            HeaderView.clearInput();
            FooterView.updateFooter(todos);
        }
    });

    $('.todo-list')
        .on('click', '.toggle', function (e) {
            var dataId = $(e.target).closest('li').attr('id');

            todos.forEach(function (todo) {
                if (todo.dataId === dataId) {
                    todo.setIsCompleted(!todo.isCompleted);
                }
            });
            callbackTodosChange();
        })
        .on('dblclick', 'label', function (e) {
            var $todo = $(e.target).closest('li'),
                $input = $todo.find('.edit'),
                title = $input.val();

            $todo.addClass('editing');
            $input.focus().val('').val(title);
        })
        .on('focusout', '.edit', function (e) {
            var $target = $(e.target).closest('li');
            var dataId = $target.attr('id');
            var title = $target.find('.edit').val();

            todos.forEach(function (todo, index) {
                if (todo.dataId === dataId) {
                    title ? todo.setTitle(title) : todos.splice(index, 1);
                }
            });
            callbackTodosChange();
        })
        .on('keyup', '.edit', function (e) {
            if (e.keyCode !== ENTER_KEY && e.keyCode !== ESC_KEY) {
                return;
            }
            var $target = $(e.target).closest('li');
            if (e.keyCode === ESC_KEY)
                $target.find('.edit').val($target.find('label').text());
            e.target.blur();
        })
        .on('click', '.destroy', function (e) {
            var dataId = $(e.target).closest('li').attr('id');

            todos.splice(
                todos.findIndex(function (todo) {
                    return todo.dataId === dataId;
                }),
                1
            );
            callbackTodosChange();
        });

    $('#toggle-all').click(function (e) {
        todos.forEach(function (todo) {
            todo.setIsCompleted(e.target.checked);
        });
        callbackTodosChange();
    });

    $('.filters li a').click(function (e) {
        filter = $(e.currentTarget).attr('id');

        BodyView.handleFilter(filter, todos);
        FooterView.handleFilter(filter);
    });

    $('.clear-completed').click(function () {
        todos = todos.filter(function (todo) {
            return !todo.isCompleted;
        });
        saveStorage();
        BodyView.renderTodos(todos);
        FooterView.updateFooter(todos);
    });
});
