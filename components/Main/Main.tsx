import React, { useEffect, useState, FC } from "react";
import ListItem from "./ListItem/ListItem";
import styles from './Main.module.css';


const Main:FC<any> = ({asteroidsList}) => {



    let [measureUnit, setMeasureUnit] = useState('km');
    let [isDangerFlag, setIsDangerFlag] = useState(false);



    console.log(asteroidsList)




    // let [date, setDate] = useState(new Date());

    // let [asteroidsList, setAsteroidsList] = useState([]);

    // useEffect(() => {
    //     let dateToString = date.toISOString().split('T')[0];
    //     fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`)
    //         .then(response => response.json())
    //         .then(commits => {
    //             let newPortion = commits.near_earth_objects[dateToString] ;
    //             setAsteroidsList(newPortion)

    //             // setAsteroidsList([...asteroidsList, ...newPortion])
    //             // setDate(date.getDate() + 1)
    //         });
    // }, [date])



 

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
                    {!!asteroidsList && (asteroidsList.length > 0) && 
                        asteroidsList.map(m => 
                            isDangerFlag 
                            ? (m.is_potentially_hazardous_asteroid) && <ListItem {...m} isDangerFlag={isDangerFlag} measureUnit={measureUnit} key={m.id} />
                            : <ListItem {...m} isDangerFlag={isDangerFlag} measureUnit={measureUnit} key={m.id} />

                        )
                    }
                </div>
           
            </div>
        </div>
    )
}

export default Main;








