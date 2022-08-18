import React, { FC, useState } from "react";
import styles from './Liquidation.module.css';
import AsteroidCard from "../utils/AsteroidCard/AsteroidCard";


const Liquidation:FC = ( ) => {

let [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([]);


try {
  for (let key in window.localStorage) {
    if ((!window.localStorage.hasOwnProperty(key)) 
      && (typeof (+key) === "number")  
      && (!JSON.parse(window.localStorage.getItem(key)).hasOwnProperty('id'))
      )   {  continue;  // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
 
    asteroidsForLiquidation.push(JSON.parse(window.localStorage.getItem(key)));
    
  }

} catch (err) {

}



  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {asteroidsForLiquidation.length > 0
          ?<>
            <h1 className={styles.Header}> Заказать уничтожение астероидов</h1>
            <div className={styles.HeaderLine}> </div>
            <p>Заказать бригаду имени Брюса Уиллиса для уничтожения выбранных астероидов</p>

            <button
              className={styles.AsteroidLiquidate}
              onClick={() => {
                window.localStorage.clear();
                setAsteroidsForLiquidation([])
                alert('Бригада имени Брюса Уиллиса выехала на уничтожение')
              }}>
              Уничтожить
            </button>


            <div className={styles.AsteroidsBlock}> {asteroidsForLiquidation.map(m =>
              m.hasOwnProperty('id')
                ? <AsteroidCard asteroid={m} key={m.id} measureUnit={'km'} isInLiquidation={true} />
                : null
            )}  </div>
          </>

          : <>
            <h1 className={styles.Header}> Список астероидов на уничтожение пуст</h1>
            <div className={styles.HeaderLine}> </div>
          </>
        }

      </div>
    </div>
    )
}

export default Liquidation;