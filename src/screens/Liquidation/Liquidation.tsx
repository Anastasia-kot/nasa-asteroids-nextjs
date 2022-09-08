import React, { useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import { AsteroidInListType} from "../../../types";
import { getLiquidationKeys, getLiquidationList, parseFunction } from "../../../helpers/localStorageFunctions";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import Button from "../../components/Button/Button";
import { dateCloserFinder } from "../../../helpers/dateConverters";


// type Props = {
//   asteroidsForLiquidation: Array<AsteroidInListType>
// }


const Liquidation = React.memo( () => {


  const [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);

  useEffect( ()=>{
    setAsteroidsForLiquidation(
      getLiquidationList().sort(function (a, b) {
        return (
          +(new Date(dateCloserFinder(a.close_approach_data))) - +(new Date(dateCloserFinder(b.close_approach_data)))
          );
      })
      )
  }, []) 
  
  
  
  //   asteroids For Liquidation state
  const [asteroidsForLiquidationKeys, setAsteroidsForLiquidationKeys] = useState([]);


  //   asteroids For Liquidation logic

  useEffect(() => {
    setAsteroidsForLiquidationKeys(getLiquidationKeys(getLiquidationList()))
  }, [])

  const toggleLiquidateOnClick = (id: string): void => {
    asteroidsForLiquidationKeys.includes(id)
      ? setAsteroidsForLiquidationKeys(asteroidsForLiquidationKeys.filter(item => item !== id))
      : setAsteroidsForLiquidationKeys([...asteroidsForLiquidationKeys, id])
  }




  const onLiquidate = () => {
    asteroidsForLiquidationKeys.forEach((item) => {
      window.localStorage.removeItem(item)
    })   
       // window.localStorage.clear();

    setAsteroidsForLiquidation(asteroidsForLiquidation.filter(a => !asteroidsForLiquidationKeys.includes(a.id) ))
    // setAsteroidsForLiquidation([]);
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
                    isInLiquidationList={asteroidsForLiquidationKeys.includes(m.id)}
                    isInLiquidationPage={true}
                    setLiquidationList={toggleLiquidateOnClick} 

                     />
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