import React, { useEffect, useState } from "react";
import styles from './Header.module.css';
import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";
import { dateToISOString } from "../../helpers/dateConverters";
 


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


    // let getImage = async (date: Date) => {
    //     let dateToString = date.toISOString().split('T')[0];
    //     const resp = await fetch(`https://api.nasa.gov/planetary/apod?
    //             start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`)
    //     const data = await resp.json();
    //     console.log(data)
    //     return data
    // }

    // let [backgroundImage, setBackgroundImage] = useState(null);
    // // let [backgroundImageType, setBackgroundImageType] = useState(null);


    // useEffect(() => { 
    //     let date = new Date();
    //     getImage(date)
    //     .then (        setBackgroundImage(date[0].url)      )


    // },[])

















    // let [backgroundImage, setBackgroundImage] = useState(null);
    // let [backgroundImageType, setBackgroundImageType] = useState(null);

    // let getImage =  (date: Date) => {
    //     let dateToString = date.toISOString().split('T')[0];
    //     return fetch(`https://api.nasa.gov/planetary/apod?
    //             start_date=${dateToString}&end_date=${dateToString}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`)
    //         .then(response => response.json())
    //         .then(commits => {
    //             setBackgroundImage(commits[0].url);
    //             setBackgroundImageType(commits[0].media_type);
    //             return backgroundImageType
    //         })
    // }

    // let date = new Date();
    // while (backgroundImageType != 'image') {
    //     getImage(date);

    // }











    let [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        let endDateISO = dateToISOString(new Date()) 
        
        let startDate = new Date();
        startDate.setDate(startDate.getDate() -7); 
 
        let startDateISO = dateToISOString(startDate);

        
        
        fetch(`https://api.nasa.gov/planetary/apod?start_date=${startDateISO}&end_date=${endDateISO}&api_key=ceNew9zKnInO2vohN90DJaUwLHItH6I8ZjahzfbW`)
            .then(response => response.json())
            .then(commits => {

                commits.reverse();
                for (const commit of commits) {
                    console.log(commit);
                    if (commit.media_type === "image") {
                        setBackgroundImage(commit.url);
                        break;
                    }
                }
            
            });
    }, [])




const {pathname} = useRouter(); 



    return( 
        <div className={styles.HeaderWrapper}>
            {backgroundImage &&  
                <img className={styles.HeaderImg} src={backgroundImage} alt='universe' width='100%' height='auto'  /> 
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