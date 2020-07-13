// require 기본 셋팅.
requirejs.config({
    paths: {
        jquery: '../libs/jquery-3.5.1.min',
        jsrender: '../libs/jsrender.min',
        text: '../libs/text',
    },
});

// main js코드
require(['Controllers/Controller']);
