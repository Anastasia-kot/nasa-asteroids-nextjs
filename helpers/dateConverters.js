export const dateConverter = (date: string) => {
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    switch (month) {
        case '01': month = 'января'; break;
        case '02': month = 'февраля'; break;
        case '03': month = 'марта'; break;
        case '04': month = 'апреля'; break;
        case '05': month = 'мая'; break;
        case '06': month = 'июня'; break;
        case '07': month = 'июля'; break;
        case '08': month = 'августа'; break;
        case '09': month = 'сентября'; break;
        case '10': month = 'октября'; break;
        case '11': month = 'ноября'; break;
        case '12': month = 'декабря'; break;
        default: break;
    };
    let year = date.split('-')[0];

    let newDate = day + ' ' + month + ' ' + year;
    return newDate;
}



export const dateToYesterday = (date: string) => {
    let day = +date.split('-')[2] - 2 ;
    let newDate = date.split(-1)[0] + '-' + day;
    return newDate;
}



export const dateCloserFinder = (dates: Array<object>) => {    
    
    let now = new Date(); 
    now.setHours(0, 0, 0, 0);

    let closeDate = new Date( dates[0].close_approach_date);
    
 

        let i = 0;
        do {
            closeDate.setFullYear( dates[i].close_approach_date.split('-')[0], dates[i].close_approach_date.split('-')[1], dates[i].close_approach_date.split('-')[2]);
            i++;
        } while ((closeDate < now) && (dates.length >= i)) 
    
     return closeDate.toISOString().split('T')[0];;
}


