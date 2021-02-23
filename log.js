//实现登录功能的打开和关闭
function openlogfunc() {
    setTimeout(function () {
        document.querySelector('.logfunc').style.display = 'block'
    }, 300)
}
function exitxx() {
    document.querySelector('.logfunc').style.display = 'none'
}


//实现鼠标经过登录键的颜色变化
document.querySelector('.logjian').addEventListener('mouseover', function () {
    document.querySelector('.logjian').style.backgroundColor = 'rgb(199,46,46)'
})
document.querySelector('.logjian').addEventListener('mouseout', function () {
    document.querySelector('.logjian').style.backgroundColor = ' #ea4848'
})


//登录
document.querySelector('.logjian').addEventListener('click', function () {
    let phone = document.querySelector('.phonenumber').value
    md_5pass = hex_md5(document.querySelector('.password').value)
    md_5pass = encodeURIComponent(md_5pass)
    url = `http://sandyz.ink:3000/login/cellphone?phone=${phone}&md5_password=${md_5pass}`
    let func = (res) => {
        console.log(res);
        if (res.code == 502) {
            document.querySelector('.password').value = ''
        }
        else if (res.code == 400) {
            document.querySelector('.password').value = ''
            document.querySelector('.phonenumber').value = ''
        }
        else {
            let { cookie } = res
            let userid = res.account.id
            window.localStorage.setItem('user_info', cookie)
            window.localStorage.setItem('user_id', userid)
            document.querySelector('.touxiang').src = res.profile.avatarUrl
            document.querySelector('.logstatus').innerHTML = res.profile.nickname
            setTimeout(function () {
                document.querySelector('.logfunc').style.display = 'none'
            }, 500)
        }

    }
    ajax1(url, func)
})


//用户歌单的展示
document.querySelector('.function4top').onclick = function () {
    userid = window.localStorage.getItem('user_id')
    let ul = document.querySelector('.function4')
    while (ul.children.length != 0) {
        ul.removeChild(ul.children[0])
    }
    document.querySelector('.gedantrangle').src = './pic/gedantrangle2.jpg'
    let func = (res) => {
        console.log(res);
        res = res.playlist
        for (let i = 0; i < res.length; i++) {
            let { name } = res[i]
            let hang = document.createElement('li')
            let pic = document.createElement('img')
            let listname = document.createElement('span')
            ul.appendChild(hang)
            hang.appendChild(pic)
            hang.appendChild(listname)
            pic.src = './pic/myplaylistpic.jpg'
            listname.innerHTML = name
            pic.className = 'myplaylistpic'
            listname.className = 'mylistname'
            hang.onclick = function () {
                showplaylistdetail(res[i].id)
            }
        }
    }
    ajax(`/user/playlist?uid=${userid}`, func)
}