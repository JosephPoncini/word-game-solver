import React from 'react'
import WordleTileComponent from '../WordleTile/WordleTileComponent'

interface IWordleRowComponent {
    word: string
    row: number
    currentRow: number
    code: string
    setCode: (code:string)=>void
}

const WordleRowComponent = ( {word, row, currentRow, code, setCode} : IWordleRowComponent ) => {
  return (
    <div className=' flex space-x-2'>
        <WordleTileComponent letter={word[0]? word[0] : ''} isActive={row == currentRow} index={0} code={code} setCode={setCode} />
        <WordleTileComponent letter={word[1]? word[1] : ''} isActive={row == currentRow} index={1} code={code} setCode={setCode} />
        <WordleTileComponent letter={word[2]? word[2] : ''} isActive={row == currentRow} index={2} code={code} setCode={setCode} />
        <WordleTileComponent letter={word[3]? word[3] : ''} isActive={row == currentRow} index={3} code={code} setCode={setCode} />
        <WordleTileComponent letter={word[4]? word[4] : ''} isActive={row == currentRow} index={4} code={code} setCode={setCode} />
    </div>
  )
}

export default WordleRowComponent