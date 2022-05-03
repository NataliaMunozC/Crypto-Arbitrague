import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Landing.module.css'


export default function InitialPage() {

//  let dispatch=useDispatch();
  /* useEffect(() => {// 
    
     
},[]);  */
  return (
   <React.Fragment>
    <nav className={styles.container}>
      <Link className={styles.link} to ='/home'>
        <button  className={styles.button}>Cripto Arbitrague: 
          <br /> Let´s start!
        
        </button>
      </Link>
    </nav>
    </React.Fragment>  
    
  

  )
};
