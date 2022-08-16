// import '../styles/globals.css';
import { useEffect, useState } from 'react'
import Main from '../../components/Main/Main.tsx'

export const getStaticProps = async () => {
    let dateToString = (new Date()).toISOString().split('T')[0];
    const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?
                start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`);
    const data = await resp.json();

    if (!data) {
        return {notFound:true}
    }

    return {
        props: { asteroidsList: data.near_earth_objects[[dateToString]] }
    }
}
 



const Asteroids = ({asteroidsList}) =>  {

    return (  <Main asteroidsList={asteroidsList}/>    )
}

export default Asteroids;
