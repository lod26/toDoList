class Html {
    constructor() {
    }

    refreshTasks (arr , container) {
        container.innerHTML = ''
        arr.forEach((item , i) => {
            container.append(this.createTask(item))
        })
    }


    createTask (item) {
        let taskBody = document.createElement('div')
        if (item.completed === false) {
            taskBody.classList.add('task-body')
        } else  {
            taskBody.classList.add('task-body-done')
        }
            let taskText = document.createElement('div')
            taskText.classList.add('task-text')
            taskText.classList.add('task-item')
            taskText.innerHTML = item.text
            taskBody.append(taskText)

            let taskMenu = document.createElement('div')
            taskMenu.classList.add('task-menu')
            taskMenu.classList.add('task-item')


                let taskDate = document.createElement('div')
                taskDate.classList.add('task-date')
                taskDate.classList.add('task-menu-item')
                // taskDate.innerHTML = `${item.date}`
                taskDate.innerHTML = '02.03.2023'
                taskMenu.append(taskDate)

                let taskEditContainer = document.createElement('div')
                taskEditContainer.classList.add('task-edit')
                taskEditContainer.classList.add('task-menu-item')
                    let editLink = document.createElement('a')
                    editLink.text = 'Редактировать'
                        editLink.addEventListener('click' , () => {
                            const modal = new ItcModal({
                                title: 'Отредактируйте задания',
                                content: `<textarea class="text-edit-input" maxlength="210">${item.text}</textarea>`,
                                footerButtons: [
                                    { class: 'btn btn-save', text: 'Сохранить изменения', action: 'save' },
                                ]
                            })
                            document.querySelector('.btn-save')
                                .addEventListener('click' , ()=> {
                                    const newText = document.querySelector('.text-edit-input').value
                                    app.editTask(item.id , newText)
                                    html.refreshTasks(app.toDoList , tasksContainer)
                                    modal.dispose()
                                })
                            modal.show()

                        })
                    taskEditContainer.append(editLink)
                taskMenu.append(taskEditContainer)

                let taskStatusContainer = document.createElement('div')
                taskStatusContainer.classList.add('task-status')
                taskStatusContainer.classList.add('task-menu-item')
                    let statusLink = document.createElement('a')
                    statusLink.text = item.completed ? 'Возобновить' : 'Завершить'
                    statusLink.style.color = 'black'
                    statusLink.addEventListener('click' , (e) => {
                            app.completeTask(item.id)
                            html.refreshTasks(app.toDoList,tasksContainer)
                    })
                    taskStatusContainer.append(statusLink)
                taskMenu.append(taskStatusContainer)

                let taskDeleteContainer = document.createElement('div')
                taskDeleteContainer.classList.add('task-edit')
                taskDeleteContainer.classList.add('task-menu-item')
                    let deleteLink = document.createElement('a')
                    deleteLink.text = 'Удалить'
                        deleteLink.addEventListener('click' , ()=> {
                            if(confirm('Точно удалить?')) {
                                app.deleteTask(item.id)
                                html.refreshTasks(app.toDoList,tasksContainer)

                            }
                        })
                    taskDeleteContainer.append(deleteLink)
                taskMenu.append(taskDeleteContainer)
            taskBody.append(taskMenu)

        return taskBody
    }
}

const html = new Html()