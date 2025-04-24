'use client'

import KeyboardComponent from '@/components/Keyboard/KeyboardComponent'
import WordHuntBoardComponent from '@/components/WordHuntBoard/WordHuntBoardComponent'
import { getWordHuntData } from '@/services/DataService'
import React, { useEffect, useState } from 'react'

const WordHuntSolver = () => {

  const [loading, setLoading] = useState(false);

  const [modalOn, setModalOn] = useState<boolean>(false)

  const [warningMessage, setWarningMessage] = useState<string>('')

  const [wordbank, setWordBank] = useState<string[]>([]);

  const [boardData, setBoardData] = useState<string[][]>(
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
  )

  const [point, setPoint] = useState<number[]>([0, 0]);
  const [isBackspacing, setIsBackSpacing] = useState<boolean>(false);

  const checkForBlanks = () => {
    let result = false;

    boardData.map((row) => {
      row.map((letter) => {
        if (letter == '') {
          result = true
        }
      })
    })

    return result
  }

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
    if (!checkForBlanks()) {
      setLoading(true)
      console.log("running")
      let data = await getWordHuntData(boardData)
      setLoading(false)
      setWordBank(data);
      setModalOn(true)
      setWarningMessage('')
    } else {
      setWarningMessage('The whole board must be filled :)')
    }

  }

  const closeModal = () => {
    setModalOn(false);
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
    <div className=' w-screen h-screen relative overflow-auto bg-[#688c61] flex flex-col items-center pt-16 px-5 lg:px-20 space-y-8 pb-10'>

      <div className={loading ? `bg-[#00000080] absolute inset-0 px-10 flex flex-col justify-center items-center ` : `hidden`}>
        <div className=' text-white font-Roboto text-center w-full'>Thinking...</div>
        <div className=' text-white font-Roboto text-center w-full'>...if this takes too long you may need to refresh the page and try again...</div>
      </div>

      <div className={modalOn ? `sm:hidden bg-[#00000080] absolute inset-0 px-10 flex items-center ` : `hidden`}>
        <div className=' bg-white w-full h-[70vh] rounded-lg p-5 flex-col items-center overflow-auto'>
          <div className=' w-full flex justify-end '>
            <svg onClick={closeModal} className=' cursor-pointer' fill="#FF0000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 460.775 460.775">
              <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	                    c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
		                  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
		                  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
		                  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
		                  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
            </svg>
          </div>
          <div className=' w-full'>
            <div className=' font-bold underline mb-2'>Possible Words: </div>
            {
              wordbank && wordbank.map((word, idx) => {
                return (
                  (idx == 0) ? <span key={idx}>{word}</span> : <span key={idx}>{", " + word}</span>
                )
              })
            }
          </div>


        </div>
      </div>


      <div className=' flex flex-col items-center'>
        <div className=' text-center font-RobotoBold text-4xl cursor-pointer bg-[#f7d960] rounded-md px-4 py-2'>Word Hunt Solver</div>
        <div className=' h-[20px] text-[#fca5a5] font-Roboto text-sm'>{warningMessage}</div>
      </div>
      <div className=' grid grid-cols-3 w-full'>
        <div className=' col-start-2 w-full flex items-center justify-center'>
          <WordHuntBoardComponent boardData={boardData} />
        </div>

        <div className=' hidden md:block order-1 lg:order-2 border border-black rounded-lg bg-white px-5 w-full lg:p-5 font-Roboto text-lg overflow-auto max-h-[304px]'>
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