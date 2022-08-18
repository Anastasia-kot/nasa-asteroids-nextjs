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
 


                    <div className={styles.Date}>
                      
                            <span>
                                <b>Ближайшее сближение: </b>
                                {dateConverter(dateCloserFinder( asteroidInfo.close_approach_data) ) }
                            </span>                   
                        
                        
                    </div>
                    <div className={styles.AsteroidBlock}>
                        <div className={classNames (
                            { [styles.ImageBlockNegative]: asteroidInfo.is_potentially_hazardous_asteroid },
                            { [styles.ImageBlockPositive]: !asteroidInfo.is_potentially_hazardous_asteroid },
                            styles.ImageBlock
                        )}>
                            <div className={styles.dino}>
                                <Image src={dinoImg} alt='dino' />
                            </div>
                            <div className={styles.asteroid} >
                                <Image src={asteroidImg} alt='asteroid' height='100px' width='100px' />
                            </div>
                        </div>
                        <div className={styles.AsteroidInfoBlock}>


                            <div className={styles.AsteroidName}> 
                                    <span>
                                        Астероид {nameConverter(asteroidInfo.name)}
                                    </span>
                            </div>


                            <div className={styles.AsteroidDiameter}>
                 
                                    <span>
                                        Ø {diameterConverter(
                                            asteroidInfo.estimated_diameter.meters.estimated_diameter_max,
                                            asteroidInfo.estimated_diameter.meters.estimated_diameter_min
                                        )} м
                                    </span>
                                
                            </div>


                            <div className={styles.AsteroidDistance}>
                                    <span>
                                        ↔ {Math.ceil(+asteroidInfo.close_approach_data[0].miss_distance.kilometers)} км

                                    </span>
                            </div>
                            <div className={styles.AsteroidIsDanger}>
                                {asteroidInfo.is_potentially_hazardous_asteroid
                                    ? 'Опасен'
                                    : 'Не опасен'}
                            </div>
                        </div>
                    </div>
                    <button 
                    onClick={ ()=>{
                        let serialObj = JSON.stringify(asteroidInfo); //сериализуем его
                        window.localStorage.setItem(asteroidInfo.id, serialObj); //запишем его в хранилище по ключу "myKey"
                    }}
                        className={styles.AsteroidLiquidate}>
                        Уничтожить
                    </button>
             </div>






                    {asteroidInfo.close_approach_data.length > 1 &&
                        (<>
                            <h1 className={styles.Header}> Список сближений:</h1>
                            <div className={styles.HeaderLine}> </div>
                        </>)
                    }

            <div className={styles.close_approach_dataContainer}>

          


            {asteroidInfo.close_approach_data.length > 1 &&
                asteroidInfo.close_approach_data.map( d=> {
                    if (asteroidInfo.close_approach_data.indexOf(d) < (closeApproachPortion+1)*10 ) {
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

                {asteroidInfo.close_approach_data.length > 1 &&
                    (asteroidInfo.close_approach_data.length > ((closeApproachPortion + 1) * 10)) &&
                    <button onClick={() => {
                        setCloseApproachPortion(closeApproachPortion + 1)
                    }}
                        className={styles.AsteroidLiquidate}>
                        Загрузить сближения
                    </button>
                }

</div>
</div>);}

export default Asteroid;




 



