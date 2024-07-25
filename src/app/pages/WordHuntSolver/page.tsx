'use client'

import KeyboardComponent from '@/components/Keyboard/KeyboardComponent'
import WordHuntBoardComponent from '@/components/WordHuntBoard/WordHuntBoardComponent'
import { getWordHuntData } from '@/services/DataService'
import React, { useEffect, useState } from 'react'

const WordHuntSolver = () => {

  const [wordbank, setWordBank] = useState<string[]>([]);

  const [boardData, setBoardData] = useState<string[][]>(
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
  )

  const [point, setPoint] = useState<number[]>([0, 0]);
  const [isBackspacing, setIsBackSpacing] = useState<boolean>(false);

  const goToNextSpot = () => {

    if (point[0] == 3 && point[1] == 3) {

    } else if (point[1] < 3) {
      let p = [point[0], point[1] + 1];
      setPoint(p)
    } else {
      let p = [point[0] + 1, 0];
      setPoint(p)
    }
  }

  const goBackOne = () => {
    if (point[0] == 0 && point[1] == 0) {

    } else if (point[1] > 0) {
      let p = [point[0], point[1] - 1];
      setPoint(p)
    } else {
      let p = [point[0] - 1, 3];
      setPoint(p)
    }
  }

  const addLetter = (letter: string) => {
    let board = boardData.map(row => [...row])
    board[point[0]][point[1]] = letter;
    setBoardData(board);
    goToNextSpot();
  }

  const handleBackspace = () => {
    if (point[0] == 3 && point[1] == 3 && (boardData[point[0]][point[1]] != '')) {
      deletePoint();
    } else {
      goBackOne();
      setIsBackSpacing(true);
    }
  }

  const deletePoint = () => {
    let board = boardData.map(row => [...row])
    board[point[0]][point[1]] = '';
    setBoardData(board);
  }

  const handleSubmit = async () => {
    console.log("running")
    let data = await getWordHuntData(boardData)
    console.log(data)
  }

  useEffect(() => {
    if (isBackspacing) {
      setIsBackSpacing(false);
      deletePoint();
    }
  }, [isBackspacing])



  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      addLetter(key.toUpperCase());
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [boardData]);

  return (
    <div className=' w-screen h-screen overflow-auto bg-teal-100 flex flex-col items-center pt-16 px-5 lg:px-20 space-y-10'>
      <div className=' flex flex-col items-center'>
        <div className=' w-full text-center font-RobotoBold text-4xl cursor-pointer'>Word Hunt Solver</div>
      </div>
      <div className=' grid grid-cols-3 w-full'>
        <div className=' col-start-2 w-full flex items-center justify-center'>
          <WordHuntBoardComponent boardData={boardData} />
        </div>

        <div className=' hidden md:block order-1 lg:order-2 border border-black px-5 w-full lg:p-5 font-Roboto text-lg overflow-auto'>
          <div className=' font-bold'>Possible Words: </div>
          {
            wordbank && wordbank.map((word, idx) => {
              return (
                (idx == 0) ? <span key={idx}>{word}</span> : <span key={idx}>{", " + word}</span>
              )
            })
          }
        </div>
      </div>

      <KeyboardComponent onClick={addLetter} handleBackspace={handleBackspace} handleSubmit={handleSubmit} />


    </div>
  )
}

export default WordHuntSolver