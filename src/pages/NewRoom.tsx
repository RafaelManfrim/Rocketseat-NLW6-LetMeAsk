import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import mainArt from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/Button'

import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'

import { database } from '../services/firebase'

export function NewRoom(){

    const {user} = useAuth()
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function createNewRoom(event: FormEvent){
        event.preventDefault()

        if(newRoom.trim() === ''){
            return
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            admId: user?.id
        })

        history.push(`/salas/${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={mainArt} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={createNewRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala: "
                            onChange = {event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}