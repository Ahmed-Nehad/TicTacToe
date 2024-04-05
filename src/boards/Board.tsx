import React, { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound';
import Nav from '../components/Nav';
import { easy, hard, mid, imp } from '../hooks/AI';
import Tiles from './Tiles';

const endSound = require('../sounds/gameover.mp3');
const errorSound = require('../sounds/hit.wav');

type props = {
    difficulty: '' | 'easy' | 'mid' | 'hard' | 'imp';
    volumeData: [number, React.Dispatch<React.SetStateAction<number>>];
    setShow: (arg: any) => void;
    playClickSound: any;
};

type board = ('' | 'X' | 'O')[];

const Board = ({ difficulty, volumeData, setShow, playClickSound }: props) => {

    const [volume] = volumeData;
    const [playErrorSound] = useSound(errorSound, { volume: volume * 0.1 });
    const [playGameOverSound] = useSound(endSound, { volume: volume * 0.5 });

    const [board, setBoard] = useState<board>(Array(9).fill(''));
    const [scores, setScores] = useState<number[]>([0, 0]);
    const [winner, setWinner] = useState<number[]>([]);
    const canPlay = useRef(true);
    const lastVal = useRef('X');

    const lose = (player = '') => {
        canPlay.current = false;
        playGameOverSound();
        setTimeout(() => {
            if (player) {
                setScores(prev => { let temp = [...prev]; temp[player === 'X' ? 0 : 1] += 1; return temp as any });
                lastVal.current = ((board.filter(b => !!b).length % 2) === 1 ?
                    (player === 'X' ? 'O' : 'X') : player);
            } else {
                lastVal.current = board.filter(b => b === 'X').length > board.filter(b => b === 'O').length ? 'O' : 'X';
            }
            canPlay.current = true;
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

    const setValue = (pos: number) => {
        let place = board[pos];
        if (canPlay.current && !place) {
            playClickSound();
            const val = lastVal.current;
            setBoard(prev => {
                let temp = [...prev];
                temp.splice(pos, 1, val as any);
                return temp;
            });
            lastVal.current = lastVal.current === 'X' ? 'O' : 'X';
        } else {
            playErrorSound();
        }
    }

    useEffect(() => {
        check();
    }, [board]);

    useEffect(() => {
        if (difficulty && canPlay.current && !winner.length && lastVal.current === 'O' && board.filter(Boolean).length !== board.length) {
            canPlay.current = false;
            setTimeout(() => {
                canPlay.current = true;
                setValue(difficulty === 'easy' ? easy(board) : difficulty === 'mid' ? mid(board) : difficulty === 'hard' ? hard(board) : imp(board));
            }, Math.floor(Math.random() * 200) + 200)
        }
    });

    return (
        <div className="animate-show !z-40 min-h-[100vh] flex flex-col items-center justify-center md:justify-end md:pb-[15vh]  overflow-hidden from-blue-800 to-60% bg-gradient-to-b to-blue-950 absolute left-0 right-0">
            <div className='absolute top-0 left-0 z-20 right-0 bottom-[50%] pointer-events-none'>
                <div className={`${(!!winner.length || board.filter(b => !!b).length === 9) && 'animate-faden'} pointer-events-none opacity-0 text-green-200 font-bold text-4xl absolute left-1/4 right-1/4 text-center`}>{!winner.length ? 'Draw' : `${lastVal.current === "O" ? "Player 1" : (difficulty ? "Computer" : "Player 2")}\n won`}</div>
            </div>
            <Nav onClick={() => { setShow(false) }} volumeData={volumeData} playClickSound={playClickSound} />
            <div className='absolute mx-auto top-[13%] md:top-[10%]'>
                <div className={`bg-opacity-40 shadow-xl transition-all ${lastVal.current === 'X' ? 'shadow-blue-700' : ''} bg-black rounded-xl h-24 w-[35vw] max-w-60 pb-[3px] justify-end items-center relative inline-flex flex-col mr-[10vw]`}>
                    <div className="p x"></div>
                    <div className={`${lastVal.current !== 'X' && 'opacity-60'} text-white font-semibold`}>Player 1</div>
                    <div className='text-white font-bold text-2xl'>{scores[0]}</div>
                </div>
                <div className={`bg-opacity-40 bg-black rounded-xl h-24 w-36 shadow-xl transition-all ${lastVal.current === 'O' ? 'shadow-blue-700' : ''} pb-[3px] w-[35vw] max-w-60 justify-end items-center relative inline-flex flex-col`}>
                    <div className="p o"></div>
                    <div className={`${lastVal.current !== 'O' && 'opacity-60'} text-white font-semibold`}>{difficulty ? "Computer" : "Player 2"}</div>
                    <div className='text-white font-bold text-2xl'>{scores[1]}</div>
                </div>
            </div>
            <Tiles board={board} canPlay={canPlay} setValue={setValue} winner={winner} />
        </div>
    )
}

export default Board