define([
    'jquery',
    'Views/HeaderView',
    'Views/BodyView',
    'Views/FooterView',
    'Models/Todo',
], function ($, HeaderView, BodyView, FooterView, Todo) {
    var str = localStorage.getItem('todos-data');
    var todos = str ? JSON.parse(str) : [];
    var filter = window.location.hash.substring(2) || 'all';

    todos = todos.map(function (todo) {
        return new Todo(todo);
    });

    BodyView.renderTodos(todos);
    FooterView.updateFooter();

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value.trim();
        var todo = new Todo({ title: value });

        if (e.keyCode === 13 && typeof value !== 'undefined' && value) {
            todos.push(todo);
            localStorage.setItem('todos-data', JSON.stringify(todos));
            BodyView.addTodo(todo);
            HeaderView.clearInput();
        }
    });

    $('.todo-list').on('click', 'li', function (e) {
        var dataId = $(e.currentTarget).attr('id');

        if ($(e.target).hasClass('toggle')) {
            todos.forEach(function (todo) {
                if (todo.dataId === dataId) {
                    todo.setIsCompleted(!todo.isCompleted);
                }
            });
        }
        BodyView.renderTodos(todos);
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
        BodyView.renderTodos(todos);
    });

    $('.filters li a').click(function (e) {
        filter = $(e.currentTarget).attr('id');

        BodyView.handleFilter(filter, todos);
        FooterView.handleFilter(filter);
    });
});
