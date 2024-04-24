import { useEffect, useRef } from 'react';
import './GlassBg.css'

function GlassBg() {
  const blobRef = useRef(null);

  useEffect(()=>{
    window.addEventListener("mousemove",(e)=>{
      blobRef.current.style.top = (e.clientY) + "px";
      blobRef.current.style.left = (e.clientX) + "px";
    });
  },[]);
  return (
    <>
      <div className="blob" ref={blobRef}></div>
      <div className="glass-bg"></div>
    </>
  )
}

export default GlassBg;
