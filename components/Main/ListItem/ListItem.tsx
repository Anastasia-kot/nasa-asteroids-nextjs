import React, { FC } from "react";
import styles from './ListItem.module.css';
// import classNames from "classnames";
import classNames from '../../../node_modules/classnames/index'
// import Link from "next/link";
import Link from "../../../node_modules/next/link";
import Image from "../../../node_modules/next/image";
// import Image from "next/image";

const dinoImg = require('./../../../public/img/dinoImg.svg');
const asteroidImg = require('./../../../public/img/asteroidImg.svg');
// import  dinoImg  from './../../../public/img/dinoImg.svg';
// import asteroidImg from './../../../public/img/asteroidImg.png';
import { dateConverter } from "../../../helpers/dateConverters";
import { nameConverter, distanceOrbitSuffix } from "../../../helpers/nameConverters";
import { diameterConverter } from "../../../helpers/diameterConverters";
import {  AsteroidInListType, MeasureUnitType } from "../../../types";
 






type PropsType = {
    asteroid: AsteroidInListType
    measureUnit: MeasureUnitType 
    key: string
}


const ListItem: FC<PropsType> = ({asteroid, measureUnit, key}) => {
    return (
            <div className={styles.ListItem}>
              

                <div className={styles.Date}>
                    { dateConverter(asteroid.close_approach_data[0].close_approach_date) } 
                </div>



                <Link href={`/asteroids/${asteroid.id}`} className={styles.NavLink}><a>
                <div className={styles.AsteroidBlock}>
                    <div className={classNames(
                        { [styles.ImageBlockNegative]: asteroid.is_potentially_hazardous_asteroid }, 
                        { [styles.ImageBlockPositive]: !asteroid.is_potentially_hazardous_asteroid },
                        styles.ImageBlock 
                    )}>
                        <div className={styles.dino}>
                            <Image src={dinoImg} alt='dino' />
                        </div>
                        <div className={styles.asteroid}>
                            <Image src={asteroidImg} alt='asteroid' height= '100px' width='100px' />
                        </div>
                    </div>
                    <div className={styles.AsteroidInfoBlock}>
                        <div className={styles.AsteroidName}>Астероид {nameConverter(asteroid.name)}</div>
                        <div className={styles.AsteroidDiameter}>
                            Ø {diameterConverter(
                                asteroid.estimated_diameter.meters.estimated_diameter_max,
                                asteroid.estimated_diameter.meters.estimated_diameter_min
                            ) } м
                        </div>
                        <div className={styles.AsteroidDistance}>
                            {(measureUnit == 'orbit')
                                    ? <span> ↔ {Math.ceil(+asteroid.close_approach_data[0].miss_distance.lunar)} {distanceOrbitSuffix(Math.ceil(+asteroid.close_approach_data[0].miss_distance.lunar))} </span>
                                    : <span> ↔ {Math.ceil(+asteroid.close_approach_data[0].miss_distance.kilometers)} км </span>
                            }



                           
                        </div>
                        <div className={styles.AsteroidIsDanger}>
                            {asteroid.is_potentially_hazardous_asteroid
                            ? 'Опасен'
                            : 'Не опасен'}    
                       </div>
                    </div>
                </div>
                </a></Link>




                <button className={styles.AsteroidLiquidate} onClick={()=>{
                        let serialObj = JSON.stringify(asteroid); //сериализуем его
                        window.localStorage.setItem(asteroid.id, serialObj); //запишем его в хранилище по ключу "myKey"
                }}>
                    Уничтожить
                </button>
               
            </div>
    )
}

export default ListItem;








