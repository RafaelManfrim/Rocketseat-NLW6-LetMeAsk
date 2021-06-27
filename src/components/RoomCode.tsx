import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    const RoomId = props.code

    function copyRoomCode(){
        navigator.clipboard.writeText(RoomId)
    }

    return(
        <button className="room-code" onClick={copyRoomCode}>
            <div>
                <img src={copyImg} alt="Copiar código" />
                <span>Sala #{RoomId}</span>
            </div>
        </button>   
    )
}