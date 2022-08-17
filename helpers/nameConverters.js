export const nameConverter = (name: string) => {
    name = name.split('(')[1];
    name = name.split(')')[0];

    return name;
}

export const distanceOrbitSuffix = (count: number) => {
    let result = 'лунных орбит';
    if (count % 10 === 1 && count%100 !==11) {
        result = 'лунная орбита';
    }
    
    if ( 
        (count % 10 === 2 && count%100 !==12) || 
        (count % 10 === 3 && count%100 !==13) || 
        (count % 10 === 4 && count%100 !==14) 
    ) {
        result = 'лунные орбиты';
    }
    
    

    return result;
}
