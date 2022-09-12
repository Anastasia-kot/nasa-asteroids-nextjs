import styles from '../styles/Home.module.css'
 import { useRouter } from '../node_modules/next/router';
import { useEffect, FC } from 'react';
 
 
 

const Home: FC = () => {

 
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/asteroids')
    },
      1000 
    )
  }, [router])

 
  return (
    <div className={styles.MainWrapper}>
      <div className={styles.Main}>
        Этой страницы не существует
      </div>
    </div>
  )
}



export default Home;