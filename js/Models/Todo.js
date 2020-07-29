define(function () {
    function Todo(todo) {
        this.dataId = todo.dataId || uuidv4();
        this.title = todo.title;
        this.isCompleted = todo.isCompleted || false;
    }

    Todo.prototype.setIsCompleted = function (isCompleted) {
        this.isCompleted = isCompleted;
    };

    Todo.prototype.setTitle = function (title) {
        this.title = title;
    };

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }

    return Todo;
});
