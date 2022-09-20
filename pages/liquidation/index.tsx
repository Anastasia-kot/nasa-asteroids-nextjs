// import '../styles/globals.css';
import { FC, useEffect, useState } from 'react';
import { dateCloserFinder } from '../../helpers/dateConverters';
import { getLiquidationKeys, getLiquidationList, parseFunction } from '../../helpers/localStorageFunctions';
import Liquidation from '../../src/screens/Liquidation/Liquidation';
import { AsteroidInListType } from '../../types';

 
 
 


const LiquidationPage: FC<any>  = () =>  {
    let asteroidsForLiquidation = [] as Array<AsteroidInListType>;

    let liquidationKeys = [] as Array<string>;

    try {
        asteroidsForLiquidation = getLiquidationList().sort(function (a, b) {
            return (
                +(new Date(dateCloserFinder(a.close_approach_data))) - +(new Date(dateCloserFinder(b.close_approach_data)))
            )
        });

        liquidationKeys = getLiquidationKeys(getLiquidationList());

    } catch (err) {
        
    }


 
    //useEffect подписаться на локал сторейдж событие 
    
    return (<Liquidation asteroidsForLiquidationList={asteroidsForLiquidation} liquidationKeys={liquidationKeys} />    )
}

export default LiquidationPage;
