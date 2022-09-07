export type close_approach_dateType = {
    close_approach_date:  string
    close_approach_date_full: string
    epoch_date_close_approach: number  
    miss_distance: miss_distanceType
    orbiting_body: string
    relative_velocity: relative_velocityType
}

export type AsteroidType = {
    absolute_magnitude_h: number;
    close_approach_data: Array<close_approach_dateType>;
    designation: string;
    estimated_diameter: estimated_diameterType
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
    close_approach_data: Array<close_approach_dateType>;
    estimated_diameter: estimated_diameterType
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    links: Object;
    name: string;
    nasa_jpl_url: string;
    neo_reference_id: string;

} 


export type estimated_diameterType = {
    "kilometers": {
        "estimated_diameter_min": number,
        "estimated_diameter_max": number
    },
    "meters": {
        "estimated_diameter_min": number,
        "estimated_diameter_max": number
    },
    "miles": {
        "estimated_diameter_min": number,
        "estimated_diameter_max": number
    },
    "feet": {
        "estimated_diameter_min": number,
        "estimated_diameter_max": number
    }
}

export type relative_velocityType = {
    'kilometers_per_hour': string
    'kilometers_per_second': string
    'miles_per_hour': string
}


export type miss_distanceType = {
    'astronomical': string,
    'lunar': string,
    'kilometers': string,
    'miles': string
}






export type MeasureUnitType = 'km' | 'orbit';