import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
import useSound from 'use-sound';
import Nav from '../components/Nav';
import Timer from '../components/Timer';
import Tiles from './Tiles';
import FakeTimer from '../components/FakeTimer';

const endSound = require('../sounds/gameover.mp3');
const errorSound = require('../sounds/hit.wav');

type socketData = {
    socket: Socket;
    id: string;
    start: boolean;
    name1: string;
    name2: string
};

type props = {
    volumeData: [number, React.Dispatch<React.SetStateAction<number>>];
    setShow: (arg: any, arg2: any) => void;
    playClickSound: any;
    start: boolean;
    SocketData: socketData
};

const BoardOnline = ({ volumeData, setShow, playClickSound, start, SocketData }: props) => {

    const [volume] = volumeData;
    const [playErrorSound] = useSound(errorSound, { volume: volume * 0.1 });
    const [playGameOverSound] = useSound(endSound, { volume: volume * 0.5 });

    const [socketData, setSocketData] = useState<socketData>(SocketData);
    const [board, setBoard] = useState(Array(9).fill(''));
    const [scores, setScores] = useState<number[]>([0, 0]);
    const [winner, setWinner] = useState<number[]>([]);
    const canPlay = useRef(start);
    const myturn = useRef(start);
    const lastVal = useRef('X');

    useEffect(() => {
        socketData.socket.on('re', ({ id, p1, p2 }) => {
            setSocketData(prev => ({ ...prev, name1: p1.name, name2: p2.name, id }));
            setBoard(Array(9).fill(''));
            setScores([0, 0]);
            setWinner([]);
            canPlay.current = false;
            myturn.current = false;
            lastVal.current = 'X';
        });

        return () => { socketData.socket.off('re') }
    }, [socketData.socket]);

    const lose = (player?: string) => {
        canPlay.current = false;
        playGameOverSound();
        setTimeout(() => {
            if (player) {
                setScores(prev => { let temp = [...prev]; temp[player === 'X' ? 0 : 1] += 1; return temp });
                lastVal.current = ((board.filter(b => !!b).length % 2) === 1 ?
                    (player === 'X' ? 'O' : 'X') : player);
            } else {
                lastVal.current = board.filter(b => b === 'X').length > board.filter(b => b === 'O').length ? 'O' : 'X';
            }
            myturn.current = (lastVal.current === 'X' && start) || (lastVal.current === 'O' && !start);
            canPlay.current = myturn.current;
            setBoard(Array(9).fill(''));
            setWinner([]);
        }, 2000);
    }

    const check = () => {
        const cS = (s: 'X' | 'O') => {
            for (let i = 0; i < 3; i++) {
                if (board[i * 3] === s && board[i * 3 + 1] === s && board[i * 3 + 2] === s) return [i * 3, i * 3 + 1, i * 3 + 2];
                if (board[i] === s && board[i + 3] === s && board[i + 6] === s) return [i, i + 3, i + 6];
            }
            if (board[0] === s && board[4] === s && board[8] === s) return [0, 4, 8];
            if (board[6] === s && board[4] === s && board[2] === s) return [2, 4, 6];
            return [];
        }

        let x = cS('X');
        let o = cS('O');

        if (!!x.length || !!o.length) {
            const player = !!x.length ? 'X' : 'O';
            lose(player);
            setWinner(!!x.length ? x : o);
        } else if (board.filter(b => !!b).length === 9) {
            lose();
            setWinner([]);
        }
    }

    const setValue = (pos: number, ig = false) => {
        let place = board[pos];
        if (((canPlay.current && myturn.current) || ig) && !place) {
            playClickSound();
            const val = lastVal.current;
            setBoard(prev => {
                let temp = [...prev];
                temp.splice(pos, 1, val as any);
                return temp;
            });
            !ig && socketData.socket.emit('move', { pos, id: socketData.id });
            lastVal.current = lastVal.current === 'X' ? 'O' : 'X';
            myturn.current = !myturn.current;
            canPlay.current = myturn.current;
        } else {
            playErrorSound();
        }
    }

    useEffect(() => {
        check();
    }, [board]);

    useEffect(() => {
        socketData.socket.on("updateGame", pos => {
            setValue(pos, true);
        })

        return () => { socketData.socket.off("updateGame") }
    });

    return (
        <div className="animate-show !z-40 min-h-[100vh] flex flex-col items-center justify-center overflow-hidden from-blue-800 to-60% bg-gradient-to-b to-blue-950 absolute left-0 right-0">
            <div className='absolute top-0 left-0 z-20 right-0 bottom-[50%] pointer-events-none'>
                <div className={`${(!!winner.length || board.filter(b => !!b).length === 9) && 'animate-faden'} pointer-events-none opacity-0 text-green-200 font-bold text-4xl absolute left-1/4 right-1/4 text-center`}>{!winner.length ? 'Draw' : `${lastVal.current === "O" ? socketData.name1 : socketData.name2}\n won`}</div>
            </div>
            <Nav onClick={() => { setShow(false, socketData.socket); }} volumeData={volumeData} playClickSound={playClickSound} />
            <div className='absolute left-0 right-0 top-[13%] mx-auto flex w-[85%] gap-6 justify-center items-center'>
                 <div className={`bg-opacity-40 shadow-xl transition-all ${lastVal.current === 'X' ? 'shadow-blue-700' : ''} bg-black rounded-xl h-24 w-[35vw] pb-[3px] justify-end items-center relative inline-flex flex-col mr-[10vw]`}>
                    <div className="p x"></div>
                    <div className={`${lastVal.current !== 'X' && 'opacity-60'} text-white font-semibold`}>{socketData.name1}</div>
                    <div className='text-white font-bold text-2xl'>{scores[0]}</div>
                </div>
                { myturn.current && <Timer disconnect={()=>{setShow(false, socketData.socket);}} className='absolute' children={<></>} /> }
                { !myturn.current && <FakeTimer className='absolute' /> }
                <div className={`bg-opacity-40 bg-black rounded-xl h-24 w-36 shadow-xl transition-all ${lastVal.current === 'O' ? 'shadow-blue-700' : ''} pb-[3px] w-[35vw] justify-end items-center relative inline-flex flex-col`}>
                    <div className="p o"></div>
                    <div className={`${lastVal.current !== 'O' && 'opacity-60'} text-white font-semibold`}>{socketData.name2}</div>
                    <div className='text-white font-bold text-2xl'>{scores[1]}</div>
                </div>
            </div>
            <Tiles board={board} canPlay={canPlay} setValue={setValue} winner={winner} />
        </div>
    )
}

export default BoardOnline