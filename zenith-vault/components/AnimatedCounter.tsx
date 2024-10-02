'use client';

import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount:number}) => {


  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted on the client before rendering CountUp
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering on the server
  }
  return (
    <div className='w-full'>
      <CountUp 
      duration={2}
      decimal=","
      prefix='$'
      end={amount}/>
    </div>
  )
}

export default AnimatedCounter
