
export type close_approach_dataType = Array<close_approach_dateType>;
export type close_approach_dateType = {

    close_approach_date:  string
    close_approach_date_full: string
    epoch_date_close_approach: number  
    miss_distance: {
        astronomical: string, 
        lunar: string, 
        kilometers: string, 
        miles: string 
    }
    orbiting_body: string
    relative_velocity: Object

}


export type AsteroidType = {

    absolute_magnitude_h: number;
    close_approach_data: close_approach_dataType;
    designation: string;
    estimated_diameter: Object;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    links: Object;
    name: string;
    nasa_jpl_url: string;
    neo_reference_id: string;
    orbital_data: Object;

} 


export type AsteroidInListType = {

    absolute_magnitude_h: number;
    close_approach_data: close_approach_dataType;
    estimated_diameter: Object;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    links: Object;
    name: string;
    nasa_jpl_url: string;
    neo_reference_id: string;

} 

export type AsteroidListType = Array<AsteroidInListType>