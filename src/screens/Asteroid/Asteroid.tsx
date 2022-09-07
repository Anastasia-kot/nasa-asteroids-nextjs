import React, {FC,  useEffect,  useState} from 'react';
import classNames from '../../../node_modules/classnames/index';
import styles from './Asteroid.module.css';
const dinoImg = require('./../../../public/img/dinoImg.svg');
const asteroidImg = require('./../../../public/img/asteroidImg.svg');
import { dateConverter } from "../../../helpers/dateConverters";
import { planetConverter } from "../../../helpers/nameConverters";
import { AsteroidType } from '../../../types';
import AsteroidCard from '../../components/AsteroidCard/AsteroidCard';
import Button from '../../components/Button/Button';
import { getLiquidationKeys, getLiquidationList } from '../../../helpers/localStorageFunctions';
 

  
type PropsType = {
    asteroidInfo: AsteroidType
}

const Asteroid: FC<PropsType> = ({ asteroidInfo }) => {
    
    // info block about closeApproach dates
    let [closeApproachPortion, setCloseApproachPortion] = useState(0 as number);

    //   asteroids For Liquidation 
    const [asteroidsForLiquidationKeys, setAsteroidsForLiquidationKeys] = useState([]);

    useEffect(() => {
        setAsteroidsForLiquidationKeys(getLiquidationKeys(getLiquidationList()))
    }, [])
 
    const toggleLiquidateOnClick = (id: string): void => {
        asteroidsForLiquidationKeys.includes(id)
            ? setAsteroidsForLiquidationKeys(asteroidsForLiquidationKeys.filter(item => item !== id))
            : setAsteroidsForLiquidationKeys([...asteroidsForLiquidationKeys, id])
    }





    if (!asteroidInfo)  {      
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
                    <AsteroidCard 
                        asteroid={asteroidInfo} 
                        measureUnit={'km'} 
                        key={asteroidInfo.id} 
                        isInLiquidationList={asteroidsForLiquidationKeys.includes(asteroidInfo.id)}
                        setLiquidationList={toggleLiquidateOnClick} 
                        isInLiquidationPage={false} 

                    />
        </div>

    {asteroidInfo.close_approach_data.length > 1 && (
        <>
            <h1 className={styles.Header}> Список сближений:</h1>
            <div className={styles.HeaderLine}> </div>
            <div className={styles.close_approach_dataContainer}>
                {asteroidInfo.close_approach_data.map( d=> {
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
                {(asteroidInfo.close_approach_data.length > ((closeApproachPortion + 1) * 10)) &&
                    <Button 
                        text={'Загрузить сближения'} 
                        onClickFunction={() => { setCloseApproachPortion(closeApproachPortion + 1) }}/>                        
                }
        </>
    )}


</div>
</div>);}

export default Asteroid;




 



