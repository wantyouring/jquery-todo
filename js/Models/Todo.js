define(function () {
    function Todo(title) {
        this.title = title;
        this.isCompleted = false;
    }

    Todo.prototype.setIsCompleted = function (isCompleted) {
        this.isCompleted = isCompleted;
    };

    Todo.prototype.setTitle = function (title) {
        this.title = title;
    };

    return Todo;
});
