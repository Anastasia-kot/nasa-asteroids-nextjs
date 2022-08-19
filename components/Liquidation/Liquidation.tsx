import React, { FC, useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import AsteroidCard from "../utils/AsteroidCard/AsteroidCard";
// import { getLiquidationList } from "../../helpers/localStorageFunctions";
import { AsteroidInListType } from "../../types";


const Liquidation:FC = ( ) => {

  let [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);

  try {
    for (let key in window.localStorage) {
      if ((!window.localStorage.hasOwnProperty(key))
        && (typeof (+key) === "number")
        && (!JSON.parse(window.localStorage.getItem(key)).hasOwnProperty('id'))
      ) {
        continue;  // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      asteroidsForLiquidation.push(JSON.parse(window.localStorage.getItem(key)));
    }

  } catch (err) {

  }

  // useEffect(() => {
  //     setAsteroidsForLiquidation(  getLiquidationList() )
  // }, [])


  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {!!asteroidsForLiquidation && asteroidsForLiquidation.length > 0
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
                ? <AsteroidCard 
                    asteroid={m} 
                    key={m.id} 
                    measureUnit={'km'} 
                    isInLiquidationPage={true} 
                    isInLiquidationList={true} />
                : null
            )}  </div>
          </>

          :<>
            <h1 className={styles.Header}> Список астероидов на уничтожение пуст</h1>
            <div className={styles.HeaderLine}> </div>
          </>
        }

      </div>
    </div>
    )
}

export default Liquidation;