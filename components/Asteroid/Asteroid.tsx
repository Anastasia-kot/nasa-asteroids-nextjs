import React, {FC, useState} from 'react';
import classNames from '../../node_modules/classnames/index';
import styles from './Asteroid.module.css';
import Image from '../../node_modules/next/image';
const dinoImg = require('./../../public/img/dinoImg.svg');
const asteroidImg = require('./../../public/img/asteroidImg.svg');
import { dateConverter, dateCloserFinder } from "./../../helpers/dateConverters";
import { nameConverter, planetConverter } from "./../../helpers/nameConverters";
import { diameterConverter } from "./../../helpers/diameterConverters";
import { AsteroidType } from '../../types';
import AsteroidCard from '../utils/AsteroidCard/AsteroidCard';


  
type PropsType = {
    asteroidInfo: AsteroidType
}

const Asteroid: FC<PropsType> = ({ asteroidInfo }) => {
    
    let [closeApproachPortion, setCloseApproachPortion] = useState(0 as number);

    
  
    if (asteroidInfo.id == '0')  {      
        return (
            <div className={styles.AsteroidWrapper}>
                <div className={styles.Asteroid}>
                    <h1 className={styles.Header}> Астероида не существует</h1>
                     <div className={styles.HeaderLine}> </div>
                </div>        
            </div>
        )
    }  

    
    return ( 
    <div className={styles.AsteroidWrapper}> 
    <div className={styles.Asteroid}>
        <div className={styles.ListItem}>              
            <AsteroidCard asteroid={asteroidInfo} measureUnit={'km'} key={asteroidInfo.id} isInLiquidation={false}/>
        </div>

    {asteroidInfo.close_approach_data.length > 1 && (
        <>
            <h1 className={styles.Header}> Список сближений:</h1>
            <div className={styles.HeaderLine}> </div>
            <div className={styles.close_approach_dataContainer}>
                {asteroidInfo.close_approach_data.map( d=> {
                    if (asteroidInfo.close_approach_data.indexOf(d) < (closeApproachPortion+1)*8 ) {
                    return (
                        <div key={asteroidInfo.close_approach_data.indexOf(d)} className={styles.close_approach_container}>
                            <div>  {dateConverter(d.close_approach_date)}, {(d.close_approach_date_full.split(' ')[1])}</div>
                            <div>
                                <img
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIqtoOfZk6CxmtN4NW_o18StDiWf6o1l6DUhlonAzPA&s'
                                    className={styles.spidometr}
                                    alt='спидометр' />
                                <span>{' '}{Math.ceil(+d.relative_velocity.kilometers_per_hour)}</span> км/ч
                            </div>
                            <div> ↔ {Math.ceil(+d.miss_distance.kilometers)} км</div>
                            <div> 🛰  {planetConverter(d.orbiting_body)} </div>
                        </div>
                    )}
                })}
            </div>
                {(asteroidInfo.close_approach_data.length > ((closeApproachPortion + 1) * 8)) &&
                        <button onClick={() => {
                            setCloseApproachPortion(closeApproachPortion + 1) }}
                            className={styles.AsteroidLiquidate}>
                            Загрузить сближения
                        </button>}
        </>
    )}


</div>
</div>);}

export default Asteroid;




 



