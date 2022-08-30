// import '../styles/globals.css';
import { FC, useEffect, useState } from 'react';
import { getLiquidationList, parseFunction } from '../../helpers/localStorageFunctions';
import Liquidation from '../../src/screens/Liquidation/Liquidation';
import { AsteroidInListType, AsteroidListType } from '../../types';

 
 
 


const liquidation: FC  = () =>  {


    

    //useEffect подписаться на локал сторейдж событие 
    
    return (
        <Liquidation  />
    )
}

export default liquidation;
