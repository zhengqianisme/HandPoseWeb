var err="___"
var pos=null;
const videoElement = document.getElementsByClassName('input_video')[0];
//const videoElement = document.querySelector('.input_video');
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];

const canvasCtx = canvasElement.getContext('2d');

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

// 获取模型处理后的坐标，绘画
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
}});
hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.开启摄像头，把摄像头捕捉的画面传给hands对象
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 500,
  height: 300
});

// Present a control panel through which the user can manipulate the solution
// options.控制盘的代码
new ControlPanel(controlsElement, {
      selfieMode: true,
      maxNumHands: 2,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })
    .add([
      new StaticText({title: 'MediaPipe Hands'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Slider(
          {title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1}),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      videoElement.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    });
    

const cameraButton = document.getElementsByClassName("camera-button")[0];

var video = document.getElementById("video");

cameraButton.addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: true,
      Audio: true
    },camera.start()).then(function (stream) {
      video.srcObject = stream;
      video.play();
    }).catch(function (err) {
      console.log(err);
    })
  }
});

//get mongodb data
$.get("http://localhost:8000/list",function(data,status){
  document.getElementById("1").src=data[0].url;
  document.getElementById("2").src=data[1].url;
  document.getElementById("3").src=data[2].url;
  document.getElementById("4").src=data[3].url;
});


