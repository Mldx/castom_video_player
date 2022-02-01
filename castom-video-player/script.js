const video = document.querySelector('.video-player__viewer');
const playButtons = [document.querySelector('.video-player__play'),
    document.querySelector('.controls__play')]
const playerViewer = document.querySelector('.video-player__viewer')
const rangeProgress = document.querySelector('.range_progress')

const playPause = () => {
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


playButtons.forEach((el) => el.addEventListener('click', playPause))
playerViewer.addEventListener('click', playPause)


rangeProgress.addEventListener('input',()=>{
    let mnoj = video.duration/100;
    video.currentTime = rangeProgress.value*mnoj;
    vPause()
})
rangeProgress.addEventListener('mouseup',()=>{
    vPlay()
})
