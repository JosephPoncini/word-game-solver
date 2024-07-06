import React from 'react'
import KeyBoardTileComponent from '../KeyBoardTile/KeyBoardTileComponent'

interface IKeyboardComponent {
    onClick: (letter: string) => void
    handleBackspace: () => void
    handleSubmit: () => void
}

const KeyboardComponent = ({ onClick, handleBackspace, handleSubmit }: IKeyboardComponent) => {
    const top = 'QWERTYUIOP';
    const mid = 'ASDFGHJKL';
    const bot = 'ZXCVBNM'
    return (
        <div className=' flex flex-col items-center'>
            <div className=' flex'>
                {
                    top.split('').map((letter, idx) => {
                        return (
                            <div key={idx}>
                                <KeyBoardTileComponent letter={letter} onClick={onClick} />
                            </div>
                        )
                    })
                }
            </div>
            <div className=' flex'>
                {
                    mid.split('').map((letter, idx) => {
                        return (
                            <div key={idx}>
                                <KeyBoardTileComponent letter={letter} onClick={onClick} />
                            </div>
                        )
                    })
                }
            </div>
            <div className=' flex'>
                <div className=' flex justify-end'>
                    <button onClick={handleBackspace} className=' h-[40px] md:h-[50px] px-2 py-2 border border-black rounded-md bg-red-300 active:bg-red-500 text-sm md:text-xl '>DLT</button>
                </div>
                {
                    bot.split('').map((letter, idx) => {
                        return (
                            <div key={idx}>
                                <KeyBoardTileComponent letter={letter} onClick={onClick} />
                            </div>
                        )
                    })
                }
                <div>
                    <button onClick={handleSubmit} className=' h-[40px] md:h-[50px] px-2 py-2 border border-black rounded-md bg-teal-300 active:bg-teal-600 text-sm md:text-xl'>ENT</button>
                </div>
            </div>
        </div>
    )
}

export default KeyboardComponent