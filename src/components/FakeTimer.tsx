import React, { useEffect, useState } from 'react'

const FakeTimer = ({ className }:{ className: string }) => {
  const [time, setTime] = useState(30);
  useEffect(() => {
      const i = setTimeout(() => {
        setTime(prev => { 
          if(prev<=0.1){clearInterval(i); return 0.0001;}
          return prev-0.1
        });
      }, 1000 * 0.1);

      return () => {
        clearTimeout(i);
      }
  });

  const map = (value: number, in_min: number, in_max: number, out_min: number,out_max: number) => {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  return (
    <div className={`text-green-300 ${className}`}>
      <svg className='w-[15vw] transition-all *:transition-all' viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <circle cx="400" cy="400" fill="none"
          r="200" strokeWidth="50" stroke="rgb(134 239 172)"
          strokeDasharray={`${map(time-1, 0, 30, 0, 1257)} 1400`}
          strokeLinecap="round" 
        />
      </svg>
    </div>
  )
}

export default FakeTimer