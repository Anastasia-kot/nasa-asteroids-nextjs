import React, { FC, useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import AsteroidCard from "../utils/AsteroidCard/AsteroidCard";
// import { getLiquidationList } from "../../helpers/localStorageFunctions";
import { AsteroidInListType, close_approach_dataType, estimated_diameterType } from "../../types";


const Liquidation:FC = ( ) => {

  const [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);
  
  useEffect(() => {
       for (let key in window.localStorage) {
 
        // console.log(key, ': ', JSON.parse(window.localStorage.getItem(key)))
 
         if (!(JSON.parse(window.localStorage.getItem(key))?.hasOwnProperty('links'))  ) { 
          continue 
        } else {
          console.log('----------------------------',key, 'ADDED ');

              // setAsteroidsForLiquidation([...asteroidsForLiquidation, JSON.parse(window.localStorage.getItem(key))]);
           asteroidsForLiquidation.push(JSON.parse(window.localStorage.getItem(key)))
          console.log(  asteroidsForLiquidation)

        }
      }
  }, [])
 

  // console.log(  asteroidsForLiquidation)
  
  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {true
        // asteroidsForLiquidation.length > 0
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
{/* создать колбек 'он делит' и прокинуть  */}

            <div className={styles.AsteroidsBlock}> {asteroidsForLiquidation.map(m =>
              <AsteroidCard 
                    asteroid={m} 
                    key={m.id} 
                    measureUnit={'km'} 
                    isInLiquidationPage={true} 
                    isInLiquidationList={true} />
              )}  
            </div>
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