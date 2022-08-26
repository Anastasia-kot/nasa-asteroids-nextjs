import React, { FC, useState } from "react";
import styles from './AsteroidCard.module.css';
import classNames from '../../../node_modules/classnames/index'
import Link from "../../../node_modules/next/link";
import Image from "../../../node_modules/next/image";
const dinoImg = require('./../../../public/img/dinoImg.svg');
const asteroidImg = require('./../../../public/img/asteroidImg.svg');
import { dateCloserFinder, dateConverter } from "../../../helpers/dateConverters";
import { nameConverter, distanceOrbitSuffix } from "../../../helpers/nameConverters";
import { diameterConverter } from "../../../helpers/diameterConverters";
import { AsteroidInListType, MeasureUnitType } from "../../../types";
import { toggleInLiquidationList } from "../../../helpers/localStorageFunctions";





type PropsType = {
    asteroid: AsteroidInListType
    measureUnit: MeasureUnitType
    key: string
    isInLiquidationPage: boolean
    isInLiquidationList: boolean
}
 
const AsteroidCard = React.memo<PropsType> ( ({ asteroid, measureUnit, key, isInLiquidationPage, isInLiquidationList }) => {
    return (
        <div className={styles.ListItem} key={key} id={key}>

            <div className={styles.Date}>
                {dateConverter(dateCloserFinder(asteroid.close_approach_data))}   
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
                            <Image src={asteroidImg} alt='asteroid' height='100px' width='100px' />
                        </div>
                    </div>
                    <div className={styles.AsteroidInfoBlock}>
                        <div className={styles.AsteroidName}>Астероид {nameConverter(asteroid.name)}</div>
                        <div className={styles.AsteroidDiameter}>
                            Ø {diameterConverter(
                                asteroid.estimated_diameter.meters.estimated_diameter_max,
                                asteroid.estimated_diameter.meters.estimated_diameter_min
                            )} м
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


            {(isInLiquidationPage) 
                ? <button 
                        className={styles.AsteroidLiquidate}
                        // disabled={!isInLiquidationList}
                        onClick={() => {  toggleInLiquidationList(false, asteroid) }}
                        >
                    Оставить  
                </button>
                : <button 
                    className={styles.AsteroidLiquidate}
                    // disabled={isInLiquidationList}
                    onClick={() => { toggleInLiquidationList(true, asteroid) }}
                    >
                    Уничтожить
                </button>
            }
        
        
        </div>
    )
})
AsteroidCard.displayName = 'AsteroidCard';

export default AsteroidCard;








