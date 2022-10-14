import React, { useEffect, useState, useCallback } from "react";
import styles from './Main.module.css';
import Preloader from "../../components/Preloader/Preloader";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";

import { getPortionAsteroidsAPI } from "../../../API/api";
import { AsteroidInListType,  MeasureUnitType } from "../../../types";
import { dateToISOString } from "../../../helpers/dateConverters";
import { getLiquidationKeys, getLiquidationList } from "../../../helpers/localStorageFunctions";




type PropsType = {
    asteroidsList: Array<AsteroidInListType>
}

const Main: React.FC<PropsType> = ({asteroidsList}) => {

// main data 
    let [asteroidsListState, setAsteroidsListState] = useState(asteroidsList as Array<AsteroidInListType>);

// sorting parameters
    let [measureUnit, setMeasureUnit] = useState('km'as MeasureUnitType);
    let [isDangerFlag, setIsDangerFlag] = useState(false as boolean);

// load more parameters
    let [scrollDate, setScrollDate] = useState(new Date() as Date);
    let [isFetchingStatus, setIsFetchingStatus] = useState(false as boolean);

//   asteroids For Liquidation state
    const [asteroidsForLiquidationKeys, setAsteroidsForLiquidationKeys] = useState([]);


//   asteroids For Liquidation logic
    useEffect(() => {
        setAsteroidsForLiquidationKeys(getLiquidationKeys(getLiquidationList()))
    }, [])

    const toggleLiquidateOnClick = (id: string): void => {
        asteroidsForLiquidationKeys.includes(id)
            ? setAsteroidsForLiquidationKeys(asteroidsForLiquidationKeys.filter(item=>item!==id))
            : setAsteroidsForLiquidationKeys([...asteroidsForLiquidationKeys, id])
    }








// load-more logic
 


    const loadMore = useCallback(async () => {
        setIsFetchingStatus(true)

        scrollDate.setDate(scrollDate.getDate() + 1);

        const dateToString = dateToISOString(scrollDate);

        let data = await getPortionAsteroidsAPI(dateToString);

        if (!data) {
            return { notFound: true }
        }

        setAsteroidsListState([...asteroidsListState, ...data])
        setIsFetchingStatus(false)

    }, [scrollDate, asteroidsListState])


    
    const checkPosition = useCallback(() => {

        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight

        const scrolled = window.scrollY
 
        const threshold = height - screenHeight / 1000

        const position = scrolled + screenHeight

        if (position >= threshold && !isFetchingStatus) {
            loadMore()
        }
    }, [isFetchingStatus, loadMore ])





    useEffect(() => {
        window.addEventListener('scroll', checkPosition)
        window.addEventListener('resize', checkPosition)

        return () => {
            window.addEventListener('scroll', checkPosition)
            window.addEventListener('resize', checkPosition)
        }
    }, [checkPosition])

    
      

    return (
        <div className={styles.MainWrapper}>
            <div className={styles.Main}>
                <h1 className={styles.MainHeader}>Ближайшие подлёты</h1>
                <div className={styles.MainHeaderLine}></div>
                <div className={styles.MainParameters}>
                    <div className={styles.MainParametersDistance}>
                        <span>Отображать расстояние: </span> 
                        <button 
                            className={measureUnit === 'km' ? styles.ParameterDistanceActive : styles.ParameterDistance} 
                            onClick={()=>setMeasureUnit('km')}> в километрах  
                        </button> 
                        <span> | </span>
                        <button 
                            className={measureUnit === 'orbit' ? styles.ParameterDistanceActive : styles.ParameterDistance} 
                            onClick={()=>setMeasureUnit('orbit')} > в лунных орбитах 
                        </button> 
                    </div>
                  
                        <input 
                            type='checkbox'
                            id='isDangerousCheckbox' 
                            name='isDangerousCheckbox' 
                            className={styles.MainParametersDangerousInput} 
                            onClick={() => setIsDangerFlag(!isDangerFlag)}/> 
                        <label
                            htmlFor='isDangerousCheckbox' 
                            className={styles.MainParametersDangerous} > 
                            Показать только опасные
                        </label>

                    {/* <label className={styles.MainParametersDangerous} >
                        <input 
                            type='checkbox' 
                            className={styles.MainParametersDangerousInput} 
                            onClick={() => setIsDangerFlag(!isDangerFlag)}/> 
                        <span className={styles.MainParametersDangerousSpan}>
                            Показать только опасные
                        </span>
                    </label> */}
                </div>
                <div className={styles.AsteroidsBlock}>
                    {!!asteroidsListState && (asteroidsListState.length > 0) && 
                        asteroidsListState
                        .filter(item => { if (isDangerFlag) { return item.is_potentially_hazardous_asteroid } else { return true} })
                        .map(m => <AsteroidCard 
                                    asteroid={m} 
                                    measureUnit={measureUnit} 
                                    key={m.id} 
                                    isInLiquidationList={ asteroidsForLiquidationKeys.includes(m.id)}
                                    isInLiquidationPage={false}
                                    setLiquidationList={toggleLiquidateOnClick} 
                                    />
                        )
                    }
                </div>

                {isFetchingStatus && <Preloader/>  }
               
           
            </div>
        </div>
    )
}

export default Main;








