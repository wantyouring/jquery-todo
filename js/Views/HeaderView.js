// todo의 Header부분 렌더링
// 전체 체크 버튼 + todo input

define(['jquery'], function ($) {
    function clearInput() {
        $('.new-todo').val('');
    }
    return {
        clearInput: clearInput,
    };
});
