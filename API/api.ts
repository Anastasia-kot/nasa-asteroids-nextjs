const API_KEY = 'api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW';
const BASE_URL = 'https://api.nasa.gov/';


export const getPortionAsteroidsAPI = async (date: string) => {
    try {
        const resp = await fetch(`${BASE_URL}neo/rest/v1/feed?start_date=${date}& end_date=${date}&${API_KEY}`);
        // проверить что 200 ОК

        const data = await resp.json();
        // return null;

        return (data.near_earth_objects[date]);

    } catch (err) {
        return null;
    } 
}


export const getBackGroundImgAPI = async (startDate: string, endDate: string) => {
    try {
        const resp = await fetch(`${BASE_URL}planetary/apod?start_date=${startDate}&end_date=${endDate}&${API_KEY}`);
        // проверить что 200 ОК

        const data = await resp.json();
        
        let url: string;
        for (let i = (data.length - 1); i>=0; i--) {
            if ( data[i].media_type === "image") {
                url = data[i].url;
                break;
            }
        }
        return url;
       
    } catch (err) {
        return null;
    }
}


export const getAsteroidInfoAPI = async (id: number) => {
    try {
        const resp = await fetch(`${BASE_URL}neo/rest/v1/neo/${id}?${API_KEY}`);
                // проверить что 200 ОК
        const data = await resp.json();

        return data 
    
    } catch (err) {
        return null  
    }
};
    
    
    
    
    



