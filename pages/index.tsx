import styles from '../styles/Home.module.css'
 import { useRouter } from '../node_modules/next/router';
import { useEffect, FC, useState } from 'react';
 
 
 

const Home: FC = () => {

 
  const router = useRouter();

  const [isChangingRoute, setIsChangingRoute] = useState(false);

  useEffect(() => {
    if (!isChangingRoute) {
      setTimeout(() => {
          router.push('/asteroids')
        }, 1000 ) 
      setIsChangingRoute(true)
    }
  }, [router, isChangingRoute])

 
  
  return (
    <div className={styles.MainWrapper}>
      <div className={styles.Main}>
        Этой страницы не существует
      </div>
    </div>
  )
}



export default Home;