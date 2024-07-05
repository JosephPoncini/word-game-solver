'use client'
import React, { useEffect, useState } from 'react'

interface IWordleTileComponent {
  letter: string
  isActive: boolean
  index: number
  code: string
  setCode: (code: string) => void
}

const WordleTileComponent = ({ letter, isActive, index, code, setCode }: IWordleTileComponent) => {

  let [color, setColor] = useState<string>("white")
  let [borderColor, setBorderColor] = useState<string>("border-gray-500")

  useEffect(() => {
    if (isActive) {
      setBorderColor(" border-2 border-black");
    } else {
      setBorderColor(" border-2 border-gray-500");
    }
  }, [isActive])


  const changeColor = () => {

    if (isActive) {

      let newCode;

      if (color == "gray-300") {
        setColor("yellow-300");
        newCode = code.slice(0,index) + 'y' + code.slice(index + 1);
      } else if (color == "yellow-300") {
        setColor("green-300")
        newCode = code.slice(0,index) + 'g' + code.slice(index + 1);
      } else {
        setColor("gray-300")
        newCode = code.slice(0,index) + 'b' + code.slice(index + 1);
      }

      setCode(newCode)
    }


  }

  return (
    <div>    <div className=' hidden bg-white bg-green-300 bg-yellow-300 bg-gray-300 border-black border-gray-500 border-2'></div>
      <div onClick={changeColor} className={'w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-md border-2 pt-2 ' + ' font-Lalezar flex justify-center items-center text-5xl bg-' + color + borderColor}>
        {letter}
      </div></div>
  )
}

export default WordleTileComponent