import { ReactNode } from 'react'

import '../styles/question.scss'

type QuestionProps = {
    content: string
    author: {
        name: string
        avatar: string
    },
    children?: ReactNode;
}

export function Question(props: QuestionProps){
    return(
        <div className="questions">
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>
                <div className="buttons">
                    {props.children}
                </div>
            </footer>

        </div>
    )
}