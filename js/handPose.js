function handGestureCalculator(multiHandLandmarks) {
  if (multiHandLandmarks.length==0) {
      return "No hand deal";
  }
  var thumbIsOpen = false;
  var firstFingerIsOpen = false;
  var secondFingerIsOpen = false;
  var thirdFingerIsOpen = false;
  var fourthFingerIsOpen = false;

  landmarkList=multiHandLandmarks;
  var pseudoFixKeyPoint = landmarkList[2].x;
  // return landmarkList[2].x;
  if (pseudoFixKeyPoint < landmarkList[9].x) {
      if (landmarkList[3].x < pseudoFixKeyPoint && landmarkList[4].x < pseudoFixKeyPoint) {
          thumbIsOpen = true;
      }
  }
  if (pseudoFixKeyPoint > landmarkList[9].x) {
      if (landmarkList[3].x > pseudoFixKeyPoint && landmarkList[4].x > pseudoFixKeyPoint) {
          thumbIsOpen = true;
      }
  }

  pseudoFixKeyPoint = landmarkList[6].y;
  if (landmarkList[7].y < pseudoFixKeyPoint && landmarkList[8].y < landmarkList[7].y) {
      firstFingerIsOpen = true;
  }
  pseudoFixKeyPoint = landmarkList[10].y;
  if (landmarkList[11].y < pseudoFixKeyPoint && landmarkList[12].y < landmarkList[11].y) {
      secondFingerIsOpen = true;
  }
  pseudoFixKeyPoint = landmarkList[14].y;
  if (landmarkList[15].y < pseudoFixKeyPoint && landmarkList[16].y < landmarkList[15].y) {
      thirdFingerIsOpen = true;
  }
  pseudoFixKeyPoint = landmarkList[18].y;
  if (landmarkList[19].y < pseudoFixKeyPoint && landmarkList[20].y < landmarkList[19].y) {
      fourthFingerIsOpen = true;
  }

    // Hand gesture recognition
    if (thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen) {
        return 5;
    } else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen) {
        return 4;
    } else if (thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
        return 3;
    } else if (thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
        return 2;
    } else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
        return 2;
    } else if (!thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen) {
        return 1;
    } else if (!firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen && isThumbNearFirstFinger(landmarkList[4].x,landmarkList[4].y,landmarkList[8].x,landmarkList[8].y)) {
      return "OK";
    } 
    else {
        var info = "thumbIsOpen " + thumbIsOpen + "firstFingerIsOpen" + firstFingerIsOpen
                + "secondFingerIsOpen" + secondFingerIsOpen +
                "thirdFingerIsOpen" + thirdFingerIsOpen + "fourthFingerIsOpen" + fourthFingerIsOpen;
        // Log.d(TAG, "handGestureCalculator: == " + info);
        return err;
    }
return err;
}

function isThumbNearFirstFinger(ax,ay,bx,by) {
  var distance = getEuclideanDistanceAB(ax,ay,bx,by);
  return distance < 0.1;
}

function  getEuclideanDistanceAB( a_x,  a_y,  b_x,  b_y) {
  var dist = Math.pow(a_x - b_x, 2) + Math.pow(a_y - b_y, 2);
  return Math.sqrt(dist);
}


function colorland(num){
  for(var x=1;x<6;x++){
    var y=x+5;
    var obj=document.getElementById (y);
    var obj2=document.getElementById (x);
    if(x==num){
      obj.style.backgroundColor='red';
      obj2.style.borderColor='rgb(0, 255, 255)';
    }
    else{
      obj.style.backgroundColor='violet';
      obj2.style.borderColor='rgb(255, 255, 255)';
    }

  }
}
function bordercolorland(num){
  for(var y=1;y<6;y++){
    var x=y+10;
    var obj2=document.getElementById (x);
    if(x==num){
      obj2.style.borderColor='rgb(0, 255, 255)';
    }
    else{
      obj2.style.borderColor='rgb(255, 255, 255)';
    }
  }
}

// function videocolorland(num){
//   for(var x=1;x<6;x++){
//     var obj2=document.getElementById (x);
//     // console.log(obj2.style.borderColor);
//     if(x==num){
//       obj2.style.borderColor='rgb(0, 255, 255)';
//     }
//     else{
//       obj2.style.borderColor='rgb(255, 255, 255)';
//     }
//   }
// }

