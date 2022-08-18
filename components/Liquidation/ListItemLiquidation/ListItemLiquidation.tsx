import React, { FC } from "react";
import styles from './ListItemLiquidation.module.css';
import classNames from "./../../../node_modules/classnames/index";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";


const dinoImg = require('./../../../public/img/dinoImg.svg');
const asteroidImg = require('./../../../public/img/asteroidImg.svg');
// import  dinoImg  from './../../../public/img/dinoImg.svg';
// import  asteroidImg  from './../../../public/img/asteroidImg.svg';
import { dateConverter } from "../../../helpers/dateConverters";
import { nameConverter, distanceOrbitSuffix } from "../../../helpers/nameConverters";
import { diameterConverter } from "../../../helpers/diameterConverters";
import { AsteroidInListType } from "../../../types";
 








type PropsType = {
    asteroid : AsteroidInListType
    key :string
}



const ListItemLiquidation: FC<PropsType> = ({ asteroid , key}) => {
    

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
                        <div className={styles.asteroid} >
                            <Image src={asteroidImg} alt='asteroid' height='100px' width='100px' />
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
                             <span> ↔ {Math.ceil(+asteroid.close_approach_data[0].miss_distance.kilometers)} км </span>
                        </div>
                        <div className={styles.AsteroidIsDanger}>
                            {asteroid.is_potentially_hazardous_asteroid
                            ? 'Опасен'
                            : 'Не опасен'}    
                       </div>
                    </div>
                </div>
                </a></Link>




              
               
            </div>
    )
}

export default ListItemLiquidation;








