define(['jquery'], function ($) {
    var $footer = $('.footer'),
        $activeTodosCount = $('#active-todos-count'),
        $activeTodosWord = $('#active-todos-word'),
        $filters = $('.filters'),
        filter = window.location.hash.substring(2) || 'all';

    function handleFilter(_filter) {
        filter = _filter;
        updateFilter();
    }

    function showFooter(show) {
        $footer.toggleClass('hide', !show);
    }

    function updateFooter(todos) {
        var _activeTodosCount = activeTodosCount(todos);
        $activeTodosCount.text(_activeTodosCount);
        $activeTodosWord.text(_activeTodosCount === 1 ? 'item' : 'items');
        updateFilter();
        showFooter(todos.length !== 0);
    }

    function activeTodosCount(todos) {
        return todos.filter(function (todo) {
            return !todo.isCompleted;
        }).length;
    }

    function updateFilter() {
        $filters.find('.selected').removeClass('selected');
        $filters.find('#' + filter).addClass('selected');
    }

    return {
        handleFilter: handleFilter,
        updateFooter: updateFooter,
    };
});
