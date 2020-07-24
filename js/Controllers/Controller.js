define([
    'jquery',
    'Views/HeaderView',
    'Views/BodyView',
    'Models/Todo',
], function ($, HeaderView, BodyView, Todo) {
    var str = localStorage.getItem('todos-data');
    var todos = str ? JSON.parse(str) : [];

    todos = todos.map(function (todo) {
        return new Todo(todo);
    });

    todos.forEach(function (todo) {
        BodyView.addTodo(todo);
    });

    BodyView.toggleMain(todos);

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value;
        var todo = new Todo({ title: value });

        if (e.keyCode === 13 && typeof value !== 'undefined' && value) {
            todos.push(todo);
            localStorage.setItem('todos-data', JSON.stringify(todos));
            BodyView.addTodo(todo);
            HeaderView.clearInput();
            HeaderView.setToggleAllButton(false);
        }
    });

    $('.todo-list').on('click', 'li', function (e) {
        var dataId = $(e.currentTarget).attr('id');

        if ($(e.target).hasClass('toggle')) {
            todos.forEach(function (todo) {
                if (todo.dataId === dataId) {
                    BodyView.toggleTodo(todo);
                    todo.setIsCompleted(!todo.isCompleted);
                }
            });
        }
        HeaderView.setToggleAllButton(
            todos.every(function (todo) {
                return todo.isCompleted;
            })
        );
    });

    $('#toggle-all').click(function () {
        var allChecked = todos.every(function (todo) {
            return todo.isCompleted;
        });
        todos.forEach(function (todo) {
            todo.setIsCompleted(!allChecked);
        });
        HeaderView.setToggleAllButton(!allChecked);
        BodyView.toggleTodos(allChecked);
    });
});
