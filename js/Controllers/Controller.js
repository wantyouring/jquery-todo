define([
    'jquery',
    'Views/HeaderView',
    'Views/BodyView',
    'Models/Todo',
], function ($, HeaderView, BodyView, Todo) {
    var str = localStorage.getItem('todos-data');
    var todos = str ? JSON.parse(str) : [];

    todos.forEach(function (todo) {
        BodyView.addTodo(todo);
    });

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value;
        var todo = new Todo(value);

        if (e.keyCode === 13 && typeof value !== 'undefined' && value) {
            todos.push(todo);
            localStorage.setItem('todos-data', JSON.stringify(todos));
            BodyView.addTodo(todo);
            HeaderView.clearInput();
        }
    });
});
