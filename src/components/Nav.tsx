import React from 'react'
import coinPng from './coin.png'

function Nav({ onClick, volumeData, coins, playClickSound }: { onClick?: () => void; coins: number; volumeData: [number, React.Dispatch<React.SetStateAction<number>>], playClickSound: any }) {
  return (
    <div className='absolute top-5 flex w-full justify-between px-3 z-50'>
        { onClick ? <button onClick={() => {playClickSound();onClick()}}>
            <svg className='fill-white w-8 h-8' xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="512" height="512"><path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z"/></svg>
        </button> : <div className='w-8'></div> }
        {/* <div className='flex items-center -ml-8'>
          <img src={coinPng} alt="" className='h-[3.8rem] w-[3.8rem] '/>
          <span className='font-extrabold text-white text-3xl -ml-1 pb-1 lato'>{coins}</span>
        </div> */}
        <button className='flex justify-center items-center rounded-full sss h-12 w-12' onClick={() => volumeData[1]((prev: number) => prev ? 0 : 1)}>
            <svg className={`${!volumeData[0] && 'hidden'} fill-white w-6 h-6`} xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M20.8,4.293A1,1,0,0,0,19.39,5.707a8.911,8.911,0,0,1,0,12.586A1,1,0,1,0,20.8,19.707,10.911,10.911,0,0,0,20.8,4.293Z"/><path d="M18.093,7.293a1,1,0,1,0-1.414,1.414,4.664,4.664,0,0,1,0,6.586,1,1,0,1,0,1.414,1.414A6.665,6.665,0,0,0,18.093,7.293Z"/><path d="M13.819.207A12.055,12.055,0,0,0,6.268,5H5a5.006,5.006,0,0,0-5,5v4a5.006,5.006,0,0,0,5,5H6.269a12.051,12.051,0,0,0,7.55,4.793A1,1,0,0,0,15,22.81V1.19A1,1,0,0,0,13.819.207Z"/></svg>
            <svg className={`${!!volumeData[0] && 'hidden'} fill-white w-6 h-6`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m23.707,22.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l4.628,4.628C8.142,2.461,10.839.757,13.828.207c.288-.056.593.025.82.215.229.19.36.472.36.769v12.404l1.688,1.688c1.806-1.817,1.803-4.763-.01-6.576-.391-.391-.391-1.023,0-1.414.391-.391,1.023-.391,1.414,0,2.592,2.592,2.596,6.808.01,9.404l1.44,1.44c3.316-3.481,3.266-9.011-.152-12.43-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0c4.198,4.198,4.249,10.997.152,15.258l2.742,2.742ZM.009,10v4c0,2.757,2.243,5,5,5h1.269c1.807,2.502,4.53,4.237,7.551,4.793.06.011.12.017.181.017.232,0,.459-.081.64-.231.229-.19.36-.472.36-.769v-3.579L1.881,6.103C.74,7.02.009,8.426.009,10Z"/></svg>
        </button>
    </div>
  )
}

export default Nav 