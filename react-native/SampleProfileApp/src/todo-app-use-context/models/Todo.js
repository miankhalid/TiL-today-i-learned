export default class Todo {
    constructor(id, text, done = false) {
        this.id = id;
        this.text = text;
        this.done = done;
    }

    markDone() {
        return new Todo(this.id, this.text, true);
    }

    updateText(newText) {
        return new Todo(this.id, newText, this.done);
    }
}
