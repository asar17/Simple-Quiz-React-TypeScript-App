import React,{useState} from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQueston} from './API'
//import type of quiz [easy/hard/medium]
import {Difficultly} from './API'
//import type of question
import {QuestionState} from './API'
//import style
import {GlobalStyle,Wrapper} from './App.styles'


//type of all the question that the user answers correct
export type UserAnswer={
 question:string
 answer:string
 correctAnswer:string
 correct:boolean
}
const App =()=>{
  const TOTAL_QUESTIONS=10
  const [loading,setLoading]=useState(false)
  //all the questions fetch from api
  const [questions,setQuestions]=useState<QuestionState[]>([])
  //all the question that the user answers correct
  const [userAnswers,setUserAnswers]=useState<UserAnswer[]>([])
  //determine the number of the current question
  const [number,setNumber]=useState(0)
  const [score,setScore]=useState(0)
  const [gameOver,setGameOver]=useState(true)


  //start game mean fetch questions from api and setEverything 
  const startTriviaAPI = async ()=>{
    setLoading(true)
    const questionApi=await fetchQuizQueston(TOTAL_QUESTIONS,Difficultly.EASY)
    setQuestions(questionApi)
    setScore(0)
    setNumber(0)
    setGameOver(false)
    setLoading(false)
  }
  
  //check answer
  const checkAnswer =(e:React.MouseEvent<HTMLButtonElement>)=>{
    //get the user's answer
    const answerFromUser=e.currentTarget.value
    //if the user's answer is correct increase score
    if(answerFromUser === questions[number].correct_answer) setScore((prevState)=>prevState+1)
    //set [userAnswers] to disable button after choosing answer
    const userAnswersObject={
      question:questions[number].question,
      answer:answerFromUser,
      correctAnswer:questions[number].correct_answer,
      correct:true
    }
    setUserAnswers((prevState)=>[...prevState,userAnswersObject])
  }
  
  //next question
  const nextQuestion=()=>{
    const nextQuestion=number+1
    //move on to the last question and gameOver
    if(nextQuestion===TOTAL_QUESTIONS)
    { setGameOver(true) }
    
    //move on to the next question if not the lasr question
    else{
      setNumber(nextQuestion)
    }
  }

  return(
    <>
        <GlobalStyle/>
        <h1 style={{WebkitTextFillColor:'transparent'}}>athar</h1>
        <Wrapper>
          <h1>REACT QUIZ</h1>
          {/* display start game button when game over or the user end the game */}
          { gameOver   && (
              <button className="start" onClick={startTriviaAPI}>
                  Start Game
              </button>
          )}
          
          
          {/* display score when game overmode is deactivated */}
          {!gameOver &&(
            <p className="score">Score: {score}</p>
          )}
          {/* loading for next question*/}
          {
            loading && (
              <p>Loading Questions ...</p>
            )
          }
          {/* not loading and not game over */}
          {!loading && !gameOver && (
              <QuestionCard 
                totalQuestion={TOTAL_QUESTIONS}
                questionNumber={number+1}
                question={questions[number]?.question}
                answers={questions[number]?.answers}
                userAnswers={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />

          )}
          {/* display next question button when [not loading.not game over] [userAnswers===number of question] [in the last question] */}
          {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS-1 &&(
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
          )}
        </Wrapper>
    </>
  )

}

export default App;
