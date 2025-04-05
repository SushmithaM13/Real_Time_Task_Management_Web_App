const taskList=document.getElementById("taskList");
const addTaskBtn=document.getElementById("addTask");
const Tasktitle=document.getElementById("title");
const taskDescription=document.getElementById("description");
const taskPriority=document.getElementById("priority");
const filterPriority=document.getElementById("filterPriority");
const sortTasks=document.getElementById("sortTasks");
const clock=document.getElementById("clock");

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

function updateClock(){
    clock.textContent=new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();

function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function DisplayTasks(){
    taskList.innerHTML="";
    let filtered=[...tasks];
    if(filterPriority.value !=="All"){
        filtered=filtered.filter(task=>task.priority===filterPriority.value);
    }
    if(sortTasks.value==="title"){
        filtered.sort((a,b)=>a.title.localeCompare(b.title));
    }else if(sortTasks.value==="priority"){
        const order={High:1, Medium:2, Low:3};
        filtered.sort((a,b)=>order[a.priority]-order[b.priority]);
    }
    filtered.forEach((task,index)=>{
        const li=document.createElement("li");
        li.className=`task ${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`;
        li.innerHTML=`
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})"/>
        <strong>${task.title}</strong>
        <p>${task.description || ""}</p>
        `;
        taskList.appendChild(li);
    });
}

function addTask(){
    const title=Tasktitle.value.trim();
    if(!title) return alert("Task title is required.");

    const task={
        title,
        description:taskDescription.value.trim(),
        priority:taskPriority.value,
        createdAt: Date.now(),
        completed:false,
    };
    tasks.push(task);
    saveTask();
    DisplayTasks();

    Tasktitle.value="";
    taskDescription.value="";
}

function toggleComplete(index){
    tasks[index].completed=!tasks[index].completed;
    saveTask();
    DisplayTasks();
}

addTaskBtn.addEventListener("click",addTask);
filterPriority.addEventListener("change",DisplayTasks);
sortTasks.addEventListener("change",DisplayTasks);

DisplayTasks();