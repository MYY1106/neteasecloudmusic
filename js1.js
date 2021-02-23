document.querySelector('.audio').volume = 0.5//解决一开始的volume默认值为1的问题
window.localStorage.removeItem('user_id')
window.localStorage.removeItem('user_info')
let lunboarrowi = 0


document.addEventListener('selectstart', function (e) {
    e.preventDefault();
})//使文档不会被选中，但是还未解决光标遇到文字等会变的问题


ajax = (houzhui, func) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://sandyz.ink:3000${houzhui}`);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            func(res);
        }
    }
}


ajax1 = (url, func) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}`);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            func(res);
        }
    }
}



let getcomment = (comment, allcomment) => {
    console.log(comment);
    let len = comment.length
    for (let i = 0; i < len; i++) {
        console.log(comment[i].content);
        console.log(comment[i].likedCount);
        let hang = document.createElement('li')
        let content = document.createElement('span')
        let likenumber = document.createElement('span')
        allcomment.appendChild(hang)
        hang.appendChild(content)
        hang.appendChild(likenumber)
        content.innerHTML = comment[i].content
        likenumber.innerHTML = comment[i].likedCount
    }
}


//获取推荐歌单
let xhr1 = new XMLHttpRequest();
xhr1.open("GET", 'http://musicapi.leanapp.cn/personalized?limit=10');
xhr1.onreadystatechange = () => {
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            let res = JSON.parse(xhr1.responseText);
            let result = res.result;
            let recommand_playCount = [];
            let recommand_img = [];
            let recommend_imgtext = [];
            for (let i = 0; i < result.length; i++) {
                const { picUrl } = result[i];
                const { name } = result[i];
                let { playCount } = result[i];
                recommend_imgtext[i] = name;
                recommand_img[i] = picUrl;
                if (playCount >= 100000) {
                    playCount = parseInt(playCount / 10000) + '万';
                }
                recommand_playCount[i] = playCount;
            }
            putplayCount = document.querySelectorAll('.countplay');
            putimg = document.querySelectorAll('.recommand_img');
            text = document.querySelectorAll('.recommend_imgtext');
            playlistid = document.querySelectorAll('.box');
            for (let i = 0; i < recommand_img.length; i++) {
                putimg[i].src = recommand_img[i];
                text[i].innerHTML = recommend_imgtext[i];
                putplayCount[i].innerHTML = "▷" + recommand_playCount[i];
                playlistid[i].title = `${result[i].id}`
            }
        }
    }
}
xhr1.send();


//right界面的切换
document.querySelector('.rightpersonalized').onclick = function () {
    document.querySelector('.recommand').style.display = 'block'
    document.querySelector('.rightpersonalized1').className = 'rightpersonalized'
    document.querySelector('.rightplaylist1').className = 'rightplaylist'
    document.querySelector('.rightxiaogezi1').className = 'rightxiaogezi'
    document.querySelector('.lunbo').style.display = 'block'
    document.querySelector('.circlepart').style.display = 'flex'
    document.querySelector('.playground').style.display = 'none'
    console.log(window.localStorage.getItem('user_info'));
}
document.querySelector('.rightplaylist').onclick = function () {
    document.querySelector('.recommand').style.display = 'none'
    document.querySelector('.rightpersonalized').className = 'rightpersonalized1'
    document.querySelector('.rightplaylist').className = 'rightplaylist1'
    document.querySelector('.rightxiaogezi').className = 'rightxiaogezi1'
    document.querySelector('.lunbo').style.display = 'none'
    document.querySelector('.circlepart').style.display = 'none'
    document.querySelector('.playground').style.display = 'block'
    ajax(`/top/playlist?limit=50&order=hot`, function (res) {
        let result = res.playlists;
        console.log(result);
        let recommand_playCount = [];
        let recommand_img = [];
        let recommend_imgtext = [];
        for (let i = 0; i < result.length; i++) {
            const { coverImgUrl } = result[i];
            const { name } = result[i];
            let { playCount } = result[i];
            recommend_imgtext[i] = name;
            recommand_img[i] = coverImgUrl;
            if (playCount >= 100000) {
                playCount = parseInt(playCount / 10000) + '万';
            }
            recommand_playCount[i] = playCount;
        }
        putplayCount = document.querySelectorAll('.countplay1');
        putimg = document.querySelectorAll('.recommand_img1');
        text = document.querySelectorAll('.recommend_imgtext1');
        playlistid = document.querySelectorAll('.gorundbox');
        for (let i = 0; i < recommand_img.length; i++) {
            putimg[i].src = recommand_img[i];
            text[i].innerHTML = recommend_imgtext[i];
            putplayCount[i].innerHTML = "▷" + recommand_playCount[i];
            playlistid[i].title = `${result[i].id}`
        }
    })
}
document.querySelector('.function3').onclick = function () {
    document.querySelector('.right').style.display = 'block'
    document.querySelector('.playlistdetail').style.display = 'none'
    document.querySelector('.searchlistdetail').style.display = 'none'
}