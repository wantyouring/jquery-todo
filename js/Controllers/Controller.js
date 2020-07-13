define(['jquery', 'Views/HeaderView', 'Models/Todo'], function ($, HeaderView, Todo) {    
    var todos = [];
    
    $('.new-todo').keypress(function (e) {
        var value = e.currentTarget.value;
        if (e.keyCode === 13 && typeof value !== 'undefined' && value) {
            todos.push(new Todo(value));
            HeaderView.clearInput();
        }
    });
});
