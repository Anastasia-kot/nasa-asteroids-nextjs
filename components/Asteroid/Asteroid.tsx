import React, {FC} from 'react';
import classNames from "classnames";
import styles from './Asteroid.module.css';
import Image from 'next/image';
const dino = require('./../../public/img/dino.svg');
const asteroid = require('./../../public/img/asteroid.svg');
// import dino from './../../public/img/dino.svg';
// import asteroid from './../../public/img/asteroid.svg';
import { dateConverter, dateCloserFinder } from "./../../helpers/dateConverters.ts";
import { nameConverter } from "./../../helpers/nameConverters.ts";
import { diameterConverter } from "./../../helpers/diameterConverters.ts";
import { AsteroidType } from '../../types';


  


const Asteroid:FC<any> = ({ asteroidInfo }) => {

  

    if (asteroidInfo.id == '0')  {
              
        return (
            <div className={styles.ListItemWrapper}>
                <div className={styles.ListItem}>
                Астероида не существует
                </div>            </div>

        )
    }  
    
    

    return ( 

        <div className={styles.ListItemWrapper}>
            <div className={styles.ListItem}>
 


                    <div className={styles.Date}>
                        { (asteroidInfo.id !== 0)  && 
                            <span>
                                <b>Ближайшие даты сближения: </b>
                                {dateConverter(dateCloserFinder( asteroidInfo.close_approach_data) ) }
                            </span>                   
                        
                        }
                    </div>
                    <div className={styles.AsteroidBlock}>
                        <div className={classNames (
                            { [styles.ImageBlockNegative]: asteroidInfo.is_potentially_hazardous_asteroid },
                            { [styles.ImageBlockPositive]: !asteroidInfo.is_potentially_hazardous_asteroid },
                            styles.ImageBlock
                        )}>
                            <div className={styles.dino}>
                                <Image src={dino} alt='dino' />
                            </div>
                            <div className={styles.asteroid} >
                                <Image src={asteroid} alt='asteroid' />
                            </div>
                        </div>
                        <div className={styles.AsteroidInfoBlock}>


                            <div className={styles.AsteroidName}> 
                                {(asteroidInfo.id !== 0) &&
                                    <span>
                                        Астероид {nameConverter(asteroidInfo.name)}
                                    </span>}
                            </div>


                            <div className={styles.AsteroidDiameter}>
                                {(asteroidInfo.id !== 0) && 
                                    <span>
                                        Ø {diameterConverter(
                                            asteroidInfo.estimated_diameter.meters.estimated_diameter_max,
                                            asteroidInfo.estimated_diameter.meters.estimated_diameter_min
                                        )} м
                                    </span>
                                }
                            </div>


                            <div className={styles.AsteroidDistance}>
                                {(asteroidInfo.id !== 0) && 
                                    <span>
                                        ↔ {Math.ceil(asteroidInfo.close_approach_data[0].miss_distance.kilometers)} км

                                    </span>}
                            </div>
                            <div className={styles.AsteroidIsDanger}>
                                {asteroidInfo.is_potentially_hazardous_asteroid
                                    ? 'Опасен'
                                    : 'Не опасен'}
                            </div>
                        </div>
                    </div>
                    <button className={styles.AsteroidLiquidate}>
                        Уничтожить
                    </button>
             </div>
    
    </div>);}

export default Asteroid;




 



