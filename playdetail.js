document.querySelector('.footimg').addEventListener('click', playsongdetail)
function playsongdetail() {
    document.querySelector('.searchlistdetail').style.display = 'none'
    document.querySelector('.playlistdetail').style.display = 'none'
    document.querySelector('.left').style.display = 'none'
    document.querySelector('.playpage').style.display = 'block'
    let songid = document.querySelector('.audio').title
    ajax(`/song/detail?ids=${songid}`, function (res) {
        ajax(`/lyric?id=${songid}`, function (reslyric) {
            lyric = reslyric.lrc ? reslyric.lrc.lyric : `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无&nbsp;歌&nbsp;词&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
            res = res.songs[0]
            albumname = res.al.name
            songname = res.name
            singer = res.ar[0].name
            picurl = res.al.picUrl
            document.querySelector('.playpagesongname').innerHTML = songname
            document.querySelector('.playpagealbumname').innerHTML = albumname
            document.querySelector('.playpagesinger').innerHTML = singer
            document.querySelector('.playpagepic').src = picurl
            document.querySelector('.lyric').innerHTML = lyric.replace(/\[.+?\]/g, "<br>")
        })
    })
    document.querySelector('.nextsongbtn').addEventListener('click', function () {
        setTimeout(function () {
            console.log(document.querySelector('.audio').title);
            playsongdetail()
        }, 500)
    })
    document.querySelector('.lastsongbtn').addEventListener('click', function () {
        setTimeout(function () {
            console.log(document.querySelector('.audio').title);
            playsongdetail()
        }, 500)
    })
}