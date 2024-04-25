import { useEffect, useRef } from 'react';
import './GlassBg.css'

function GlassBg() {
  const blobRef = useRef(null);

  useEffect(()=>{
    blobRef.current.animate({
      transform: ["rotate(0deg) scale(1)","rotate(180deg) scale(1.3)","rotate(360deg) scale(1)"]
    },{duration:8000,iterations:Infinity})
    document.onpointermove = (e) => {
      blobRef.current.animate({
        top: (e.clientY - 70 / 2) + "px",
        left: (e.clientX - 150 / 2) + "px"
      },{duration:800,fill:"forwards"});
    };
  },[]);
  return (
    <>
      <div className="blob" ref={blobRef}></div>
      <div className="glass-bg"></div>
    </>
  )
}

export default GlassBg;
