class App {


    toDoList = locStorage.get('toDoList') || []

    createTask (text) {
        this.toDoList.push(new Task(text))
        locStorage.set('toDoList' , this.toDoList)
    }

    deleteTask(id) {
        const result = this._findIdx(id)
        if (result == null) return
        this.toDoList.splice(result , 1)
        locStorage.set('toDoList' , this.toDoList)
    }

    deleteCompletedTasks () {
        this.toDoList = this.toDoList.filter(item => {
            if (!item.completed) return item
        })

        locStorage.set('toDoList' , this.toDoList)
        html.refreshTasks(app.toDoList , tasksContainer)
    }



    editTask(id , newText) {
        const taskIndex = this._findIdx(id)
        // if (taskIndex == null) return
        this.toDoList[taskIndex].text = newText
        locStorage.set('toDoList' , this.toDoList)

    }

    completeTask (id) {
        let result = this._findIdx(id)
        this.toDoList[result].completed = !this.toDoList[result].completed
        locStorage.set('toDoList' , this.toDoList)
    }

    _findIdx (id) {
        const foundedIdx = this.toDoList.findIndex(item => item.id === id)
        if (foundedIdx === -1) {
            console.log('Такого индекса не существует')
            return;
        }
        return foundedIdx
    }
}
const app = new App()

const tasksContainer = document.querySelector('.to-do-list')

html.refreshTasks(app.toDoList , tasksContainer)

const textInput = document.querySelector('.text-input')
textInput.value = ''




document.querySelector('.create-task')

    .addEventListener('click' , ()=> {
        if(textInput.value === '') {
            alert('Заполните форму!')
            return
        }
        app.createTask(textInput.value)
        textInput.value = ''
        html.refreshTasks(app.toDoList , tasksContainer)
    })

document.querySelector('.delete-completed')
    .addEventListener('click' , () => {
        if (confirm('Удалить завершенные задания?')) {
            app.deleteCompletedTasks()
        }
    })
