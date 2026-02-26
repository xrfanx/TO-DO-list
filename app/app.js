
let $ = document

function _id(id_name) {
    return $.getElementById(id_name)
}
function _class(class_name) {
    return $.querySelector(class_name)
}

let input = _id("task-input")
let add_btn = _id("add-task-btn")
let tasks_container = _class(".tasks")
let alarm = _id("alarm")
let container = _class(".container")

add_btn.addEventListener("click" , function () {
    
    if(input.value.trim() === "") {
        alarm.style.display = "block"; 
        container.style.animation = "2s shake 0.5s";  
        container.style.transition = "all 0.3s ease";
       setTimeout(() => {
        
           alarm.style.display = "none";
           container.style.animation = "none";
           container.style.transition = "none";
       }, 3000); 
    }else {
        let task = document.createElement("div")
        let trash_icon = document.createElement("div")
        container.style.transition = "all 1s ease";
        task.classList.add("task")
        task.innerHTML = `
            ${input.value}
            <div class="trash-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </div> `
        tasks_container.appendChild(task)
        saveTasks()
        task.querySelector(".trash-icon").addEventListener("click" , function () {
            task.remove()
    })
    input.value = ""
        
}
})
input.addEventListener("keypress" , function (enterClick) {
    if(enterClick.key === "Enter") {
        add_btn.click()
    }
})
function saveTasks() {
    let allTasks = []
    
    document.querySelectorAll(".task").forEach(function(task) {
        allTasks.push(task.firstChild.textContent.trim())
    })

    localStorage.setItem("tasks", JSON.stringify(allTasks))
}





window.addEventListener("load", function () {

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []

    savedTasks.forEach(function(text) {

        let task = document.createElement("div")
        task.classList.add("task")

        task.innerHTML = `
            ${text}
            <div class="trash-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </div>
        `

        tasks_container.appendChild(task)

        task.querySelector(".trash-icon").addEventListener("click", function () {
            task.remove()
            saveTasks()
        })

    })

})




// The key is performance
// XrfanX