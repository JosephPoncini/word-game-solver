'use client'

import KeyboardComponent from '@/components/Keyboard/KeyboardComponent'
import WordHuntBoardComponent from '@/components/WordHuntBoard/WordHuntBoardComponent'
import React, { useState } from 'react'

const WordHuntSolver = () => {

  const [boardData, setBoardData] = useState<string[][]>(
    [['','','',''],['','','',''],['','','',''],['','','','']]
  )

  return (
    <div className=' w-screen h-screen overflow-auto bg-teal-100 flex flex-col items-center pt-16 px-5 lg:px-20 pb-4 lg:pb-10'>
      <div className=' flex flex-col items-center mb-5'>
        <div  className=' font-RobotoBold text-4xl cursor-pointer'>Word Hunt Solver</div>
      </div>
      <WordHuntBoardComponent boardData={boardData}/>
      <KeyboardComponent onClick={()=>{}} handleBackspace={()=>{}} handleSubmit={()=>{}} />
    </div>
  )
}

export default WordHuntSolver