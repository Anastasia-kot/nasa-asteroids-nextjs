import styles from './Button.module.css';
import { FC } from 'react';
  
type PropsType= {
    text:string
    onClickFunction: ()=> void
}
 
const Button: FC<PropsType> = ({ text, onClickFunction }) => (
     
        <button 
            className={styles.button}
            onClick={() => { onClickFunction()  }}  >
            {text}
        </button>
    
)

export default Button;

