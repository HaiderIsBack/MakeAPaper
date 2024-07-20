import { useEffect, useRef } from 'react';
import './GlassBg.css'

function GlassBg() {
  const blobRef = useRef(null);

  const handlePointerMove = (e) => {
    blobRef.current.animate({
      top: (e.pageY - 70 / 2) + "px",
      left: (e.pageX - 150 / 2) + "px"
    },{duration:800,fill:"forwards"});
  }

  useEffect(()=>{
    blobRef.current.animate({
      transform: ["rotate(0deg) scale(1)","rotate(180deg) scale(1.3)","rotate(360deg) scale(1)"]
    },{duration:8000,iterations:Infinity})
    
    document.addEventListener("pointermove", handlePointerMove)
    return () => document.removeEventListener("pointermove", handlePointerMove)
  },[]);
  return (
    <>
      <div className="blob" ref={blobRef}></div>
      <div className="glass-bg"></div>
    </>
  )
}

export default GlassBg;
