 import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from '../node_modules/next/router';
 
const Home = () => { 

  const router = useRouter(); 

  useEffect( () => {
    setTimeout( ()=>{
      router.push('/asteroids')},
      3000
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


export default  Home;