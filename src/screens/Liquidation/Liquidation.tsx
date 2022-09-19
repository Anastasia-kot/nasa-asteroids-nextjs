import React, { useEffect, useState } from "react";
import styles from './Liquidation.module.css';
import { AsteroidInListType} from "../../../types";
import { getLiquidationKeys, getLiquidationList, parseFunction, toggleInLiquidationList } from "../../../helpers/localStorageFunctions";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import Button from "../../components/Button/Button";
import { dateCloserFinder } from "../../../helpers/dateConverters";
import {Modal} from "../../components/Modal/Modal";


// type Props = {
//   asteroidsForLiquidation: Array<AsteroidInListType>
// }


const Liquidation = React.memo( () => {


  //  state + get state logic

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
  
  
  





  // props and state for modal  change asteroid  liquidation list

  const [modalOnChange, setModalOnChange] = useState({ isModal: false, asteroidModal: null } as { isModal: Boolean, asteroidModal: null | AsteroidInListType });

  const onClickFunctionsChange = [
    () => {
      toggleInLiquidationList(modalOnChange.asteroidModal);
      setAsteroidsForLiquidation(asteroidsForLiquidation.filter(item => item !== modalOnChange.asteroidModal));
      setModalOnChange((actual) => { return { ...actual, isModal: false, asteroidModal: null } })
    },
   () => { setModalOnChange((actual) => { return { ...actual, isModal: false } }) },
   
  ]

  const onClickTextChange = [
      'Да',
      'Отмена', 
  ]

  //  change asteroid  liquidation list -  get  Keys
  const [asteroidsForLiquidationKeys, setAsteroidsForLiquidationKeys] = useState([]);

  useEffect(() => {
    setAsteroidsForLiquidationKeys(getLiquidationKeys(getLiquidationList()))
  }, [])

  const toggleLiquidateOnClick = (id: string): void => {
    setModalOnChange((actual) => { 
      return { 
        ...actual, 
        isModal: true, 
        asteroidModal: asteroidsForLiquidation.find(asteroid => asteroid.id === id) 
 }} 
    );
  }













  // props and state for modal      liquidate

  const [modalLiquidate, setModalLiquidate] = useState(false as boolean);


  const onLiquidate = () => {
    setModalLiquidate(true)
    // asteroidsForLiquidationKeys.forEach((item) => {
    //   window.localStorage.removeItem(item)
    // })   
    
    // alert('11')
  }
  const onClickFunctionsLiquidate = [
    () => { 
      asteroidsForLiquidationKeys.forEach((item) => {
        window.localStorage.removeItem(item)
      })   
      setAsteroidsForLiquidation(asteroidsForLiquidation.filter(a => !asteroidsForLiquidationKeys.includes(a.id)))
      setModalLiquidate(false) 
    },
  ]
  const onClickTextLiquidate = [ 'Ок' ]


 

 






  return (
    <div className={styles.LiquidationWrapper}>
      <div className={styles.Liquidation}>

        {asteroidsForLiquidation && 
        asteroidsForLiquidation.length > 0
          ?<>

            {modalOnChange.isModal && <Modal 
                data={modalOnChange.asteroidModal}
                onClickFunctions = { onClickFunctionsChange }
                onClickText = {onClickTextChange}
                modalText='Вы уверены, что хотите удалить астероид  из корзины для заказа?'
            />}
            {modalLiquidate && <Modal 
                data={null}
                onClickFunctions={onClickFunctionsLiquidate}
                onClickText={onClickTextLiquidate}
                modalText='Бригада имени Брюса Уиллиса выехала на уничтожение'
            />}


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