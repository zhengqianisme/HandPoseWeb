var videoElement1 = document.getElementById('videoElement2');

if(videoElement1!=null){
    console.log('start')
    if (flvjs.isSupported()) {
        play();

    }

    function play(){

        var videoElement1 = document.getElementById('videoElement2');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            enableWorker: true, //浏览器端开启flv.js的worker,多进程运行flv.js
            isLive: true, //直播模式
            hasAudio: false, //关闭音频             
            hasVideo: true,
            stashInitialSize: 128,
            enableStashBuffer: true, //播放flv时，设置是否启用播放缓存，只在直播起作用。
           url: 'http://localhost:8080/flv?port=1935&app=live&stream=stream'
            // url:"http://xiaogan.live.cjyun.org/video/s10139-xg.flv"
        });

        flvPlayer.attachMediaElement(videoElement1);
        flvPlayer.load();
        flvPlayer.play();
    }

}
