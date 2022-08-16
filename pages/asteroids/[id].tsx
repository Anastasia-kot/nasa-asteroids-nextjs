// import '../styles/globals.css';
import React, { useEffect, useState, FC } from 'react';
import { useRouter } from "next/router";
import Asteroid from '../../components/Asteroid/Asteroid.tsx';
import { AsteroidType } from '../../types';




export const getServerSideProps = async (context: { params: { id: any; }; } ) => {
    try {
        const { id } = context.params;

    const resp = await fetch(` https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`);
    const data = await resp.json();

    if (!data) {
        return { notFound: true }
    }

    return {
        props: { asteroidInfo: data }
    }
    } catch (err) {
        return {
            props: { 
                asteroidInfo: {

                    "id": '0',
                    "name": "",
                    "estimated_diameter": {
                        "kilometers": {
                            "estimated_diameter_min": '0',
                            "estimated_diameter_max": '0'
                        },
                    },
                    "is_potentially_hazardous_asteroid": false,
                    "close_approach_data": [
                        { 'close_approach_date': '1902-03-01',  },
                    ],
                }
            }
        }
    }
};

type PropsType = {
    asteroidInfo: AsteroidType
}
 
 

const ListCard: FC<PropsType> = ({ asteroidInfo }) => {

     const router = useRouter();

    useEffect(() => {
        if (asteroidInfo.id == '0') {
            setTimeout(() => {
                router.push('/asteroids')
            },
                3000
            )
        }
    }, [router])



    return ( <Asteroid asteroidInfo={asteroidInfo} />  )
}

export default ListCard;
