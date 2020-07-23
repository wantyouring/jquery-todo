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

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value;
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
                    $('#' + dataId)
                        .toggleClass('completed')
                        .find('input:checkbox')
                        .prop('checked', !todo.isCompleted);
                    todo.setIsCompleted(!todo.isCompleted);
                }
            });
        }
    });
});
