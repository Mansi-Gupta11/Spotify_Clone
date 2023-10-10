console.log("Welcome to Spotify");

//  keeps track of the index of the currently playing song.
let songIndex = 0;
//creates an HTML Audio element and sets its initial source to 'songs/1.mp3'.
let audioElement = new Audio('songs/1.mp3');
//refers to a DOM element with the id 'masterPlay'.
let masterPlay = document.getElementById('masterPlay');
//refers to a DOM element with the id 'myProgressBar'.
let myProgressBar = document.getElementById('myProgressBar');
// refers to a DOM element with the id 'gif'.
let gif = document.getElementById('gif');
//refers to a DOM element with the id 'masterSongName'.
let masterSongName = document.getElementById('masterSongName');
// is an array created from a collection of DOM elements with the class 'songItem'.
let songItems = Array.from(document.getElementsByClassName('songItem'));



//This is an array of song objects, each containing information about a song, including its name, file path, and cover image path.
let songs = [
    {songName: "Radha Kaise Na Jale", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Woh Kisna Hai", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Shiva Tandava", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Om Namah Shivay", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Bagad Bam Bam", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tum prem ho Preet ho", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Achyutum keshavam", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Hare Krishna Hare rama", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Ram Siya Ram", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Devon ke Dev Mahadev", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]



//aThis code uses a forEach loop to iterate over each element in the songItems array. For each element:
songItems.forEach((element, i)=>{
    //sets the src attribute of the first <img> element inside the first .songItem to "covers/cover1.jpg" and continue the loop
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    //sets the text content of the first .songName element inside the first .songItem to "Song 1". and does same for each itration
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 


// Handle play/pause click
//This line sets up an event listener on the masterPlay element. It listens for a click event on that element.
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        //This line plays the audio
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        //making gif visible
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})



// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})



myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        /* This line parses the id attribute of the clicked element (which is presumably used to identify the song 
        associated with the button) and assigns it to the songIndex variable. */
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})