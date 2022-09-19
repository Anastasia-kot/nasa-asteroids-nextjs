import styles from './Modal.module.css';
import { FC } from 'react';
 import { AsteroidInListType } from '../../../types';
import { nameConverter } from '../../../helpers/nameConverters';
import classNames from '../../../node_modules/classnames/index'
import Button from '../Button/Button';

 
type Props = {
    onClickFunctions: Array<()=>void> | null,
    onClickText: Array<string> | null,
    modalText: string,
    data: any | null,
} 

export const Modal: FC<any> = ({ onClickFunctions, onClickText, modalText, data }) => {
 
    return (
    <div className={styles.containerActive}>
        <div className={styles.modal}>
            <div className={styles.question}>
                {modalText}
                {data && 'Астероид: ' + nameConverter(data.name) }
            </div>

            <div className={styles.buttons}>
                {onClickFunctions.map( (currentValue, index) => 
                    <Button text={onClickText[index]} onClickFunction={currentValue} key={index}/>
                )}
 
            </div>

        </div>
    </div>
)}

            