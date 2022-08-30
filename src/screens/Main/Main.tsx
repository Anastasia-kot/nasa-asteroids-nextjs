import React, { useEffect, useState, FC, useCallback } from "react";
import styles from './Main.module.css';
import { AsteroidInListType, AsteroidListType, MeasureUnitType } from "../../../types";
import Preloader from "../../components/Preloader/Preloader";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import { dateToISOString } from "../../../helpers/dateConverters";
import { getPortionAsteroidsAPI } from "../../../API/api";




type PropsType = {
    asteroidsList: Array<AsteroidInListType>
}

const Main: FC<PropsType> = ({asteroidsList}) => {


// sorting parameters
    let [measureUnit, setMeasureUnit] = useState('km'as MeasureUnitType);
    let [isDangerFlag, setIsDangerFlag] = useState(false as boolean);

    let [scrollDate, setScrollDate] = useState(new Date());
    let [asteroidsListState, setAsteroidsListState] = useState(asteroidsList as AsteroidListType);
    let [isFetchingStatus, setIsFetchingStatus] = useState(false as boolean);

    

    const [state, setState] = useState({ scrollTop: 0 });






    const loadMore = useCallback( async () => {
        setIsFetchingStatus(true)

        scrollDate.setDate(scrollDate.getDate() + 1);
        const dateToString = dateToISOString(scrollDate);

        let data = await getPortionAsteroidsAPI(dateToString);

        if (!data) {
            return { notFound: true }
        }

        setAsteroidsListState([...asteroidsListState, ...data ])
        setIsFetchingStatus(false)
    }, [scrollDate, asteroidsListState])





// load-more logic

    const handleScroll = useCallback(() => {
        if (!isFetchingStatus) {
            loadMore()
        }
    }, [setIsFetchingStatus, loadMore, isFetchingStatus])
    //use call back

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousewheel', handleScroll )
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousewheel', handleScroll)
        }
    }, [handleScroll])

    
    

    
// liquidation info

    // let [asteroidsForLiquidationKeys, setAsteroidsForLiquidationKeys] = useState([] as Array<string>);
    // useEffect(() => {
    //     setAsteroidsForLiquidationKeys(getLiquidationListKeys())

    // },[])



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
                
                    <label className={styles.MainParametersDangerous} >
                        <input 
                            type='checkbox' 
                            className={styles.MainParametersDangerousInput} 
                            onClick={() => setIsDangerFlag(!isDangerFlag)}/> 
                        <span className={styles.MainParametersDangerousSpan}>
                            Показать только опасные
                        </span>
                    </label>
                </div>
                <div className={styles.AsteroidsBlock}>
                    {!!asteroidsListState && (asteroidsListState.length > 0) && 
                        asteroidsListState.map(m => 
                            isDangerFlag 
                                ? (m.is_potentially_hazardous_asteroid) && 
                                    <AsteroidCard 
                                        asteroid={m} 
                                        measureUnit={measureUnit} 
                                        key={m.id} 
                                        isInLiquidationPage={false} 
                                        isInLiquidationList={false} />
                                : <AsteroidCard 
                                    asteroid={m} 
                                    measureUnit={measureUnit} 
                                    key={m.id} 
                                    isInLiquidationPage={false} 
                                    isInLiquidationList={false} />
                        )
                    }
                </div>

                {isFetchingStatus && <Preloader/>  }
               
           
            </div>
        </div>
    )
}

export default Main;








