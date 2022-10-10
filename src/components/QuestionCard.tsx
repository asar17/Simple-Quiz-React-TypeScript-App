import React from 'react'
//import type
import {UserAnswer} from '../App'
//import styles
import {Wrapper,ButtonWrapper} from './QuestionCard.styles'

type QuestionCardProps={
   question:string
   answers:string[]
   //to disable the button after choose answer
   userAnswers: UserAnswer | undefined
   //to check answer correct or not 
   callback:(e:React.MouseEvent<HTMLButtonElement>)=>void
   questionNumber:number
   totalQuestion:number
}

const QuestionCard:React.FC<QuestionCardProps>=({question,answers,userAnswers,callback,questionNumber,totalQuestion})=>{
   return( 
            <Wrapper>
                <p className="number">
                    Question: {questionNumber} / {totalQuestion}
                </p>
                <p dangerouslySetInnerHTML={{__html:question}}/> 
                <div>
                    {answers?.map((answer)=>(
                        <ButtonWrapper 
                         //when onClick on button excuded callback function[checkAnswer] in the App component and send the answers is choosen to the userAnswersObject
                          correct={userAnswers?.correctAnswer===answer}
                          userClicked={userAnswers?.answer===answer}
                          key={answer}
                         >
                            <button disabled={userAnswers?true:false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html:answer}}/>
                            </button>
                        </ButtonWrapper>
                    ))}
                </div>
              
            </Wrapper>

   )
}

export default QuestionCard;