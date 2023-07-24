import React from 'react'
import style from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [style.modal]

    if (visible) {
        rootClasses.push(style.active)
    }

    return (
        <div
            onClick={() => setVisible(false)}
            className={rootClasses.join(' ')}
        >
            <div className={style.modalContent}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default MyModal