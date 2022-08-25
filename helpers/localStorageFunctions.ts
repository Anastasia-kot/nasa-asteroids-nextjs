import { AsteroidInListType } from "../types";

export const toggleInLiquidationList = (add: boolean, asteroid: AsteroidInListType): void  => {
    add
        ?  window.localStorage.setItem(asteroid.id, JSON.stringify(asteroid))      
        :  window.localStorage.removeItem(asteroid.id)
        
    console.log('button clicked')
}


 
export const getLiquidationList = (): Array<AsteroidInListType>   => {
    let arr: Array<AsteroidInListType>; 
    
         for (let key in window.localStorage) {
            if (!(parseFunction(key)?.hasOwnProperty('links')))       { 
                continue;   
            } else {
                arr.push(parseFunction(key));
            }
        }
 
    return arr
}



 
export const parseFunction = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key))
}
















// export const getLiquidationListKeys = (): Array<string> => {
//     try {
//         return Object.keys(window.localStorage)
//     } catch (err) {

//     }
//     return []
// }
