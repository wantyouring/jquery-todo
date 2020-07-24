// todo의 Header부분 렌더링
// 전체 체크 버튼 + todo input

define(['jquery'], function ($) {
    var $toggleAll = $('#toggle-all');
    var $newTodo = $('.new-todo');

    function clearInput() {
        $newTodo.val('');
    }

    function setToggleAllButton(allChecked) {
        $toggleAll.prop('checked', allChecked);
    }

    return {
        clearInput: clearInput,
        setToggleAllButton: setToggleAllButton,
    };
});
