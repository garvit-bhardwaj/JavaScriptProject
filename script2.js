const input = document.querySelector(".todo-input");
const add = document.querySelector(".todo-button");
const list=document.querySelector(".todo-list");
const delall=document.querySelector(".tasksfooter");
const taskarea= document.querySelector("ul");
const comment= document.getElementById("comment");


add.addEventListener('click',addtask);
list.addEventListener('click',change);
document.addEventListener('DOMContentLoaded',getTasks);
delall.addEventListener('click',deleteall);
document.getElementById("closewindow").addEventListener('click',closewindow);
document.getElementById("edit").addEventListener("click",editcomm);
document.getElementById("delcomm").addEventListener("click",del);


function del(e)
{
    let req;
    let del = document.getElementById("commentheading").innerText;
    localStorage.removeItem(del+del+del.length);
    let allcheckbtns=document.querySelectorAll(".check-btn");
    allcheckbtns.forEach(function(item){
        let x=item.parentElement.firstChild.innerText;
        //console.log(x);
        if(x===del)
        {
            req=item;
           // console.log(del," ",req);
        }
    })
    showcomment(req,null);
}

function editcomm(e)
{
    let req;
    let editvalue = document.getElementById("content").innerText;
    let here=document.getElementById("commentheading").innerText;
    localStorage.removeItem(here+here+here.length);
    let allcheckbtns=document.querySelectorAll(".check-btn");
    allcheckbtns.forEach(function(item){
        let x=item.parentElement.firstChild.innerText;
        //console.log(x);
        if(x===here)
        {
            req=item;
        }
    })
    showcomment(req,editvalue);
}

function closewindow()
{
    //console.log("heyo");
    comment.style.width="0";
    comment.style.height="0";
    comment.style.visibility="hidden";
    comment.style.opacity="0";
}

function addtask(e){
    e.preventDefault();
    if(input.value==="")
    return;
    else if(input.value.length>20)
    {
        alert("Task heading is too long");
        return;
    }
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

    const commbtn= document.createElement("button");
    commbtn.innerHTML= '<i class="fas fa-comment"></i>';
    commbtn.classList.add("comm-btn");
    tododiv.appendChild(commbtn);

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
    if(item.classList[0]==="comm-btn")
    {
        comment.style.width="80%";
        comment.style.height="80vh";
        comment.style.visibility="visible";
        comment.style.opacity="1"; 
        setTimeout(function(){showcomment(item,null);},500);
    }
}
function showcomment(item,val)
{
    //console.log(item);
    const x=item.parentElement;
    const y=x.firstChild.innerText;
    const z=y+y+y.length;
    var cont = localStorage.getItem(z);
    document.getElementById("commentheading").innerText=y;
    //console.log(z);
    //console.log(cont);
    //console.log(y+y+y.length);
    if(localStorage.getItem(z)===null)
    {
        //console.log("in if conditon");
        document.getElementById("comm-input").value=val;
        document.getElementById("commentform").style.display="flex";
        document.getElementById("content").firstChild.innerText="No additional Comments";
        document.getElementById("commentform").addEventListener('submit',addcomment);
        function addcomment(e)
        {
            e.preventDefault();
            let comminput = document.getElementById("comm-input");
            //console.log("1");
            if(comminput.value==="")
            return;
            //console.log("2");
            localStorage.setItem(z,comminput.value);
            showcomment(item,null);
        }
    }
    else
    {
        //console.log("in else condition");
        document.getElementById("commentform").style.display="none";
        let cont = localStorage.getItem(z);
        document.getElementById("content").firstChild.innerText=cont;
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

    const commbtn= document.createElement("button");
    commbtn.innerHTML= '<i class="fas fa-comment"></i>';
    commbtn.classList.add("comm-btn");
    tododiv.appendChild(commbtn);

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
    const removeitem= task.firstChild.innerText;
    tasks.splice(tasks.indexOf(removeitem),1);
    localStorage.removeItem(removeitem+removeitem+removeitem.length);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    setTimeout(getTasks,850);
}

function deleteall()
{
    localStorage.removeItem("tasks");
   // window.location.replace("todolist.html");
    getTasks();
}
function mainpage()
{
    window.location.replace("index.html");
}