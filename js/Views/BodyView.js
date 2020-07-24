define(['jsrender', 'text!templates/todo.html'], function ($, todoTemplate) {
    var $todoList = $('.todo-list'),
        $main = $('.main');

    function addTodo(todo) {
        var todoHtml = $.templates(todoTemplate).render(todo);
        $todoList.append(todoHtml);
        toggleMain();
    }

    function toggleToChecked(target, checked) {
        target
            .toggleClass('completed', checked)
            .find('input:checkbox')
            .prop('checked', checked);
    }

    function toggleTodo(todo) {
        toggleToChecked($('#' + todo.dataId), !todo.isCompleted);
    }

    function toggleTodos(allChecked) {
        toggleToChecked($todoList.find('li'), !allChecked);
    }

    function toggleMain(todos) {
        var isHide = todos ? todos.length === 0 : false;
        $main.toggleClass('hide', isHide);
    }

    return {
        addTodo: addTodo,
        toggleTodo: toggleTodo,
        toggleTodos: toggleTodos,
        toggleMain: toggleMain,
    };
});
