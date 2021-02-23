//搜索的热搜榜的打开和关闭和搜索
document.querySelector('.search').addEventListener('focus', function () {
    func = (res) => {
        let { data } = res
        let searchnumber = document.querySelectorAll('.searchnumber')
        let searchtopword = document.querySelectorAll('.searchtopword')
        let searchhowmany = document.querySelectorAll('.searchhowmany')
        let searchbottomword = document.querySelectorAll('.searchbottomword')
        for (let i = 0; i < data.length; i++) {
            searchnumber[i].innerHTML = i + 1
            searchtopword[i].innerHTML = data[i].searchWord
            searchhowmany[i].innerHTML = data[i].score
            searchbottomword[i].innerHTML = data[i].content
            document.querySelectorAll('.searchhang')[i].onclick = function () {
                ajax(`/cloudsearch?keywords= ${data[i].searchWord}&limit=30`, getsearchresult)
            }

        }
    }
    ajax(`/search/hot/detail`, func)
    document.querySelector('.searchhot').style.display = 'block'
})
document.querySelector('.search').addEventListener('blur', function () {
    setTimeout(function () {
        document.querySelector('.searchhot').style.display = 'none'
    }, 200)

})


//搜索功能
function getsearchresult(res1) {
    document.querySelector('.playpage').style.display = 'none'
    document.querySelector('.playlistdetail').style.display = 'none'
    document.querySelector('.left').style.display = 'block'
    let songdetail = []
    console.log(res1);
    res1 = res1.result.songs
    for (let i = 0; i < 30; i++) {
        let songname = res1[i].name
        let { id } = res1[i]
        let albumname = res1[i].al.name
        let songpic = res1[i].al.picUrl
        singer = '';
        for (let index = 0; index < res1[i].ar.length; index++) {
            if (index == 0)
                singer += `${res1[i].ar[index].name}`;
            else
                singer += ` / ${res1[i].ar[index].name}`;
        }
        songdetail[i] = {
            id,
            songname,
            albumname,
            singer,
            songpic
        }
    }
    console.log(songdetail);
    let previous = document.querySelector('.right');
    let allsong = document.querySelector('.allsong2')
    let searchlistdetail = document.querySelector('.searchlistdetail');
    while (allsong.children.length != 0) {
        allsong.removeChild(allsong.children[0])
    }
    previous.style.display = 'none';
    searchlistdetail.style.display = 'block';
    for (let i = 0; i < songdetail.length; i++) {
        let hang = document.createElement('li');
        let yinyuebiaoti = document.createElement('span');
        let geshou = document.createElement('span');
        let zhuanji = document.createElement('span');
        let shichang = document.createElement('span');
        allsong.appendChild(hang)
        hang.appendChild(yinyuebiaoti)
        hang.appendChild(geshou)
        hang.appendChild(zhuanji)
        hang.appendChild(shichang)
        if (i % 2 == 0) {
            hang.className = 'hang1';
            hang.onmousemove = function () {
                hang.className = 'hang3'
            }
            hang.onmouseout = function () {
                hang.className = 'hang1'
            }
        }
        else {
            hang.className = 'hang2'
            hang.onmousemove = function () {
                hang.className = 'hang3'
            }
            hang.onmouseout = function () {
                hang.className = 'hang2'
            }
        }
        yinyuebiaoti.className = 'yinyuebiaoti1'
        geshou.className = 'geshou1'
        zhuanji.className = 'zhuanji1'
        shichang.className = 'shichang1'
        yinyuebiaoti.innerHTML = songdetail[i].songname
        geshou.innerHTML = songdetail[i].singer
        zhuanji.innerHTML = songdetail[i].albumname
        hang.onclick = function () {
            let func = (res) => {
                document.querySelector('.audio').removeAttribute('title')
                document.querySelector('.audio').setAttribute('title', songdetail[i].id)
                songurl = res.data[0].url
                audioDom = document.querySelector('.audio')
                audioDom.src = songurl
                audioDom.load();
                audioDom.play();
                audioDom.oncanplay = () => {
                    songtime = parseInt(audioDom.duration)
                    songtimesecond = songtime % 60
                    songtimeminute = (songtime - songtimesecond) / 60 //音乐播放那里要加上这段代码
                    songtimesecond = songtimesecond > 9 ? songtimesecond : '0' + songtimesecond
                    songtimeminute = songtimeminute > 9 ? songtimeminute : '0' + songtimeminute
                    document.querySelector('.songtime').innerHTML = ` ${songtimeminute}:${songtimesecond}`
                }
                document.querySelector('.playandstopbtn').src = './pic/stopbtn.jpg'
                document.querySelector('.footimg').src = songdetail[i].songpic
                document.querySelector('.footsongname').innerHTML = songdetail[i].songname
                document.querySelector('.footsinger').innerHTML = songdetail[i].singer
            }
            ajax(`/song/url?id=${songdetail[i].id}`, func)
        }
    }
}


//搜索功能
document.querySelector('.searchlogo').onclick = function () {
    let keyword = document.querySelector('.search').value
    ajax(`/cloudsearch?keywords= ${keyword}&limit=30`, getsearchresult)
}