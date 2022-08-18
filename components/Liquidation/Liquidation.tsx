import React, { FC, useState } from "react";
import ListItemLiquidation from "./ListItemLiquidation/ListItemLiquidation";
import styles from './Liquidation.module.css';


const Liquidation:FC = ( ) => {

  let [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([]);


try {
  for (let key in localStorage) {
    if (         (!localStorage.hasOwnProperty(key)) 
      && (typeof (+key) === "number")  
      && (!JSON.parse(localStorage.getItem(key)).hasOwnProperty('id'))
      )   {  continue;  // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
 
    asteroidsForLiquidation.push(JSON.parse(localStorage.getItem(key)));
    
  }

} catch (err) {

}



  console.log(localStorage)

     return (
        <div className={styles.LiquidationWrapper}> 
          <div className={styles.Liquidation}> 
            
              
        
              
              
              {asteroidsForLiquidation.length > 0 
                ? <div className={styles.AsteroidsBlock}> {asteroidsForLiquidation.map(m =>
                m.hasOwnProperty('id')
                  ? <ListItemLiquidation asteroid={m} key={m.id} />
                  : null
               )}  </div>
                : (<>
                      <h1 className={styles.Header}> Список астероидов на уничтожение пуст</h1>
                      <div className={styles.HeaderLine}> </div>   
                  </>)
                
              }
        

          {asteroidsForLiquidation.length > 0 && <button 
          className={styles.AsteroidLiquidate}
          onClick={() => { 
            localStorage.clear(); 
            setAsteroidsForLiquidation([]) 
            alert('Бригада имени Брюса Уиллиса выехала на уничтожение') 
          }}>
            Заказать уничтожение
        </button>}

        </div>
        </div>
    )
}

export default Liquidation;