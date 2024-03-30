const LevelSelect = ({ setShow, setShowBoard, setDifficulty, playClickSound }: { setShow: (arg:any) => any; setShowBoard: (arg:any) => any; setDifficulty: (arg:any) => any; playClickSound:any }) => {
  return (
    <div onClick={() => setShow(false)} className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
      <div className="left-1/2 -translate-x-1/2 bg-[#3e54c4] z-10 absolute top-1/2 border-2 border-blue-950 ff -translate-y-1/2 rounded-xl min-w-64">
        <div className="text-2xl mx-6 text-white border-blue-950 bg-black bg-opacity-40 text-nowrap whitespace-nowrap ff py-2 px-5 rounded-b-2xl"><span className='text-nowrap whitespace-nowrap text-center'>Choose difficulty</span></div>
        <div className="mx-4 py-8 *:w-full *:rounded-full *:bg-gradient-to-br *:from-[#6313d7] *:border-[#6313d7] *:to-[#4d1b97d5] *:text-white *:text-xl *:py-3 *:drop-shadow-lg">
          <button onClick={() => {playClickSound();setDifficulty('easy');setShowBoard(true);}} className="ff">Easy</button>
          <button onClick={() => {playClickSound();setDifficulty('mid');setShowBoard(true);}} className="ff mt-4 mb-2">Medium</button>
          <button onClick={() => {playClickSound();setDifficulty('hard');setShowBoard(true);}} className="ff mb-4 mt-2">Hard</button>
          <button onClick={() => {playClickSound();setDifficulty('imp');setShowBoard(true);}} className="ff">Impossible</button>
        </div>
      </div>
    </div> 
  )
} 

export default LevelSelect