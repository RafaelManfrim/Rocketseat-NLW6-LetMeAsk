import { useHistory } from 'react-router-dom'

import mainArt from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../components/Button'
import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'

export function Home(){

    const history = useHistory()
    const {user, sighInWithGoogle} = useAuth()

    async function handleCreateNewRoom(){
        if(!user){
            await sighInWithGoogle()
        }
        history.push('/salas/nova-sala')
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={mainArt} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo LetMeAsk" />
                    <button className="create-room" onClick={handleCreateNewRoom}>
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala:"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}