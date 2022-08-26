import React, { FC, useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import AsteroidCard from "../utils/AsteroidCard/AsteroidCard";
import { AsteroidInListType} from "../../types";
import { parseFunction } from "../../helpers/localStorageFunctions";


type Props = {
  asteroidsForLiquidation: Array<AsteroidInListType>
}


const Liquidation: FC<Props> = ({ asteroidsForLiquidation }) => {

const [asteroidsForLiquidationFC, setAsteroidsForLiquidationFC] = useState(asteroidsForLiquidation as Array<AsteroidInListType>);
   
  
 

  console.log( 'FC: ', asteroidsForLiquidationFC)
  
  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {asteroidsForLiquidationFC && 
      
        asteroidsForLiquidationFC.length > 0
          ?<>
            <h1 className={styles.Header}> Заказать уничтожение астероидов</h1>
            <div className={styles.HeaderLine}> </div>
            <p>Заказать бригаду имени Брюса Уиллиса для уничтожения выбранных астероидов</p>

            <button  //создать колбек 'он_делит' и прокинуть  
              className={styles.AsteroidLiquidate}
              onClick={() => {
                window.localStorage.clear();
                setAsteroidsForLiquidationFC([])
                alert('Бригада имени Брюса Уиллиса выехала на уничтожение')
              }}> 
              Уничтожить
            </button>

             <div className={styles.AsteroidsBlock}> {asteroidsForLiquidationFC.map(m =>
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