import React from "react";
import styles from './CryptoCard.module.css';
import { useState } from "react";
import Swal from 'sweetalert2';


export default function Card ({pair, bidB, askB, bidK, askK, image1, image2}){
  
    let [hide, SetHide]= useState(false);
    let coin1=pair.split('-')[1];
    let coin2=pair.split('-')[0];
    let profita= (bidB-askK)*1000;
    let profitb= (bidK-askB)*1000;
  
    return (
        <div className={styles.container}>
            <span className={styles.images}>
            <img className={styles.img} src={image1?image1:"" }  />
            <img className={styles.img} src={image2?image2:"" }  />
            </span>
                 <h3>{pair}</h3>
          <div className={styles.exchanges}>    
            <div className={styles.exchange}> <b>Binance</b>
              <br></br>
            <div className={styles.bidAsk}>  
            <div className={styles.bid}><b>bid</b>{bidB}</div>
            <div> <b>ask</b>{askB} </div>
            </div> 
            </div>

             <div className={styles.exchange}> <b>Kucoin</b> 
                <br></br>
                <div className={styles.bidAsk}> 
                <div className={styles.bid}><b>bid</b>{bidK}</div>
                <div> <b>ask</b>{askK} </div>             
                </div>
             </div>
          </div> 
          
          
          { (profita>0 || profitb>0) && !hide && 
          <button className={styles.arbitrague} onClick={()=>
                {Swal.fire({
                    title: 'There is an arbitrague opportunity!!!',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Take it!',
                    denyButtonText: `No, thanks!`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire(`Your profit is ${profita>0?profita:profitb} ${coin1} per ${coin2}`, '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Changes are not saved', '', 'info')
                    };
                

                   });
                   SetHide(true);
                   
                
                }
    
                
                }  >
              There´s an arbitrague oportunity!!!
              
              </button>}       
         
         
        </div>
          
    )
}   