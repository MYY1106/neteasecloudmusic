function showplaylistdetail(playlistid) {
    let previous = document.querySelector('.right');
    let allsong = document.querySelector('.allsong')
    let playlistdetail = document.querySelector('.playlistdetail');
    while (allsong.children.length != 0) {
        allsong.removeChild(allsong.children[0])
    }
    previous.style.display = 'none';
    playlistdetail.style.display = 'block';
    let songdetail = []
    ajax(`/playlist/detail?id=${playlistid}`, func1)
    function func1(res) {
        res = res.playlist;
        let songid = []
        let trackCount = res.trackCount
        let playCount = res.playCount
        let playlistpic = res.coverImgUrl
        let playlistname = res.name
        let avatarpic = res.creator.avatarUrl
        let nickname = res.creator.nickname
        len = res.trackIds.length
        for (let i = 0; i < len; i++) {
            songid[i] = res.trackIds[i].id;
            ajax(`/song/detail?ids=${songid[i]}`, func2)
            function func2(res1) {
                res1 = res1.songs[0];
                songpic = res1.al.picUrl;
                songname = res1.name;
                albumname = res1.al.name;
                singer = '';
                id = songid[i]
                for (let i = 0; i < res1.ar.length; i++) {
                    if (i == 0)
                        singer += `${res1.ar[i].name}`;
                    else
                        singer += ` / ${res1.ar[i].name}`;
                }
                songdetail[i] = {
                    id,
                    songname,
                    albumname,
                    singer,
                    songpic
                }
                let hang = document.createElement('li');
                let yinyuebiaoti = document.createElement('span');
                let geshou = document.createElement('span');
                let zhuanji = document.createElement('span');
                let shichang = document.createElement('span');
                allsong.appendChild(hang)
                hang.onmousemove = function () {
                    hang.className = 'hang3'
                }
                hang.onmouseout = function () {
                    hang.className = 'hang2'
                }
                hang.appendChild(yinyuebiaoti)
                hang.appendChild(geshou)
                hang.appendChild(zhuanji)
                hang.appendChild(shichang)
                hang.className = 'hang2';
                yinyuebiaoti.className = 'yinyuebiaoti1'
                geshou.className = 'geshou1'
                zhuanji.className = 'zhuanji1'
                shichang.className = 'shichang1'
                yinyuebiaoti.innerHTML = songdetail[i].songname
                geshou.innerHTML = songdetail[i].singer
                zhuanji.innerHTML = songdetail[i].albumname
                hang.onclick = function () {
                    let func = (res) => {
                        hang.removeEventListener('click', func)
                        document.querySelector('.audio').removeAttribute('title')
                        document.querySelector('.audio').setAttribute('title', songid[i])
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
                    ajax(`/song/url?id=${songdetail[i].id}`, func)//切歌功能
                    document.querySelector('.nextsongbtn').onclick = function () {
                        i = i + 1
                        ajax(`/song/url?id=${songdetail[i].id}`, func)
                    }
                    // document.querySelector('.lastsongbtn').onclick = function () {
                    //     i = i - 1
                    //     ajax(`/song/url?id=${songdetail[i].id}`, func)
                    // }
                    document.querySelector('.lastsongbtn').addEventListener('click', function () {
                        i = i - 1
                        ajax(`/song/url?id=${songdetail[i].id}`, func)
                    })
                }
            }
        }
        songdetail[len] = {
            playlistname,
            avatarpic,
            nickname,
            playlistpic,
            playCount,
            trackCount
        }
        let playlistname1 = document.querySelector('#playlistname');
        let playlistpic1 = document.querySelector(".playlistpic1")
        let creatorpic = document.querySelector(".creatorpic")
        let creatorname = document.querySelector('.creatorname')
        let gequshu = document.querySelector('#gequshu')
        let bofangliang = document.querySelector('#bofangliang')
        gequshu.innerHTML = `歌曲数：${songdetail[songdetail.length - 1].trackCount}&nbsp;&nbsp;&nbsp;`
        creatorname.innerHTML = `&nbsp;&nbsp;${songdetail[songdetail.length - 1].nickname}`
        creatorpic.src = songdetail[songdetail.length - 1].avatarpic;
        playlistpic1.src = songdetail[songdetail.length - 1].playlistpic;
        playlistname1.innerHTML = songdetail[songdetail.length - 1].playlistname
        if (songdetail[songdetail.length - 1].playCount >= 100000) {
            songdetail[songdetail.length - 1].playCount = parseInt(songdetail[songdetail.length - 1].playCount / 10000) + '万';
        }
        bofangliang.innerHTML = `播放：${songdetail[songdetail.length - 1].playCount}`;
    }
    document.querySelector('.pinlun').addEventListener('click', function () {
        while (document.querySelector('.allcomment').children.length != 0) {
            allsong.removeChild(allsong.children[0])
        }
        ajax(`/comment/playlist?id=${playlistid}&limit=100`, function (res) {
            comment = res.comments;
            allcomment = document.querySelector('.allcomment')
            console.log(comment);
            let len = comment.length
            for (let i = 0; i < len; i++) {
                console.log(comment[i].content);
                console.log(comment[i].likedCount);
                let hang = document.createElement('li')
                let allpinluncontent = document.createElement('span')
                let pinluncreator = document.createElement('span')
                let pinluncreatorpic = document.createElement("img")
                let content = document.createElement('span')
                let likenumber = document.createElement('span')
                hang.className = 'pinlunhang'
                pinluncreator.className = 'pinluncreator'
                pinluncreatorpic.className = 'pinluncreatorpic'
                content.className = 'pinluncontent'
                likenumber.className = 'pinlunzan'
                allpinluncontent.className = 'allpinluncontent'
                allcomment.appendChild(hang)
                hang.appendChild(pinluncreatorpic)
                hang.appendChild(allpinluncontent)
                allpinluncontent.appendChild(pinluncreator)
                allpinluncontent.appendChild(content)
                pinluncreator.innerHTML = comment[i].user.nickname + '：'
                pinluncreatorpic.src = comment[i].user.avatarUrl
                content.innerHTML = comment[i].content
                likenumber.innerHTML = comment[i].likedCount
            }
        })
    })
}


//评论与歌单的切换
document.querySelector('.pinlun').addEventListener('click', function () {
    document.querySelector('.recommend_icon').style.display = 'none'
    document.querySelector('.allsong').style.display = 'none'
    document.querySelector('.allcomment').style.display = 'block'
    document.querySelector('.pinlun').className = 'pinlun1'
    document.querySelector('.gequliebiao').className = 'gequliebiao1'
    document.querySelector('.xiaogeziii').className = 'xiaogeziii1'
})
document.querySelector('.gequliebiao').addEventListener('click', function () {
    document.querySelector('.recommend_icon').style.display = 'block'
    document.querySelector('.allsong').style.display = 'block'
    document.querySelector('.allcomment').style.display = 'none'
    document.querySelector('.pinlun1').className = 'pinlun'
    document.querySelector('.gequliebiao1').className = 'gequliebiao'
    document.querySelector('.xiaogeziii1').className = 'xiaogeziii'
})