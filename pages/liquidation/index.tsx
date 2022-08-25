// import '../styles/globals.css';
import { FC, useEffect, useState } from 'react';
import Liquidation from '../../components/Liquidation/Liquidation'
import { getLiquidationList, parseFunction } from '../../helpers/localStorageFunctions';
import { AsteroidInListType, AsteroidListType } from '../../types';

 
 
 


const liquidation: FC  = () =>  {


    const [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);

    try {

        for (let key in window.localStorage) {
            if (!(parseFunction(key)?.hasOwnProperty('links'))) {
                continue;
            } else {
                asteroidsForLiquidation.push(parseFunction(key));
            }
        }
    } catch (err) {

    }

    console.log(asteroidsForLiquidation)

    //useEffect подписаться на локал сторейдж событие 
    
    return (
        <Liquidation asteroidsForLiquidation={asteroidsForLiquidation} />
    )
}

export default liquidation;
