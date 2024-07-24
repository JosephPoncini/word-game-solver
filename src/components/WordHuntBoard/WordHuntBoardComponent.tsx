import React from 'react'

interface IWordHuntBoardComponent {
    boardData: string[][]
}

const WordHuntBoardComponent = ({ boardData }: IWordHuntBoardComponent) => {



    return (
        <div className=' space-y-2'>
            {
                boardData.map((row, idx) => {
                    return (
                        <div key={idx} className=' flex flex-row space-x-2'>
                            {
                                row.map((tile, idy) => {
                                    return (
                                        <div key={idy} className={' bg-white w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-md border-2 pt-2 font-Lalezar flex justify-center items-center text-5xl'}>
                                            {tile}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WordHuntBoardComponent