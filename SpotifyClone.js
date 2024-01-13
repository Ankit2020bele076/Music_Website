console.log('Welcome to Spotify')

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('3.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let bottomName = document.getElementById('bottomName')
let songs= [
    {songName: "Tu Hai To Mujhe", filePath: "0.mp3", coverPath: "Tu Hai To Mujhe.jfif"},
    {songName: "Cheques", filePath: "1.mp3", coverPath: "Cheques.jfif"},
    {songName: "Namo Namo", filePath: "2.mp3", coverPath: "Namo Namo.jfif"},
    {songName: "Ram Siya Ram", filePath: "3.mp3", coverPath: "Ram Siya Ram.jfif"},
    {songName: "Zihaal e Miskin", filePath: "4.mp3", coverPath: "Zihaal e Miskin.jfif"},
]

songItems.forEach((element, i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',() =>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays()
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `${songIndex}.mp3`
        bottomName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElement.src = `${songIndex}.mp3`
    bottomName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1;
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElement.src = `${songIndex}.mp3`
    bottomName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1;
})