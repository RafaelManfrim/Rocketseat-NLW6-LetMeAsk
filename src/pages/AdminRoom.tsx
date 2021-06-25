import { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'


import { database } from '../services/firebase'

type RoomParams = {
    id: string
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
}

export function AdminRoom(){

    //const {user} = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id

    const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>()

    const {questions, title} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push(`/`)
    }

    async function handleDeleteQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }

    async function handleCheckQuestionIsAnAnsered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleQuestionIsHighlited(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo LetMeAsk" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala: "{title}"</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(questions => {
                        return (
                            <Fragment key={questions.id}>
                                <Question
                                    content={questions.content}
                                    author={questions.author}
                                    isHighlighted={questions.isHighlighted}
                                    isAnswered={questions.isAnswered}
                                >
                                    {!questions.isAnswered && [
                                        <button type="button">
                                            <img src={checkImg} onClick={() => handleCheckQuestionIsAnAnsered(questions.id)} alt="Pergunta respondida" />
                                        </button>,
                                        <button type="button">
                                            <img src={answerImg} 
                                            onClick={() => handleQuestionIsHighlited(questions.id)} alt="Pergunta em destaque" />
                                        </button>
                                    ]}
                                    <button type="button" onClick={() => setQuestionIdModalOpen(questions.id)}>
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                                <Modal 
                                    isOpen={questionIdModalOpen === questions.id} 
                                    onRequestClose={() => setQuestionIdModalOpen(undefined)}
                                    style={customStyles}
                                >

                                    <h2>Modal</h2>
                                    
                                    Question {questions.id}, {questions.content}

                                    <button onClick={() => setQuestionIdModalOpen(undefined)}>Fechar modal</button>
                                    <button onClick={() => handleDeleteQuestion(questions.id)}>Remover</button>

                                </Modal>
                            </Fragment>
                        )
                    })}
                </div>
            </main>    
        </div>
    )
}