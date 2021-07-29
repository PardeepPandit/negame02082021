import React, { useState, useEffect } from "react";

const useAudio = url => {
    console.log("useAudio hook")
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  /* const toggle = () => setPlaying(!playing); */

  useEffect(() => {
    console.log("useAudio hook useEffect 1")
    playing ? audio.play() : audio.pause();
    
    },[playing]);

   useEffect(() => {
    console.log("useAudio hook useEffect 2")
    audio.addEventListener('ended',function () {
        console.log("Test 1")
        this.currentTime = 0;
        this.play();
      }, false);
    return () => {
        console.log('Test 2')
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []); 
console.log("Stop")
  return [playing, toggle];
};

const BackgroundMusic = ({ url }) => {
    console.log("Start")
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default BackgroundMusic;