import { useState } from "react";

import { Socket, connect as ioConnect } from "socket.io-client";
import Nav from "./components/Nav";
import Board from "./boards/Board";
import LevelSelect from "./components/LevelSelect";
import useSound from "use-sound";
import OnlineSelect from "./components/OnlineSelect";
import BoardOnline from "./boards/OnlineBoard";

const clickSound = require('./sounds/click.mp3');

type socketData = {} | { socket: Socket } | {
  socket: Socket;
  id: string;
  start: boolean;
  name1: string;
  name2: string
};

function App() {

  const volumeData = useState(1);
  const [playClickSound] = useSound(clickSound, { volume: volumeData[0] * 0.4 });
  const [showBoard, setShowBoard] = useState(false);
  const [difficulty, setDifficulty] = useState<'' | 'easy' | 'mid' | 'hard' | 'imp'>('');
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [socketData, setSockeData] = useState<socketData>({});
  const [waiting, setWaiting] = useState<boolean>(false);
  const [showOnlineSelect, setShowOnlineSelect] = useState(false);
  const [showOnlineBoard, setShowOnlineBoard] = useState(false);

  const connect = (name: string) => {
    const socket = ioConnect("https://tictactoe-backend-kvgn.onrender.com");
    setSockeData({ socket });
    socket.emit("join", name);
    setWaiting(true);
    socket.on('ready', ({ id, p1, p2 }: { id: string; p1: { name: string; id: string }; p2: { name: string; id: string } }) => {
      setSockeData(prev => ({ ...prev, start: name === p1.name, name1: p1.name, name2: p2.name, id }));
      setShowOnlineBoard(true);
    });
    socket.on('dis', () => {
      setShowOnlineBoard(false);
      setWaiting(true);
    });
    return socket;
  }

  const disconnect = (socket?: Socket) => {
    if (socket) socket.disconnect();
    setWaiting(false);
  }

  return <>
    <div className={`z-20 min-h-[100vh] flex flex-col items-center justify-center overflow-hidden from-blue-800 to-60% bg-gradient-to-b to-blue-950 relative !p-0 !m-0`}>
      <Nav volumeData={volumeData} playClickSound={playClickSound} />
      <div className="absolute top-[15vh] logo h-52 w-52">
        <span className="xo absolute top-0 left-0">X</span>
        <span className="ox absolute bottom-0 right-0">O</span>
      </div> 
      <div className="absolute bottom-[10vh] items-center px-10 max-w-lg mx-auto">
        <button onClick={() => { playClickSound(); setShowLevelSelect(true) }} className="bg-[#13bad7] border-[#13bad7] ff text-xl py-4 w-full text-white font-semibold rounded-full">Single Player</button>
        <button onClick={() => { playClickSound(); setDifficulty(''); setShowBoard(true) }} className="bg-[#6313d7] border-[#6313d7] ff text-xl py-4 w-full text-white font-semibold rounded-full my-4">Play with friend</button>
        <button onClick={() => { playClickSound(); setShowOnlineSelect(true) }} className={"bg-[#a812cf] border-[#a812cf] ff text-xl py-4 w-full text-white font-semibold rounded-full"}>Play Online</button>
      </div>
      {showOnlineSelect && <OnlineSelect setShow={setShowOnlineSelect} connect={connect} disconnect={disconnect} waiting={waiting} playClickSound={playClickSound} />}
      {showLevelSelect && <LevelSelect setShow={setShowLevelSelect} setDifficulty={setDifficulty} setShowBoard={setShowBoard} playClickSound={playClickSound} />}
      {showBoard && <Board setShow={setShowBoard} difficulty={difficulty} volumeData={volumeData} playClickSound={playClickSound} />}
      {showOnlineBoard && <BoardOnline setShow={(b: any, socket: any) => { disconnect(socket); setShowOnlineBoard(b) }} volumeData={volumeData} playClickSound={playClickSound} SocketData={socketData as any} start={(socketData as any).start} />}
    </div>
  </>;
}

export default App;