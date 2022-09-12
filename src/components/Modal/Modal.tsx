import styles from './Modal.module.css';
import { FC } from 'react';
 import { AsteroidInListType } from '../../../types';
import { nameConverter } from '../../../helpers/nameConverters';
import classNames from '../../../node_modules/classnames/index'
import Button from '../Button/Button';

 
 
 
const Modal: FC<any> = ({ asteroid, resetFunction, deleteFunction }) => (
    <div className={styles.containerActive}>
    <div className={styles.modal}>
        <div className={styles.question}>Вы уверены, что хотите удалить астероид  
                {' ' +  nameConverter(asteroid.name) + ' '}
          из корзины для заказа?</div>
          
        <div className={styles.buttons}>
                <Button text='Да' onClickFunction={() => { deleteFunction(asteroid) }} />
                <Button text='Отмена' onClickFunction={() => { resetFunction() }} />
        </div>
        
        </div>
    </div>
)

export default Modal;

