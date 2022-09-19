// import '../styles/globals.css';
import { FC, useEffect, useState } from 'react';
import { dateCloserFinder } from '../../helpers/dateConverters';
import { getLiquidationKeys, getLiquidationList, parseFunction } from '../../helpers/localStorageFunctions';
import Liquidation from '../../src/screens/Liquidation/Liquidation';

 
 
 


const LiquidationPage: FC<any>  = () =>  {


    const asteroidsForLiquidation = getLiquidationList().sort(function (a, b) {
        return (
            +(new Date(dateCloserFinder(a.close_approach_data))) - +(new Date(dateCloserFinder(b.close_approach_data)))
        );
    })

    const liquidationKeys = getLiquidationKeys(getLiquidationList())
 
    //useEffect подписаться на локал сторейдж событие 
    
    return (<Liquidation asteroidsForLiquidationList={asteroidsForLiquidation} liquidationKeys={liquidationKeys} />    )
}

export default LiquidationPage;
