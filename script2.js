const input = document.querySelector(".todo-input");
const add = document.querySelector(".todo-button");
const list=document.querySelector(".todo-list");
const delall=document.querySelector(".tasksfooter");
const taskarea= document.querySelector("ul");


add.addEventListener('click',addtask);
list.addEventListener('click',change);
document.addEventListener('DOMContentLoaded',getTasks);
delall.addEventListener('click',deleteall);



function addtask(e){
    e.preventDefault();
    if(input.value==="")
    return;
    document.getElementById("msg").style.display="none";
    const tododiv= document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo= document.createElement("li");
    newtodo.classList.add("todo-item");
    newtodo.innerText=input.value;
    tododiv.appendChild(newtodo);
    const checkbtn= document.createElement("button");
    checkbtn.innerHTML= '<i class="fas fa-check"></i>';
    checkbtn.classList.add("check-btn");
    tododiv.appendChild(checkbtn);

    const delbtn= document.createElement("button");
    delbtn.innerHTML= '<i class="fas fa-trash"></i>';
    delbtn.classList.add("del-btn");
    tododiv.appendChild(delbtn);

    list.appendChild(tododiv);

    save(input.value);

    input.value="";
}

function change(e)
{
    const item= e.target;
    //console.log(item);
    if(item.classList[0]==="del-btn")
    {
        const delthis=item.parentElement;
        delthis.classList.add("delete");
        setTimeout(deletenow,800);
        function deletenow()
        {
            delthis.remove();
        }
        remove(delthis);
    }

    if(item.classList[0]==="check-btn")
    {
        const checkthis=item.parentElement;
        checkthis.classList.toggle("completed");
        if(checkthis.classList.contains("completed"))
        {
            //console.log(checkthis);
            localStorage.setItem(checkthis.children[0].innerText,"1");
           // console.log(localStorage.getItem(checkthis.children[0].innerText));
        }
        else
        {
            localStorage.setItem(checkthis.children[0].innerText,"0");
        }
    }
}

function save(task)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    tasks=[];
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function getTasks()
{
    list.innerText="";
    let tasks;
    if(localStorage.getItem("tasks")===null)
    tasks=[];
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
    const tododiv= document.createElement("div");
    tododiv.classList.add("todo");
    if(localStorage.getItem(task)==="1")
    {
        tododiv.classList.add("completed");
    }

    const newtodo= document.createElement("li");
    newtodo.classList.add("todo-item");
    newtodo.innerText=task;
    tododiv.appendChild(newtodo);
    const checkbtn= document.createElement("button");
    checkbtn.innerHTML= '<i class="fas fa-check"></i>';
    checkbtn.classList.add("check-btn");
    tododiv.appendChild(checkbtn);

    const delbtn= document.createElement("button");
    delbtn.innerHTML= '<i class="fas fa-trash"></i>';
    delbtn.classList.add("del-btn");
    tododiv.appendChild(delbtn);

    list.appendChild(tododiv);
    });
    if(taskarea.firstChild)
    {
        document.getElementById("msg").style.display="none";
    }
    else
    {
        document.getElementById("msg").style.display="block";
    }
}

function remove(task)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    tasks=[];
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    // console.log(task.children[0].innerText);
    const removeitem= task.children[0].innerText;
    tasks.splice(tasks.indexOf(removeitem),1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    setTimeout(getTasks,850);
}

function deleteall()
{
    localStorage.removeItem("tasks");
    window.location.replace("todolist.html");
    getTasks();
}