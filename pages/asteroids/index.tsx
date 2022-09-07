// import '../styles/globals.css';
import { FC } from 'react'
import { getPortionAsteroidsAPI } from '../../API/api';
import Main from '../../src/screens/Main/Main'
import { dateToISOString } from '../../helpers/dateConverters';
import { AsteroidInListType } from '../../types';

export const getStaticProps = async () => {
    let newDate = new Date();
    let dateToString = dateToISOString(newDate);
    const data = await getPortionAsteroidsAPI(dateToString);
 
    if (!data) {
        return {notFound:true}
    }
 
    return {
        props: { asteroidsList: data }
    }
}
 

type PropsType = {
    asteroidsList: Array<AsteroidInListType>
}

const Asteroids: FC<PropsType> = ({asteroidsList}) => {
    return (  <Main asteroidsList={asteroidsList}/>    )
}

export default Asteroids;
