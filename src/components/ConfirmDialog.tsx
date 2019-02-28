import * as React from 'react';
import { useState } from 'react';

interface IConfirmDialogProps {
}

export let openConfirmDialog: (text: string, callback?: any) => void;


export default function (props: IConfirmDialogProps) {
    const [active, setActive] = useState(false);
    const [callback, setCallback] = useState({ text: '', func: undefined });

    const toggleActive = () => {
        setActive(!active);
    }

    openConfirmDialog = (text: string, callback: any) => {
        toggleActive();
        setCallback({ text, func: callback });
    }

    const close = () => {
        toggleActive();
        setCallback({ text: '', func: undefined });
        (callback.func as any)();
    }


    if (!active) {
        return <div />
    }

    return (
        <div className='confirm-dialog'>
            <div className='popup popup--confirm'>

                <div className='popup__sec-name p-20px'>{callback.text}</div>

                <div className='popup__btns'>

                    <div onClick={close} className='popup__btn popup__btn--decline'>Yes</div>

                    <div onClick={toggleActive} className='popup__btn popup__btn--cancel'>No</div>

                </div>
            </div>
        </div>
    )

}

