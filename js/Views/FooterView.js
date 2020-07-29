define(['jquery'], function ($) {
    var $filters = $('.filters'),
        filter = window.location.hash.substring(2) || 'all';

    function handleFilter(_filter) {
        filter = _filter;
        updateFilter();
    }

    function updateFooter() {
        updateFilter();
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
