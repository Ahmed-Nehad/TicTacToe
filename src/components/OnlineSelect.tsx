import { useState } from 'react'
import { Socket } from 'socket.io-client';

const OnlineSelect = ({ setShow, connect, disconnect, waiting, playClickSound }: { setShow: (arg: any) => any; connect: (name: string) => any; disconnect: (a: any) => any; waiting: boolean; playClickSound: any }) => {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState<Socket>();
  const start = () => {
    playClickSound();
    const ssocket = connect(name || "Guest");
    setSocket(ssocket);
  }
  const stop = () => disconnect(socket);
 
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
      <div className="left-1/2 -translate-x-1/2 bg-[#3e54c4] z-10 absolute top-1/2 border-2 border-blue-950 ff -translate-y-1/2 rounded-xl min-w-64 p-6">
        <button onClick={() => { stop(); setShow(false) }} className='absolute top-0 left-0 bg-red-500 rounded-full h-10 w-10 ff border-none text-white -translate-y-1/2 -translate-x-1/2 font-bold' ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg></button>
        <input className='bg-black bg-opacity-20 text-white p-3 rounded-xl ff border-none w-full' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='your name...' />
        <button onClick={waiting ? stop : start} className={`ff border-none rounded-full bg-[#d62a8c] text-white text-xl py-3 w-full mt-4 drop-shadow-lg ${(waiting || !name.length) && "!bg-gray-500 !px-0 w-72"}`}>{
          waiting ? (<>
            <svg aria-hidden="true" role="status" className="inline w-7 h-7 me-3 text-indigo-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>Searching</>
          ) : 'Play'}
        </button>
      </div>
    </div>
  )
}

export default OnlineSelect