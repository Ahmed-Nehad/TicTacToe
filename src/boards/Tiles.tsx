const Tiles = ({ canPlay, setValue, board, winner }: { canPlay: { current: boolean }; setValue: (arg: any) => any; board: string[]; winner: number[] }) => {
  return (
    <div className={(!canPlay.current ? 'no ' : '') + "grid grid-cols-3 grid-rows-3 gap-2 p-3 w-[80vw] h-[80vw] max-w-xl mx-auto bg-blue-600 rounded-3xl max-md:mt-[25vw]"} id="board">{
        board.map((b, i) => <div className={`bg-gray-900 rounded-xl flex items-center justify-center font-bold aspect-square overflow-hidden max-md:text-[22vw] text-[11rem] after:transition-all after:scale-0 ${!!b ? 'clicked' : ''} ${winner.includes(i) && 'win'} ${b.toLowerCase()}`} id={i.toString()} key={i} onClick={() => setValue(i)}></div>)
    }</div>
  )
}

export default Tiles