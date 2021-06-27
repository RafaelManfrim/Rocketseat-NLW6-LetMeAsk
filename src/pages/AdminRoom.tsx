import { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import NoQuestionImg from '../assets/images/empty-questions.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import '../styles/modal.scss'


import { database } from '../services/firebase'

type RoomParams = {
    id: string
}

const modalEndRoomStyle = {
    content: {
        height:'400px',
        width: '400px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const modalDeleteQuestionStyle = {
    content: {
        height:'400px',
        width: '400px',
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
    const [endRoomModalOpen, setEndRoomModalOpen] = useState<boolean | undefined>()

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
                        <Button isOutlined onClick={() => setEndRoomModalOpen(true)}>Encerrar sala</Button>
                        <Modal
                            isOpen={endRoomModalOpen === true}
                            onRequestClose={() => setEndRoomModalOpen(undefined)}
                            style={modalEndRoomStyle}
                        >
                            <h2 className="modal-title">Encerrar sala</h2>
                                    
                            <div className="modal-text">
                                <p>Tem certeza que deseja encerrar essa sala?</p>
                            </div>

                            <div className="modal-buttons">
                                <button onClick={() => setEndRoomModalOpen(undefined)} className="
                                modal-close">Cancelar</button>
                                <button onClick={handleEndRoom} className="modal-remove-question">Remover</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala: "{title}"</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                { questions.length === 0 ? (
                    <div className="no-question">
                        <img src={NoQuestionImg} alt="Não há pergustas por enquanto" />
                        <h3>Nenhuma pergunta</h3>
                        <p>Envie o código da sala para seus amigos e comece a responder perguntas</p>
                    </div> 
                ):( 
                    <></>
                )}

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
                                    style={modalDeleteQuestionStyle}
                                >

                                    <h2 className="modal-title">Excluir pergunta</h2>
                                    
                                    <div className="modal-text">
                                        <p>Tem certeza que deseja excluir essa pergunta?</p>
                                    </div>

                                    <div className="modal-buttons">
                                        <button onClick={() => setQuestionIdModalOpen(undefined)} className="
                                        modal-close">Cancelar</button>
                                        <button onClick={() => handleDeleteQuestion(questions.id)} className="modal-remove-question">Sim, excluir</button>
                                    </div>
                                    
                                </Modal>
                            </Fragment>
                        )
                    })}
                </div>
            </main>    
        </div>
    )
}