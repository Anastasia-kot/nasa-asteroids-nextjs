import React, { useEffect, useRef, useState } from "react";
// import { dateToYesterday } from "../../helpers/dateConverters.ts";
import styles from './Header.module.css';
import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";
// import Image from "../../node_modules/next/image";
 


// export const getStaticProps = async () => {
//     // const resp = await fetch('https://api.nasa.gov/planetary/apod?start_date=2022-08-16&end_date=2022-08-16&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW');
//     const resp = await fetch('https://api.nasa.gov/planetary/apod?api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW');
//     // console.log(resp)

//     const data = await resp[0].json();
//     // console.log(data)

//     if (!data) {
//         return { notFound: true }
//     }

//     return {
//         props: { backgroundImage: data.url }
//     }
// }


  


const Header = () => {

    let [backgroundImage, setBackgroundImage] = useState(null);

     useEffect(    ()=> { 
        
         fetch('https://api.nasa.gov/planetary/apod?start_date=2022-08-16&end_date=2022-08-16&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW')
            .then(response => response.json())
            .then(commits => {
                    setBackgroundImage(commits[0].url);
            });
    }, [] )

const {pathname} = useRouter(); 

    return( 
        <div className={styles.HeaderWrapper}>
            {backgroundImage &&  
                    <img src={backgroundImage} alt='universe' width='100%' height='auto' className={styles.HeaderImg} />
            }
            
                
 
        <div className={styles.Header}>
            <div className={styles.CompanyInfoWrapper}>
                <div className={styles.CompanyName}>Armageddon v2</div>
                <div className={styles.CompanyAbout}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</div>
            </div>
            <div className={styles.LinksWrapper}>
                    <Link href='/asteroids'>
                        <a className={pathname === '/asteroids' ? styles.LinkActive : styles.Link}>
                            Астероиды
                        </a>
                    </Link>
                    <Link href='/liquidation'>
                        <a className={pathname === '/liquidation' ? styles.LinkActive : styles.Link}>
                            Заказ
                        </a>
                    </Link>
            </div>
        </div>
        </div>
    )
}

export default Header;