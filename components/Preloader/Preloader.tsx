import styles from './Preloader.module.css';
import { FC } from 'react';
import Image from '../../node_modules/next/image';
const dinoImg = require('./../public/img/dinoImg.svg');

 
const Preloader: FC  = ( ) => (
    <div className={styles.dino}>
        <Image src={dinoImg} alt='dino' /> 
    </div>
)

export default Preloader;

