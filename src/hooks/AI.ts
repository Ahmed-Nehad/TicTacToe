const random = (board: string[]): number => {
    if(board.filter(Boolean).length===board.length) return -1;
    let pos = Math.floor(Math.random() * board.length);
    while(board[pos]) pos = Math.floor(Math.random() * board.length);
    return pos;
}

const isDanger = (board: string[], s: 'X' | 'O') => {
    for (let i = 0; i < 3; i++) {
        if(board[i*3]==='' && board[i*3+1]===s && board[i*3+2]===s) return i*3; 
        if(board[i*3]===s && board[i*3+1]==='' && board[i*3+2]===s) return i*3+1; 
        if(board[i*3]===s && board[i*3+1]===s && board[i*3+2]==='') return i*3+2; 

        if(board[i]==='' && board[i+3]===s && board[i+6]===s) return i;
        if(board[i]===s && board[i+3]==='' && board[i+6]===s) return i+3;
        if(board[i]===s && board[i+3]===s && board[i+6]==='') return i+6;
    }

    if(board[0]==='' && board[4]===s && board[8]===s) return 0;
    if(board[0]===s && board[4]==='' && board[8]===s) return 4;
    if(board[0]===s && board[4]===s && board[8]==='') return 8;

    if(board[6]==='' && board[4]===s && board[2]===s) return 6;
    if(board[6]===s && board[4]==='' && board[2]===s) return 4;
    if(board[6]===s && board[4]===s && board[2]==='') return 2;
    
    return -1;
}

export const easy = random;

export const mid = (board: string[]) => isDanger(board, 'X') !== -1 ? isDanger(board, 'X') : isDanger(board, 'O') !== -1 ? isDanger(board, 'O') : random(board);

export const hard = (board: string[]) => isDanger(board, 'O') !== -1 ? isDanger(board, 'O') : isDanger(board, 'X') !== -1 ? isDanger(board, 'X') : random(board);

const getBestSpot = (board: string[], player: 'X' | 'O') => {

    type boardType = (string|number)[];
    type playerType = 'X'|'O';

    const huPlayer: playerType = player === 'X' ? 'O' : 'X';
    const aiPlayer: playerType = player;
    let origBoard: boardType = board.map((b,i) => !b ? i : b);

    let bestSpot = minimax(origBoard, aiPlayer) as {index: number};

    return bestSpot.index;

    //loging the results
    // console.log("index: " + bestSpot.index);
    // console.log("function calls: " + fc);

    function minimax(newBoard: boardType, player: playerType){
        const availSpots = emptyIndexies(newBoard);

        if (winning(newBoard, huPlayer)) return {score:-10};
        else if (winning(newBoard, aiPlayer)) return {score:10}
        else if (availSpots.length === 0) return {score:0};

        let moves: {index: number; score: number}[] = [];

        for (let i = 0; i < availSpots.length; i++){

            let move: {index?: number; score?: number} = {};

            move.index = newBoard[availSpots[i]] as number;

            newBoard[availSpots[i]] = player;

            if (player===aiPlayer){
                move.score = minimax(newBoard, huPlayer).score;
            }else{
                move.score = minimax(newBoard, aiPlayer).score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move as any);
        }

        let bestMove;
        if(player === aiPlayer){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove as number] as {index: number; score: number};
    }

    function emptyIndexies(board: boardType):number[] {
        return board.filter(s => s !== huPlayer && s !== aiPlayer) as any;
    }

    function winning(board: boardType, player: playerType){
        if (
            (board[0]===player && board[1]===player && board[2]===player) ||
            (board[3]===player && board[4]===player && board[5]===player) ||
            (board[6]===player && board[7]===player && board[8]===player) ||
            (board[0]===player && board[3]===player && board[6]===player) ||
            (board[1]===player && board[4]===player && board[7]===player) ||
            (board[2]===player && board[5]===player && board[8]===player) ||
            (board[0]===player && board[4]===player && board[8]===player) ||
            (board[2]===player && board[4]===player && board[6]===player)
            ) {
            return true;
        } else {
            return false;
        }
    }
}

export const imp = (board: string[]) => isDanger(board, 'O') !== -1 ? isDanger(board, 'O') : isDanger(board, 'X') !== -1 ? isDanger(board, 'X') : getBestSpot(board, 'O');