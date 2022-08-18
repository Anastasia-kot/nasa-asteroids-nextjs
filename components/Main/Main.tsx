import React, { useEffect, useState, FC, useRef } from "react";
import { AsteroidListType, MeasureUnitType } from "../../types";
import ListItem from "./ListItem/ListItem";
import styles from './Main.module.css';




type PropsType = {
    asteroidsList: AsteroidListType
}

const Main: FC<PropsType> = ({asteroidsList}) => {


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
        if ( window.scrollY  > 300){
            loadMore()
        }

     }












    let [measureUnit, setMeasureUnit] = useState('km'as MeasureUnitType);
    let [isDangerFlag, setIsDangerFlag] = useState(false as boolean);



    let [scrollDate, setScrollDate] = useState(new Date());
    let [asteroidsListState, setAsteroidsListState] = useState(asteroidsList);

    let loadMore = async () => {
         
        scrollDate.setDate(scrollDate.getDate() + 1);
        let dateToString = scrollDate.toISOString().split('T')[0];
        const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`);
        const data = await resp.json();

        if (!data) {
            return { notFound: true }
        } 
       
            setAsteroidsListState([...asteroidsListState, ...data.near_earth_objects[dateToString] ])

        
       

    }
    
 


 

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
                            ? (m.is_potentially_hazardous_asteroid) && <ListItem asteroid={m} measureUnit={measureUnit} key={m.id} />
                            : <ListItem asteroid={m}  measureUnit={measureUnit} key={m.id} />

                        )
                    }
                </div>

                <button 
                    onClick={() => loadMore()}
                    className={styles.LoadButton}>
                        Загрузить еще
                </button>
           
            </div>
        </div>
    )
}

export default Main;








