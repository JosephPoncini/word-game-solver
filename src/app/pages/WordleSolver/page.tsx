'use client'

import KeyboardComponent from '@/components/Keyboard/KeyboardComponent'
import WordleRowComponent from '@/components/WordleRow/WordleRowComponent'
import WordleTileComponent from '@/components/WordleTile/WordleTileComponent'
import { fetchWordBank, getWordleData, postData } from '@/services/DataService'
import React, { useEffect, useState } from 'react'

const WordleSolver = () => {

  const [wordbank, setWordbank] = useState<string[]>([]);
  const [bestWord, setBestWord] = useState<string>('');

  const [board, setBoard] = useState<string[]>([])
  const [colorBoard, setColorBoard] = useState<string[][]>([
    ['w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w']
  ])

  const [code, setCode] = useState<string>('wwwww')

  const [row, setRow] = useState<number>(1);

  const [word1, setWord1] = useState<string>('');
  const [word2, setWord2] = useState<string>('');
  const [word3, setWord3] = useState<string>('');
  const [word4, setWord4] = useState<string>('');
  const [word5, setWord5] = useState<string>('');
  const [word6, setWord6] = useState<string>('');

  const appendWord = (letter: string) => {

    switch (row) {
      case 1:
        if (word1.length < 5) {
          setWord1(word1 + letter);
        }
        break;
      case 2:
        if (word2.length < 5) {
          setWord2(word2 + letter);
        }
        break;
      case 3:
        if (word3.length < 5) {
          setWord3(word3 + letter);
        }
        break;
      case 4:
        if (word4.length < 5) {
          setWord4(word4 + letter);
        }
        break;
      case 5:
        if (word5.length < 5) {
          setWord5(word5 + letter);
        }
        break;
      case 6:
        if (word6.length < 5) {
          setWord6(word6 + letter);
        }
        break;
    }


  }

  const handleBackspace = () => {

    switch (row) {
      case 1:
        setWord1(word1.slice(0, -1));
        break;
      case 2:
        setWord2(word2.slice(0, -1));
        break;
      case 3:
        setWord3(word3.slice(0, -1));

        break;
      case 4:
        setWord4(word4.slice(0, -1));
        break;
      case 5:
        setWord5(word5.slice(0, -1));
        break;
      case 6:
        setWord6(word6.slice(0, -1));
        break;
    }

  }

  const handleSubmit = async () => {

    let word = "";
    let result = false;
    switch (row) {
      case 1:
        if (word1.length == 5) {
          result = true;
          word =word1;
        }
        break;
      case 2:
        if (word2.length == 5) {
          result = true;
          word =word2;
        }
        break;
      case 3:
        if (word3.length == 5) {
          result = true;
          word =word3;
        }
        break;
      case 4:
        if (word4.length == 5) {
          result = true;
          word =word4;
        }
        break;
      case 5:
        if (word5.length == 5) {
          result = true;
          word =word5;
        }
        break;
      case 6:
        if (word6.length == 5) {
          result = true;
          word =word6;
        }
        break;
    }

    console.log(result)
    console.log(word)
    console.log(code)
    console.log(wordbank)

    if (result && !code.includes('w')) {
      const data = await getWordleData(word.toLocaleLowerCase(), code, wordbank)
      setBestWord(data.best_word);
      setWordbank(data.possible_words)
      setRow(row + 1);
      setBoard([...board,])
      setCode('wwwww');
      console.log(data)
    }

    // console.log(word)


  }

  useEffect(()=>{

    const initializeWordBank = async () => {
      setWordbank(await fetchWordBank())
    }

    initializeWordBank();
  },[])

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      appendWord(key.toUpperCase());
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
  }, [row, word1, word2, word3, word4, word5, word6, code, wordbank, board]);

  // useEffect(()=>{
  //   console.log(code);
  // },[code])

  return (
    <div className=' w-screen h-screen overflow-auto bg-teal-100 flex flex-col items-center pt-16 px-5 lg:px-20 pb-4 lg:pb-10'>
      <div className=' flex flex-col items-center mb-5'>
        <div  className=' font-RobotoBold text-4xl cursor-pointer'>Wordle Solver</div>
        <div className=' font-Roboto text-md text-center'>(click the letters on the board to change their colors)</div>
      </div>
      <div className=' flex flex-col lg:flex-row lg:justify-center items-center w-full space-y-5 lg:space-x-20 lg:min-h-[500px]'>
        <div className=' border border-black w-full p-5 font-Roboto text-lg h-20 lg:h-[500px]'>
          <div className=' font-bold'>Best Word:</div>
          <div>{bestWord}</div>
        </div>
        <div className=' order-2 lg:order-1 flex flex-col items-center lg:pt-10 space-y-2'>
          <WordleRowComponent word={word1} row={1} currentRow={row} code={code} setCode={setCode} />
          <WordleRowComponent word={word2} row={2} currentRow={row} code={code} setCode={setCode} />
          <WordleRowComponent word={word3} row={3} currentRow={row} code={code} setCode={setCode} />
          <WordleRowComponent word={word4} row={4} currentRow={row} code={code} setCode={setCode} />
          <WordleRowComponent word={word5} row={5} currentRow={row} code={code} setCode={setCode} />
          <WordleRowComponent word={word6} row={6} currentRow={row} code={code} setCode={setCode} />
        </div>
        <div className=' order-1 lg:order-2 border border-black px-5 w-full h-20 lg:h-[500px] lg:p-5 font-Roboto text-lg overflow-auto'>
          <div className=' font-bold'>Possible Words: </div>
          {
            wordbank && wordbank.map((word, idx)=>{
              return(
                (idx == 0) ? <span key={idx}>{word}</span> : <span key={idx}>{", " + word}</span>
              )
            })
          }
        </div>
      </div>
      <div className='mt-5 lg:mt-20 items-end'>
        <KeyboardComponent onClick={appendWord} handleBackspace={handleBackspace} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default WordleSolver