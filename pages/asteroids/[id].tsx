import React, { useEffect, FC } from 'react';
import { useRouter } from '../../node_modules/next/router';
import { AsteroidType } from '../../types';
import { getAsteroidInfoAPI } from '../../API/api';
import Asteroid from '../../src/screens/Asteroid/Asteroid';


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
    }, [router, asteroidInfo])

    return (<Asteroid asteroidInfo={asteroidInfo} />)
}

export default ListCard;
