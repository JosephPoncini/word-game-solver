import React from 'react'

interface IKeyBoardTile {
    letter: string
    onClick: (letter:string)=>void
}

const KeyBoardTileComponent = ({letter, onClick}:IKeyBoardTile) => {
  return (
    <div onClick={() => onClick(letter)}  className=' w-[32px] h-[40px] md:w-[50px] md:h-[50px] rounded-md border-2 border-black font-Lalezar bg-white flex justify-center items-center md:text-2xl cursor-pointer'>{letter}</div>
  )
}

export default KeyBoardTileComponent