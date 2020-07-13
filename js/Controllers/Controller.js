define([
    'jquery',
    'Views/HeaderView',
    'Views/BodyView',
    'Models/Todo',
], function ($, HeaderView, BodyView, Todo) {
    var todos = [];

    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value;
        var todo = new Todo(value);

        if (e.keyCode === 13 && typeof value !== 'undefined' && value) {
            todos.push(todo);
            BodyView.addTodo(todo);
            HeaderView.clearInput();
        }
    });
});
