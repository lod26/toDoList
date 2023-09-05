class Task {

    constructor(text) {
        this.text = text
        this.date = new Date()
        this.completed = false
        this.id = new Date().getTime()
    }

}