function getvideo(landmark){
  if(landmark==1){
    return document.getElementById("1").src;
  }
  if(landmark==2){
    return document.getElementById("2").src;
  }
  if(landmark==3){
    return document.getElementById("3").src;
  }
  if(landmark==4){
    return document.getElementById("4").src;
  }
  if(landmark==5){
    return document.getElementById("5").src;
  }
  else{
    return "./res/loading.gif";
  }
}

function getvideofromlocal(landmark){
  if(landmark==1){
    return "./res/1.mp4";
  }
  if(landmark==2){
    return "./res/2.mp4";
  }
  if(landmark==3){
    return "./res/3.mp4";
  }
  if(landmark==4){
    return "./res/4.mp4";
  }
  if(landmark==5){
    return "./res/5.mp4";
  }
  else{
    return "./res/loading.gif";
  }
}

function onResults(results) {
  // Hide the spinner.
  document.body.classList.add('loaded');

  // Update the frame rate.
  fpsControl.tick();

  // Draw the overlays. isRightHand镜像
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  var flag=0;
  if (results.multiHandLandmarks && results.multiHandedness) {
    // 两只手
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      
      //新方法
      // 获得识别后的数字
      var landmark=handGestureCalculator(landmarks);
      if(landmark!=err){
        // document.getElementsByClassName('count')[0].innerText = landmark;
        document.getElementsByClassName('signal')[0].innerText = landmark;
        if(landmark!=pos&&landmark!="OK"&&landmark!=5){
          var ppp=document.getElementById("videoElement1");
          ppp.style.visibility="hidden";

          var getv=getvideo(landmark);
          // console.log(getv);
          document.getElementById('pvw').src=getv;
          pos=landmark;
        }

        if(landmark!=pos&&landmark==5){
          var ppp=document.getElementById("videoElement1");
          ppp.style.visibility="visible";
          pos=landmark;
        }
        
        console.log(pos);
       // pgm的变化
        if(landmark=="OK"&&landmark!=pos&&pos!=5){
          var pp=document.getElementById("videoElement2");
          pp.style.visibility="hidden";
          
          var getv=getvideo(pos);
          document.getElementById('pgm').src=getv;
          pos=landmark;
        }
        if(landmark=="OK"&&landmark!=pos&&pos==5){
          var pp=document.getElementById("videoElement2");
          pp.style.visibility="visible";
          pos=landmark;
        }
     }
      // // 新：改变div颜色
      // if(landmark!=err){
      //   videocolorland(num=parseInt(landmark));
      // }
      // else{
      //   videocolorland(num=0);
      // }

      // // 区分左右手
      // var ans='null';
      // if(JSON.stringify(isRightHand)=='true'){
      //   ans='right';
      // }else{ans='left';}
      // document.getElementsByClassName('mark')[0].innerText = ans;

      //画手关节的连接线
      drawConnectors(
          canvasCtx, landmarks, HAND_CONNECTIONS,
          // {color: isRightHand ? '#00FF00' : '#FF0000'}),//绿色红色
          {color: isRightHand ? '#FFFF00' : '#FF0000'}),//黄色红色
      //画手的关键点
      drawLandmarks(canvasCtx, landmarks, {
        color: isRightHand ? '#00FF00' : '#FF0000',
        fillColor: isRightHand ? '#FF0000' : '#00FF00',
        radius: (x) => {
          return lerp(x.from.z, -0.15, .1, 3, 1);
        }
      });
    }
  }
  canvasCtx.restore();

}


// // 显示播放秒数
// var video2 = document.getElementsByClassName("div2video");

// // function nowtime(){
//   window.onload=function(){
//     // console.log(video2.item(0));
//     // console.log(video2.length);
//     var video=video2.item(0);
//     //使用事件监听方式捕捉事件
//     video.addEventListener("timeupdate",function(){
//       var timeDisplay;
//       //用秒数来显示当前播放进度
//       timeDisplay = Math.floor(video.currentTime);
//       console.log(timeDisplay);
//       // return timeDisplay;
//     });
//     }
// // }
// // setTimeout("window.location.reload()",5000);
// // nowtime();




// // 根据时间戳播放2号视频，
// playBySeconds(60198/1000);
// function playBySeconds (num) {
//   if (num && document.getElementsByClassName("div2video")) {
//       var my = document.getElementsByClassName("div2video");
      
//       window.onload=function(){
//         // console.log(my.item(0));
//         var myVideo=my.item(0);
//         myVideo.play();
//         myVideo.currentTime = num;
//         }

//   }
// };


