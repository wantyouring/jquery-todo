define(['jsrender', 'text!templates/todo.html'], function ($, todoTemplate) {
    var $todoList = $('.todo-list'),
        $main = $('.main'),
        filter = window.location.hash.substring(2) || 'all';

    function appendTodo(todo) {
        var todoHtml = $.templates(todoTemplate).render(todo);
        $todoList.append(todoHtml);
    }

    function addTodo(todo) {
        if (
            (filter === 'active' && !todo.isCompleted) ||
            (filter === 'completed' && todo.isCompleted) ||
            filter === 'all'
        ) {
            appendTodo(todo);
        }
        filter !== 'completed' && showMain(true);
    }

    function showMain(show) {
        $main.toggleClass('hide', !show);
    }

    function renderTodos(todos) {
        var filteredTodos = getFilteredTodos(todos);
        $todoList.empty();

        getFilteredTodos(todos).forEach(function (todo) {
            appendTodo(todo);
        });
        showMain(filteredTodos.length !== 0);
    }

    function getFilteredTodos(todos) {
        if (filter === 'active') {
            return todos.filter(function (todo) {
                return !todo.isCompleted;
            });
        } else if (filter === 'completed') {
            return todos.filter(function (todo) {
                return todo.isCompleted;
            });
        } else {
            return todos;
        }
    }

    function handleFilter(_filter, todos) {
        filter = _filter;
        renderTodos(todos);
    }

    return {
        addTodo: addTodo,
        renderTodos: renderTodos,
        handleFilter: handleFilter,
    };
});
