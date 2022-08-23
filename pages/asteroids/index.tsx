// import '../styles/globals.css';
import { FC } from 'react'
import { getPortionAsteroidsAPI } from '../../API/api';
import Main from '../../components/Main/Main'
import { dateToISOString } from '../../helpers/dateConverters';
import { AsteroidListType } from '../../types';

export const getStaticProps = async () => {
    let dateToString = dateToISOString(new Date());
    const data = await getPortionAsteroidsAPI(dateToString);
 
    if (!data) {
        return {notFound:true}
    }
 
    return {
        props: { asteroidsList: data }
    }
}
 

type PropsType = {
    asteroidsList: AsteroidListType
}

const Asteroids: FC<PropsType> = ({asteroidsList}) => {
    return (  <Main asteroidsList={asteroidsList}/>    )
}

export default Asteroids;
