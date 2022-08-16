import React from "react";
import styles from './ListItemLiquidation.module.css';
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";



import  dino  from './../../../public/img/dino.svg';
import  asteroid  from './../../../public/img/asteroid.svg';
import { dateConverter } from "../../../helpers/dateConverters.ts";
import { nameConverter } from "../../../helpers/nameConverters.ts";
import { diameterConverter } from "../../../helpers/diameterConverters.ts";
import { distanceOrbitSuffix } from "../../../helpers/nameConverters.ts";













const ListItemLiquidation = (props) => {
    

    return (
            <div className={styles.ListItem}>
              

                <div className={styles.Date}>
                    { dateConverter(props.close_approach_data[0].close_approach_date) } 
                </div>



                <Link href={`/asteroids/${props.id}`} className={styles.NavLink}><a>
                <div className={styles.AsteroidBlock}>
                    <div className={classNames(
                        { [styles.ImageBlockNegative]: props.is_potentially_hazardous_asteroid }, 
                        { [styles.ImageBlockPositive]: !props.is_potentially_hazardous_asteroid },
                        styles.ImageBlock 
                    )}>
                        <div className={styles.dino}>
                            <Image src={dino} alt='dino' />
                        </div>
                        <div className={styles.asteroid} >
                            <Image src={asteroid} alt='asteroid'  />
                        </div>
                    </div>
                    <div className={styles.AsteroidInfoBlock}>
                        <div className={styles.AsteroidName}>Астероид {nameConverter(props.name)}</div>
                        <div className={styles.AsteroidDiameter}>
                            Ø {diameterConverter(
                                props.estimated_diameter.meters.estimated_diameter_max,
                                props.estimated_diameter.meters.estimated_diameter_min
                            ) } м
                        </div>
                        <div className={styles.AsteroidDistance}>
                            {(props.measureUnit == 'orbit')
                                    ? <span> ↔ {Math.ceil(props.close_approach_data[0].miss_distance.lunar)} {distanceOrbitSuffix(Math.ceil(props.close_approach_data[0].miss_distance.lunar))} </span>
                            : <span> ↔ {Math.ceil(props.close_approach_data[0].miss_distance.kilometers)} км </span>
                            }



                           
                        </div>
                        <div className={styles.AsteroidIsDanger}>
                            {props.is_potentially_hazardous_asteroid
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








