// import '../styles/globals.css';
import { FC } from 'react'
import Main from '../../components/Main/Main'
import { dateToISOString } from '../../helpers/dateConverters';
import { AsteroidListType } from '../../types';

export const getStaticProps = async () => {
    let dateToString = dateToISOString(new Date());
    const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?
                start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`);
    const data = await resp.json();

    if (!data) {
        return {notFound:true}
    }


    if (!data.near_earth_objects || !data.near_earth_objects[dateToString]) {
        return {
            props: { asteroidsList: [] }
        }
    }
    return {
        props: { asteroidsList: data.near_earth_objects[dateToString] }
    }
}
 

type PropsType = {
    asteroidsList: AsteroidListType
}

const Asteroids: FC<PropsType> = ({asteroidsList}) =>  {
    
 



    return (  <Main asteroidsList={asteroidsList}/>    )
}

export default Asteroids;
