const video = document.querySelector('.video-player__viewer');
const playButtons = [document.querySelector('.video-player__play'),
    document.querySelector('.controls__play')]
const playerViewer = document.querySelector('.video-player__viewer')
const rangeProgress = document.querySelector('.range_progress')
const rangeVolume = document.querySelector('.range_volume')
const controlsVolume = document.querySelector('.controls__volume')
const controlsPanel = document.querySelector('.video-player__controls')
const timeDuration = document.querySelector('.time__duration')
const timeCurrent = document.querySelector('.time__current')
const poster = document.querySelector('.poster')

const playPause = () => {

    timeDuration.innerText = `${String(Math.trunc(video.duration/60)).padStart(2,'0')}:${String((video.duration%60).toFixed(0)).padStart(2,'0')}`
    if (!playButtons[1].classList.contains('controls__pause')) {
        video.play();
        playButtons[0].style.display = 'none';
        playButtons[1].classList.toggle('controls__pause')

    } else {
        video.pause();
        playButtons[0].style.display = 'flex';
        playButtons[1].classList.toggle('controls__pause')
    }
}
const vPlay = () => {
    if (!playButtons[1].classList.contains('controls__pause')) {
        video.play();
        playButtons[0].style.display = 'none';
        playButtons[1].classList.add('controls__pause')
    }
}
const vPause = () => {
    if (playButtons[1].classList.contains('controls__pause')) {
        video.pause();
        playButtons[0].style.display = 'flex';
        playButtons[1].classList.remove('controls__pause')
    }
}

playButtons.forEach((el) => el.addEventListener('click', ()=>{
    playPause();
    poster.style.opacity = '0';
    setTimeout(()=>poster.style.display = 'none',500)

}))
playerViewer.addEventListener('click', ()=>playPause())

playerViewer.addEventListener('mouseenter',()=>{
    controlsPanel.style.bottom = '0'
})
playerViewer.addEventListener('mouseleave',()=>{
    if (playButtons[1].classList.contains('controls__pause')) {
    controlsPanel.style.bottom = '-60px'
        }
})
controlsPanel.addEventListener('mouseenter',()=>{
    controlsPanel.style.bottom = '0'
})
controlsPanel.addEventListener('mouseleave',()=>{
    if (playButtons[1].classList.contains('controls__pause')) {
        controlsPanel.style.bottom = '-60px'
    }
})

rangeProgress.addEventListener('input', () => {
    let temp = video.duration / 100;
    video.currentTime = rangeProgress.value * temp;
    vPause()
    playButtons[0].style.display = 'none';

    rangeProgress.style = `background:linear-gradient(to right,`+
        `#CC6666 0%,`+
        `#CC6666 ${rangeProgress.value}%,`+
        `rgb(200, 200, 200) ${rangeProgress.value}%,`+
        `rgb(200, 200, 200) 100%);`
})

rangeProgress.addEventListener('mouseup', () => {
    if (video.currentTime !== video.duration) {
        vPlay()
    }
})

video.addEventListener('timeupdate', () => {
    timeCurrent.innerText = `${String(Math.trunc(video.currentTime/60)).padStart(2,'0')}:${String((video.currentTime%60).toFixed(0)).padStart(2,'0')}`
    let temp = video.currentTime/(video.duration / 100);
    rangeProgress.value =temp.toFixed(1);
    console.log(rangeProgress.value)

    rangeProgress.style = `background:linear-gradient(to right,`+
    `#CC6666 0%,`+
     `#CC6666 ${rangeProgress.value}%,`+
      `rgb(200, 200, 200) ${rangeProgress.value}%,`+
       `rgb(200, 200, 200) 100%);`

})
video.volume = rangeVolume.value/100;
rangeVolume.addEventListener('input', () => {
    video.volume = rangeVolume.value/100;
    rangeVolume.style = `background:linear-gradient(to right,`+
        `#CC6666 0%,`+
        `#CC6666 ${rangeVolume.value}%,`+
        `rgb(200, 200, 200) ${rangeVolume.value}%,`+
        `rgb(200, 200, 200) 100%);`
    rangeVolume.value==='0'?controlsVolume.classList.add('muted'):controlsVolume.classList.remove('muted');
})

controlsVolume.addEventListener('click',()=>{
    video.muted?video.muted=false:video.muted=true
    controlsVolume.classList.toggle('muted')
})
