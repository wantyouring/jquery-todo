define(['jsrender', 'text!templates/todo.html'], function ($, todoTemplate) {
    function addTodo(todo) {
        var todoHtml = $.templates(todoTemplate).render(todo);
        $('.todo-list').append(todoHtml);
    }

    return { addTodo: addTodo };
});
