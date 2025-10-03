export default class Todo {
    constructor(id, text, done = false) {
        this.id = id;
        this.text = text;
        this.done = done;
    }

    markDone() {
        this.done = true;
        console.log(`Todo: ${this.text} is ${this.done}`);
    }

    updateText(newText) {
        this.text = newText;
    }
}
