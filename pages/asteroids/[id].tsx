// import '../styles/globals.css';
import React, { useEffect, FC } from 'react';
import { useRouter } from '../../node_modules/next/router';
import Asteroid from '../../components/Asteroid/Asteroid';
import { AsteroidType } from '../../types';
import { getAsteroidInfoAPI } from '../../API/api';


export const getServerSideProps = async (context: { params: { id: number; }; }) => {
    const { id } = context.params;
    const data = await getAsteroidInfoAPI(id);


    if (!data) {
        return { notFound: true }
    }

    return {
        props: { asteroidInfo: data }
    }
}
   

type PropsType = {
    asteroidInfo: AsteroidType
}
 
 

const ListCard: FC<PropsType> = ({ asteroidInfo }) => {

    const router = useRouter();

    useEffect(() => {
        if (!asteroidInfo) {
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
