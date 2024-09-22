import React from 'react'
import './Topbar.css'
import { FaBatteryFull, FaWifi,FaSignal } from 'react-icons/fa';


const Topbar = () => {
    
  return (
    <div className='topbar'>
     <p className='time'>10.20</p>
      <div className="topbar">
        <FaBatteryFull className='icons1'/>
        <FaWifi className='icons'/>
        <FaSignal className='icons'/>
      </div>
    </div>
  )
}

export default Topbar
