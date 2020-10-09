var info = document.querySelector(".clockcenter").getBoundingClientRect();
console.log(info);

document.querySelector(".hand").style.bottom="calc(" +  info.bottom + "px - 7.5px";



var music1,music2,music3;
var music= new Audio();
music.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
});
checkaudio();
function checkaudio()
{
    if(localStorage.getItem("audionum")===null)
{
    document.getElementById("audio1").style.background="rgba(150,212,29,1)";
    document.getElementById("audio1").style.boxShadow="4px 4px 6px #00000060";
    document.getElementById("audio2").style.background="";
    document.getElementById("audio2").style.boxShadow="";
    document.getElementById("audio3").style.background="";
    document.getElementById("audio3").style.boxShadow="";
    music.src="gamemusic.mp3";
}
else if(localStorage.getItem("audionum")==="1")
{
    document.getElementById("audio1").style.background="rgba(150,212,29,1)";
    document.getElementById("audio1").style.boxShadow="4px 4px 6px #00000060";
    document.getElementById("audio2").style.background="";
    document.getElementById("audio2").style.boxShadow="";
    document.getElementById("audio3").style.background="";
    document.getElementById("audio3").style.boxShadow="";
    music.src="gamemusic.mp3";   
}
else if(localStorage.getItem("audionum")==="2")
{
    document.getElementById("audio1").style.background="";
    document.getElementById("audio1").style.boxShadow="";
    document.getElementById("audio2").style.background="rgba(150,212,29,1)";
    document.getElementById("audio2").style.boxShadow="4px 4px 6px #00000060";
    document.getElementById("audio3").style.background="";
    document.getElementById("audio3").style.boxShadow="";
    music.src="sound1.mp3";   
}
else
{
    document.getElementById("audio1").style.background="";
    document.getElementById("audio1").style.boxShadow="";
    document.getElementById("audio2").style.background="";
    document.getElementById("audio2").style.boxShadow="";
    document.getElementById("audio3").style.background="rgba(150,212,29,1)";
    document.getElementById("audio3").style.boxShadow="4px 4px 6px #00000060";
    music.src="sound2.mp3";   
}
}
const deg=6;
const hr=document.getElementById("hr");
const mn=document.getElementById("mn");
const sc=document.getElementById("sc");
setInterval(()=>{
    let day= new Date();
    let hh=day.getHours()*30;
    let mm=day.getMinutes()*deg;
    let ss=day.getSeconds()*deg;
    hr.style.transform= `translateX(-50%) rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform= `translateX(-50%) rotateZ(${mm}deg)`;
    sc.style.transform= `translateX(-50%) rotateZ(${ss}deg) `;
    //console.log("hey");
})
document.getElementById("set").addEventListener("mouseover",startvib);
document.getElementById("set").addEventListener("mouseout",stopvib);
document.getElementById("set").addEventListener("click",jello);
function startvib()
{
    document.getElementById("set").classList.add("vibrate-3");
}
function stopvib()
{
    document.getElementById("set").classList.remove("vibrate-3");
}
function jello()
{
    document.getElementById("set").classList.add("jello-horizontal");
    setTimeout(gotoalarm,600);
}
function gotoalarm()
{
    document.getElementById("set").classList.remove("jello-horizontal");
    document.getElementById("setalarm").style.borderBottomRightRadius="50%";
    document.getElementById("setalarm").style.borderTopRightRadius="50%";
    setTimeout(correctlook,200);
    document.getElementById("setalarm").style.left="0";
    document.getElementById("setalarm").style.top="0";
    if(localStorage.getItem("alarmtime")!==null)
    {
        document.getElementById("msg").style.display="block";
    }
}
document.querySelector("body").height=window.availHeight + "px";
function correctlook()
{
    document.getElementById("setalarm").style.borderBottomRightRadius="0%";
    document.getElementById("setalarm").style.borderTopRightRadius="0%";
}
document.getElementById("backtoclock").addEventListener("mouseover",startvib1);
document.getElementById("backtoclock").addEventListener("mouseout",stopvib1);
document.getElementById("backtoclock").addEventListener("click",jello1);
function startvib1()
{
    document.getElementById("backtoclock").classList.add("vibrate-3");
}
function stopvib1()
{
    document.getElementById("backtoclock").classList.remove("vibrate-3");
}
function jello1()
{
    document.getElementById("backtoclock").classList.add("jello-horizontal");
    setTimeout(gotoclock,600);
}
function gotoclock()
{
    document.getElementById("backtoclock").classList.remove("jello-horizontal");
    document.getElementById("setalarm").style.borderBottomRightRadius="50%";
    document.getElementById("setalarm").style.borderTopRightRadius="50%";
    setTimeout(correctlook,400);
    document.getElementById("setalarm").style.left="-100%";
    document.getElementById("setalarm").style.top="-100vh";
    document.getElementById("msg").style.display="none";
}

if(localStorage.getItem("alarmtime")==null)
{
    setAlarm();
}
else
{
    showAlarm();
}
function setAlarm()
{
    document.getElementById("stop").style.display="none";
    document.getElementById("snooze").style.display="none";
    document.getElementById("smallstop").style.visibility="hidden";
    document.getElementById("smallsnooze").style.visibility="hidden";
    document.getElementById("msg").style.display="none";
    document.getElementById("alarmtime").style.display="inline-block";
    document.getElementById("alarmset").style.display="none";
    document.getElementById("setbtn").innerText="Set Alarm";
    document.getElementById("setbtn").removeEventListener("click",remove);
    document.getElementById("setbtn").addEventListener("click",set);
}
function showAlarm()
{
   // console.log(document.getElementById("setalarm").style.left);
    if(document.getElementById("setalarm").style.left==="0px")
    document.getElementById("msg").style.display="block";
    document.getElementById("alarmtime").style.display="none";
    document.getElementById("alarmset").style.display="inline-block";
    document.getElementById("alarmset").innerText=localStorage.getItem("alarmtime");
    document.getElementById("setbtn").innerText="Clear Alarm";
    document.getElementById("stop").style.display="none";
    document.getElementById("snooze").style.display="none";
    document.getElementById("smallstop").style.visibility="hidden";
    document.getElementById("smallsnooze").style.visibility="hidden";
    document.getElementById("setbtn").removeEventListener("click",set);
    document.getElementById("setbtn").addEventListener("click",remove);
    var time=localStorage.getItem("alarmtime");
    var alarmhours= time.substring(0,2);
   var alarmmin=time.substring(3,5);
   var current= new Date();
   var alarmtime=new Date(current.getUTCFullYear(),current.getUTCMonth(),current.getUTCDate(),alarmhours,alarmmin,"00");
   var timeleft= alarmtime.getTime()- current.getTime();
   // console.log(timeleft);
   if(timeleft>=0)
   setTimeout(startalarm,timeleft);
}
function remove()
{
    localStorage.removeItem("alarmtime");
    stopalarm();
    setAlarm();
}
var timeleft=0;
function set()
{
   document.getElementById("msg").style.display="none";
   var time=document.getElementById("alarmtime").value;
   var time1=document.getElementById("alarmtime").valueAsNumber;
   if(isNaN(time1))
   {
       alert("Invalid date");
       return;
   }
   var alarmhours= time.substring(0,2);
   var alarmmin=time.substring(3,5);
   var current= new Date();
   var alarmtime=new Date(current.getUTCFullYear(),current.getUTCMonth(),current.getUTCDate(),alarmhours,alarmmin,"00");
   //console.log(alarmtime);
   localStorage.setItem("alarmtime",time);
   //console.log(current);
   timeleft= alarmtime.getTime()- current.getTime();
   //console.log(timeleft);
   //setTimeout(startalarm,timeleft);
   showAlarm();
}
function startalarm()
{
    //console.log("alarm has started");
    if(window.availWidth>750){
        document.getElementById("stop").style.display="block";
        document.getElementById("snooze").style.display="block";
    }
    else
    {
        document.getElementById("smallstop").style.visibility="visible";
        document.getElementById("smallsnooze").style.visibility="visible";
    }
    document.getElementById("clock").classList.add("shake-horizontal");
    document.getElementById("clockcenter").classList.add("shake-horizontal");
    setTimeout(function(){
        music.play();
    },150);
    setTimeout(stopalarm,120000);
}
function stopalarm()
{
    document.getElementById("clock").classList.remove("shake-horizontal");
    document.getElementById("clockcenter").classList.remove("shake-horizontal");
    //console.log("alarm is stopped");
    document.getElementById("stop").style.display="none";
    document.getElementById("snooze").style.display="none";
    document.getElementById("smallstop").style.visibility="hidden";
    document.getElementById("smallsnooze").style.visibility="hidden";
    music.pause();
    music.currentTime=0;
}
function snoozealarm()
{
    document.getElementById("stop").style.display="none";
    document.getElementById("snooze").style.display="none";
    document.getElementById("smallstop").style.visibility="hidden";
    document.getElementById("smallsnooze").style.visibility="hidden";
    stopalarm();
    setTimeout(startalarm,300000);
}
document.getElementById("audio1").addEventListener("click",setaud1);
document.getElementById("audio1").addEventListener("mouseover",play1);
document.getElementById("audio1").addEventListener("mouseout",stop1);
function setaud1()
{
    localStorage.setItem("audionum","1");
    checkaudio();
}
function play1()
{
    music1=new Audio('gamemusic.mp3');
    music1.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
});
    music1.play();
}
function stop1(){
    music1.pause();
    music1.currentTime=0;
}
document.getElementById("audio2").addEventListener("click",setaud2);
document.getElementById("audio2").addEventListener("mouseover",play2);
document.getElementById("audio2").addEventListener("mouseout",stop2);
function setaud2()
{
    localStorage.setItem("audionum","2");
    checkaudio();
}
function play2()
{
    music2=new Audio('sound1.mp3');
    music2.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
});
    music2.play();
}
function stop2(){
    music2.pause();
    music2.currentTime=0;
}
document.getElementById("audio3").addEventListener("click",setaud3);
document.getElementById("audio3").addEventListener("mouseover",play3);
document.getElementById("audio3").addEventListener("mouseout",stop3);
function setaud3()
{
    localStorage.setItem("audionum","3");
    checkaudio();
}
function play3()
{
    music3=new Audio('sound2.mp3');
    music3.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
});
    music3.play();
}
function stop3(){
    music3.pause();
    music3.currentTime=0;
}
function mainpage()
{
    window.location.replace("index.html");
}