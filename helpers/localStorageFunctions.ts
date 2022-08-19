import { StringifyOptions } from "querystring";
import { AsteroidInListType } from "../types";

export const toggleInLiquidationList = (add: boolean, asteroid: AsteroidInListType): void  => {
    add
        ? window.localStorage.setItem(asteroid.id, JSON.stringify(asteroid))
        : window.localStorage.removeItem(asteroid.id)     
}


 
export const getLiquidationList = (): Array<AsteroidInListType>   => {
    let arr: Array<AsteroidInListType>; 
    try {
        for (let key in window.localStorage) {
            if ((!window.localStorage.hasOwnProperty(key))
                && (typeof (+key) === "number")
                && (!JSON.parse(window.localStorage.getItem(key)).hasOwnProperty('id'))
            ) {
                continue;  // пропустит такие ключи, как "setItem", "getItem" и так далее
            }

            arr.push(JSON.parse(window.localStorage.getItem(key)));

        }

    } catch (err) {

    }

    return arr
}




export const getLiquidationListKeys = (): Array<string> => {
    try {
        return Object.keys(window.localStorage)
    } catch (err) {

    }
    return []
}