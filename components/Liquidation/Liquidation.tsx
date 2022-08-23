import React, { FC, useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import AsteroidCard from "../utils/AsteroidCard/AsteroidCard";
// import { getLiquidationList } from "../../helpers/localStorageFunctions";
import { AsteroidInListType } from "../../types";


const Liquidation:FC = ( ) => {

  let [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);
  
  useEffect(() => {
    try {
      for (let key in window.localStorage) {
        
        let currentItem = JSON.parse(window.localStorage.getItem(key));
        
        if ( !(currentItem.hasOwnProperty('neo_reference_id'))  ) { 
          continue 
        } else {
          // asteroidsForLiquidation.push(currentItem)
          setAsteroidsForLiquidation([...asteroidsForLiquidation, currentItem])
        }
      }

    } catch (err) {

    }
  }, [])
 

  console.log(  asteroidsForLiquidation)
  
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