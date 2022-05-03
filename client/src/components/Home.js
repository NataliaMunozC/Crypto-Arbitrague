import {React, useState, useEffect} from "react";
import styles from './Home.module.css'
import Card from "./CryptoCard";
import { cryptosToShow } from "../utils/utils.mjs";
import {images}  from "../utils/utils.mjs";
import { periodicPrice } from "../utils/utils.mjs";

export default function Home() {
   
  
  let obj={};
    cryptosToShow.forEach(e => {
        obj[e]='';
        
    });
    const[binancePrice, setBinancePrice] = useState(obj);
    const[kucoinPrice, setCukoinPrice] = useState(obj);
    const[update, setUpdate] = useState(false);

    setInterval(() => {
      setUpdate(true);  
  }, 30000)
 
    useEffect( () => {
       cryptosToShow.forEach( async c => {
          let priceB =await periodicPrice('binance', c);
          setBinancePrice((prevState)=>{
            const newState ={
              ...prevState,
              [c]: priceB
            }
            return newState;
         })  
         let priceC =await periodicPrice('cukoin', c);
          setCukoinPrice((prevState)=>{
            const newState ={
             ...prevState,
              [c]: priceC
            }
            return newState;
         })  
         
       }); 
       setUpdate(false);
       console.log(update);        
    },[update]);

       
        return ( 
         <div className={styles.container}>
             <h1>CRYPTO ARBITRAGUE</h1>
             <div className={styles.cards}> 
            {cryptosToShow.map((e,i)=>{
          
             let array=e.split('-'); 
             let img1=images.find(e=>e[array[0]]);
             let img2=images.find(e=>e[array[1]]);
          
            return( 
            <Card
                         key={i}
                         pair={e}
                         bidB={binancePrice[e].bid}
                         askB={binancePrice[e].ask}
                         bidK={kucoinPrice[e].bid}
                         askK={kucoinPrice[e].ask}
                         image1={img1?img1[array[0]]:''}
                         image2={img2?img2[array[1]]:''}

                         

            />
            )

            

        })};
            </div>  
        </div>                 

       )       
};

          
    
    