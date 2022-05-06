import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words'
import GameOver from './components/GameOver';

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setcurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [guessWord, setGuessWord] = useState('')

  useEffect(() => {
    generateWordSet()
    .then((words) => {
      setWordSet(words.wordSet)
      setGuessWord(words.todaysWord)
    })
  }, []) //only runs once

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4 )
      return ;

    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setcurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0)
      return ;
    
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setcurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5)
      return ;
        
    //needs to be an existing word
    let currWord = ''
    for (let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i]
    }

    if (wordSet.has(currWord.toLowerCase())){
      setcurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
    } else {
      alert('Word does not exist')
    }

    if (currWord === guessWord){
      setGameOver({gameOver: true, guessedWord: true})
      return
    }

    if(currAttempt.attempt === 5)
      setGameOver({gameOver: true, guessedWord: false})
  }

  return (
    <div className="App">
      <nav>
        <h1>
          Wordle
        </h1>
      </nav>
      
      <AppContext.Provider value={
        { 
          board, 
          setBoard, 
          currAttempt, 
          setcurrAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter, 
          guessWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver
        }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
