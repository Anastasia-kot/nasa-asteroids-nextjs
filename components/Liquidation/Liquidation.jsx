import React, { useState } from "react";
import ListItemLiquidation from "./ListItemLiquidation/ListItemLiquidation";
 import styles from './Liquidation.module.css';


const Liquidation = () => {

  let [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([]);


try {
  for (let key in localStorage) {
    // console.log(key)

    if (         (!localStorage.hasOwnProperty(key)) 
      && (typeof (+key) === "number")  
      && (!JSON.parse(localStorage.getItem(key)).hasOwnProperty('id'))
      )   {  continue;  // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
 


      asteroidsForLiquidation.push(JSON.parse(localStorage.getItem(key)));
    
  }

} catch (err) {

}





  console.log(asteroidsForLiquidation)
    return (
        <div className={styles.LiquidationWrapper}> 
        <div className={styles.Liquidation}> 
          <div className={styles.AsteroidsBlock}>
              
        
              
              
              {asteroidsForLiquidation.length > 0 
              ? (asteroidsForLiquidation.map(m =>
                m.hasOwnProperty('id')
                  ? <ListItemLiquidation {...m} key={m.id} />
                  : null
                ))
                : (<span>Список астероидов на уничтожение пуст</span>)
                
              }
          </div>

          {asteroidsForLiquidation.length > 0 && <button 
          className={styles.AsteroidLiquidate}
          onClick={() => { 
            localStorage.clear(); 
            setAsteroidsForLiquidation([]) 
            alert('Бригада имени Брюса Уиллиса выехала на уничтожение') 
          }}>
            Ликвидировать
        </button>}

        </div>
        </div>
    )
}

export default Liquidation;