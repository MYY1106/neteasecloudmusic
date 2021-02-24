//轮播图左右箭头的显示与隐藏
document.querySelector('.lunbo').addEventListener('mouseenter', function () {
    document.querySelector('.lunboleft').style.display = 'block'
    document.querySelector('.lunboright').style.display = 'block'
})
document.querySelector('.lunbo').addEventListener('mouseleave', function () {
    document.querySelector('.lunboleft').style.display = 'none'
    document.querySelector('.lunboright').style.display = 'none'
})


//轮播图的自动播放
let lunboautoplay = setInterval(function () {
    document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft - 540 + 'px'
    lunboarrowi++;
    if (lunboarrowi == 9) {
        document.querySelector('.lunbocontent').style.left = 0 + 'px'
        lunboarrowi = 0
    }
    for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
        document.querySelector('.circlepart').children[i].className = 'circle'
    }
    document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
}, 5000)


//轮播图的小圆圈的点击
for (let circlei = 0; circlei < document.querySelector('.circlepart').children.length; circlei++) {
    document.querySelector('.circlepart').children[circlei].onclick = function () {
        //console.log(circlei);
        clearInterval(lunboautoplay)
        for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
            document.querySelector('.circlepart').children[i].className = 'circle'
        }
        document.querySelectorAll('.circle')[circlei].className = 'circle1'
        document.querySelector('.lunbocontent').style.left = -(circlei) * 540 + 'px'
        lunboarrowi = circlei
        lunboautoplay = setInterval(function () {
            document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft - 540 + 'px'
            lunboarrowi++;
            if (lunboarrowi == 10) {
                document.querySelector('.lunbocontent').style.left = 0 + 'px'
                lunboarrowi = 0
            }
            for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
                document.querySelector('.circlepart').children[i].className = 'circle'
            }
            document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
        }, 5000)
    }
}


//网络请求得到banner图
let lunbocontentfunc = (res) => {
    res = res.banners
    console.log(res);
    for (let i = 0; i < 9; i++) {
        document.querySelectorAll('.lunbopic')[i].src = res[i].imageUrl
    }
    let lastfirst = document.querySelector('.lunbocontentfirst').cloneNode(true)
    document.querySelector('.lunbocontent').appendChild(lastfirst)
}
ajax(`/banner?type=0`, lunbocontentfunc)


//轮播图的左右箭头
document.querySelector('.lunboright').addEventListener('click', function () {
    clearInterval(lunboautoplay)
    document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft - 540 + 'px'
    lunboarrowi++;
    if (lunboarrowi == 9) {
        document.querySelector('.lunbocontent').style.left = 0 + 'px'
        lunboarrowi = 0
    }
    for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
        document.querySelector('.circlepart').children[i].className = 'circle'
    }
    document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
    lunboautoplay = setInterval(function () {
        document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft - 540 + 'px'
        lunboarrowi++;
        if (lunboarrowi == 9) {
            document.querySelector('.lunbocontent').style.left = 0 + 'px'
            lunboarrowi = 0
        }
        for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
            document.querySelector('.circlepart').children[i].className = 'circle'
        }
        document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
    }, 5000)
})
document.querySelector('.lunboleft').addEventListener('click', function () {
    clearInterval(lunboautoplay)
    document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft + 540 + 'px'
    lunboarrowi--;
    if (lunboarrowi == -1) {
        document.querySelector('.lunbocontent').style.left = -4860 + 'px'
        lunboarrowi = 8
    }
    for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
        document.querySelector('.circlepart').children[i].className = 'circle'
    }
    document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
    lunboautoplay = setInterval(function () {
        document.querySelector('.lunbocontent').style.left = document.querySelector('.lunbocontent').offsetLeft - 540 + 'px'
        lunboarrowi++;
        if (lunboarrowi == 9) {
            document.querySelector('.lunbocontent').style.left = 0 + 'px'
            lunboarrowi = 0
        }
        for (let i = 0; i < document.querySelector('.circlepart').children.length; i++) {
            document.querySelector('.circlepart').children[i].className = 'circle'
        }
        document.querySelectorAll('.circle')[lunboarrowi].className = 'circle1'
    }, 5000)
})