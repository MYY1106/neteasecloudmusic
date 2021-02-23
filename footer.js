//音乐的播放和暂停
function playandstop() {
    let audioDom = document.querySelector('.audio')
    if (audioDom.src != '') {
        if (/stop/.test(document.querySelector('.playandstopbtn').src)) {
            audioDom.pause()
            document.querySelector('.playandstopbtn').src = './pic/playbtn.jpg'
            document.querySelector('.kaiguan').className = 'kaiguan1'
            document.querySelector('#cd').className = 'cd pause'
            document.querySelector('#playpagepic').className = 'playpagepic pause'
        }
        else {
            audioDom.play();
            document.querySelector('.playandstopbtn').src = './pic/stopbtn.jpg';
            document.querySelector('.kaiguan1').className = 'kaiguan'
            document.querySelector('#cd').className = 'cd'
            document.querySelector('#playpagepic').className = 'playpagepic'
        }
    }
}


//滑条没有作两个颜色的处理
document.querySelector('.ball').onmousedown = function (event) {
    let ball = document.querySelector('.ball')
    function moveAt(pageX) {
        if (pageX - ball.offsetWidth / 2 < 1319) {
            ball.style.left = 1319 + 'px';
        }
        else if (pageX - ball.offsetWidth / 2 > 1370) {
            ball.style.left = 1370 + 'px';
        }
        else {
            ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
        }
        let want = ((pageX - ball.offsetWidth / 2 - 1319) / (1370 - 1319)) * 1
        if (want > 0 && want < 1)
            document.querySelector('.audio').volume = ((pageX - ball.offsetWidth / 2 - 1319) / (1370 - 1319)) * 1
        else if (want < 0)
            document.querySelector('.audio').volume = 0
        else
            document.querySelector('.audio').volume = 1
    }
    moveAt(event.pageX);
    function onMouseMove(event) {
        moveAt(event.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };
};
document.querySelector('.ball').ondragstart = function () {
    return false;
};


document.querySelector('.progressball').onmousedown = function (event) {
    clearInterval(progressballrun)
    let ball = document.querySelector('.progressball')
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    function moveAt(pageX) {
        if (pageX - ball.offsetWidth / 2 < 524) {
            ball.style.left = 524 + 'px';
        }
        else if (pageX - ball.offsetWidth / 2 > 907) {
            ball.style.left = 907 + 'px';
        }
        else {
            ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
        }
    }
    moveAt(event.pageX);
    function onMouseMove(event) {
        moveAt(event.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    let documentonmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.onmouseup = null;
        document.removeEventListener('mouseup', documentonmouseup)
        document.querySelector('.audio').currentTime = ((parseFloat(ball.style.left) - 524) / 383) * document.querySelector('.audio').duration
        progressballrun = setInterval(() => {
            document.querySelector('.progressball').style.left = 524 + (document.querySelector('.audio').currentTime / document.querySelector('.audio').duration) * 383 + 'px'
        });
    };
    document.addEventListener('mouseup', documentonmouseup)
}
document.querySelector('.progressball').ondragstart = function () {
    return false;
};


setInterval(function () {
    nowtime = parseInt(document.querySelector('.audio').currentTime)
    nowtimesecond = nowtime % 60
    nowtimeminute = (nowtime - nowtimesecond) / 60 //音乐播放那里要加上这段代码
    nowtimesecond = nowtimesecond > 9 ? nowtimesecond : '0' + nowtimesecond
    nowtimeminute = nowtimeminute > 9 ? nowtimeminute : '0' + nowtimeminute
    document.querySelector('.currenttime').innerHTML = `${nowtimeminute}:${nowtimesecond} `
})
progressballrun = setInterval(() => {
    document.querySelector('.progressball').style.left = 524 + (document.querySelector('.audio').currentTime / document.querySelector('.audio').duration) * 383 + 'px'
});
