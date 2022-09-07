import { AsteroidInListType } from "../types";

export const toggleInLiquidationList = ( asteroid: AsteroidInListType): void  => {
    getLiquidationKeys(getLiquidationList()).includes(asteroid.id)
        ? window.localStorage.removeItem(asteroid.id)
        : window.localStorage.setItem(asteroid.id, JSON.stringify(asteroid))      
    }

export const parseFunction = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key))
}


export const getLiquidationList = (): Array<AsteroidInListType>   => {
    let arr: Array<AsteroidInListType> = []; 
    
         for (let key in window.localStorage) {
            if (!(parseFunction(key)?.hasOwnProperty('neo_reference_id')))       { 
                continue;   
            } else {
                arr.push(parseFunction(key));
            }
        }
 
    return arr
}


export const getLiquidationKeys = (arr: Array<AsteroidInListType>): Array<string> => {  
    return  arr.map(item => item.id)
}