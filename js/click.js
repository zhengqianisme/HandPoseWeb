// 点击事件1
var onclickk = document.getElementById("videomongo1");
onclickk.onclick=function () {
    clearTimeout(time);  //首先清除计时器
    time = setTimeout(() => {
        console.log('click');
        var landmark="1";
        pvm_show_click(landmark);
    },300);
}
var time = null;
onclickk.ondblclick=function (){
    clearTimeout(time);
    console.log('ondblclick');
    var landmark="1";
    pgm_show_ondblclick(landmark);
}
// 点击事件2
var onclickk = document.getElementById("videomongo2");
onclickk.onclick=function () {
    clearTimeout(time);  //首先清除计时器
    time = setTimeout(() => {
        console.log('click');
        var landmark="2";
        pvm_show_click(landmark);
    },300);
}
var time = null;
onclickk.ondblclick=function (){
    clearTimeout(time);
    console.log('ondblclick');
    var landmark="2";
    pgm_show_ondblclick(landmark);
}
// 点击事件3
var onclickk = document.getElementById("videomongo3");
onclickk.onclick=function () {
    clearTimeout(time);  //首先清除计时器
    time = setTimeout(() => {
        console.log('click');
        var landmark="3";
        pvm_show_click(landmark);
    },300);
}
var time = null;
onclickk.ondblclick=function (){
    clearTimeout(time);
    console.log('ondblclick');
    var landmark="3";
    pgm_show_ondblclick(landmark);
}
// 点击事件4
var onclickk = document.getElementById("videomongo4");
onclickk.onclick=function () {
    clearTimeout(time);  //首先清除计时器
    time = setTimeout(() => {
        console.log('click');
        var landmark="4";
        pvm_show_click(landmark);
    },300);
}
var time = null;
onclickk.ondblclick=function (){
    clearTimeout(time);
    console.log('ondblclick');
    var landmark="4";
    pgm_show_ondblclick(landmark);
}

// 点击事件5
var onclickk = document.getElementById("videomongo5");
onclickk.onclick=function () {
    clearTimeout(time);  //首先清除计时器
    time = setTimeout(() => {
    console.log('click');
    var landmark="5";
    // document.getElementsByClassName('count')[0].innerText = landmark;
    document.getElementsByClassName('signal')[0].innerText = landmark;
    var ppp=document.getElementById("videoElement1");
    ppp.style.visibility="visible";
    pos=landmark;
    },300);
}
var time = null;
onclickk.ondblclick=function (){
    clearTimeout(time);
    console.log('ondblclick');
    var landmark="5";
    // document.getElementsByClassName('count')[0].innerText = landmark;
    document.getElementsByClassName('signal')[0].innerText = landmark;
    var pp=document.getElementById("videoElement2");
    pp.style.visibility="visible";
    pos=landmark;
    
}

function pvm_show_click(landmark){
    // document.getElementsByClassName('count')[0].innerText = landmark;
    document.getElementsByClassName('signal')[0].innerText = landmark;
    var ppp=document.getElementById("videoElement1");
    ppp.style.visibility="hidden";

    var getv=getvideo(landmark);
    document.getElementById('pvw').src=getv;
    
    // console.log(document.getElementById("01").src)
}
function pgm_show_ondblclick(landmark){
    // document.getElementsByClassName('count')[0].innerText = landmark;
    document.getElementsByClassName('signal')[0].innerText = landmark;

    var pp=document.getElementById("videoElement2");
    pp.style.visibility="hidden";
    
    var getv=getvideo(landmark);
    document.getElementById('pgm').src=getv;
}