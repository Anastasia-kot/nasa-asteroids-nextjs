import React, { FC, useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import { AsteroidInListType} from "../../../types";
import { parseFunction } from "../../../helpers/localStorageFunctions";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import Button from "../../components/Button/Button";


// type Props = {
//   asteroidsForLiquidation: Array<AsteroidInListType>
// }


const Liquidation = React.memo( () => {


  const [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([]);

 

  useEffect( ()=>{
    let arr = []
    for (let key in window.localStorage) {
      if (!(parseFunction(key)?.hasOwnProperty('neo_reference_id'))) {
        continue;
      } else {
        arr.push(parseFunction(key));
      }
    }
    setAsteroidsForLiquidation([...arr])


  }, []) 
  console.log(asteroidsForLiquidation)
 
  
 
const onLiquidate = () =>{
  window.localStorage.clear();
  setAsteroidsForLiquidation([])
  alert('Бригада имени Брюса Уиллиса выехала на уничтожение')
}
  
  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {asteroidsForLiquidation && 
        asteroidsForLiquidation.length > 0
          ?<>
            <h1 className={styles.Header}> Заказать уничтожение астероидов</h1>
            <div className={styles.HeaderLine}> </div>
            <p>Заказать бригаду имени Брюса Уиллиса для уничтожения выбранных астероидов</p>

        

            <Button
              text={'Уничтожить'}
              onClickFunction={() => { onLiquidate() }} />  

             <div className={styles.AsteroidsBlock}> {asteroidsForLiquidation.map(m =>
               <AsteroidCard  //создать колбек 'он_делит' и прокинуть
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
})


Liquidation.displayName = 'Liquidation';

export default Liquidation;