import React, { useEffect, useState } from "react";
import styles from './Header.module.css';
import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";
import { dateToISOString } from "../../../helpers/dateConverters";
import { getBackGroundImgAPI } from "../../../API/api";
import { AsteroidInListType } from "../../../types";
import { getLiquidationList } from "../../../helpers/localStorageFunctions";
 

const Header = () => {

    const [backgroundImage, setBackgroundImage] = useState(null);

     
    //   asteroids For Liquidation state
    const [asteroidsForLiquidation, setAsteroidsForLiquidation] = useState([] as Array<AsteroidInListType>);


    //   asteroids For Liquidation logic
    useEffect(() => {
        setInterval(()=>{
            setAsteroidsForLiquidation(getLiquidationList())
            }, 1500 
        )
     }, [])


    //    Background Image logic
    useEffect( () => {
        const endDateISO = dateToISOString(new Date())
       
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 7); 
 
        let startDateISO = dateToISOString(startDate);

        const getImg = async (startDate: string, endDate: string) => {
            const resp = await getBackGroundImgAPI(startDate, endDate);
            setBackgroundImage(resp);
        }

        const data = getImg(startDateISO, endDateISO);

    }, [])



    //    redirect logic
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
                                {asteroidsForLiquidation.length > 0 && <span className={styles.liquidateCount}>
                                        {asteroidsForLiquidation.length}
                                    </span>}
                            </a>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;