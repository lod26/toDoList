class TasksList {

    constructor(arr) {
        this.tasksArray = arr
    }

    createTask (text) {
        this.tasksArray.push(new Task(text))
    }

    deleteTask(index) {
        this.tasksArray.splice(index , 1)
    }

    editTask(index , newText) {
        this.tasksArray[index].text = newText
    }
}