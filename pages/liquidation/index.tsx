// import '../styles/globals.css';
import { FC, useEffect, useState } from 'react';
import Liquidation from '../../components/Liquidation/Liquidation'
import { getLiquidationList, parseFunction } from '../../helpers/localStorageFunctions';
import { AsteroidInListType, AsteroidListType } from '../../types';

 
 
 


const liquidation: FC  = () =>  {


    

    //useEffect подписаться на локал сторейдж событие 
    
    return (
        <Liquidation  />
    )
}

export default liquidation;
