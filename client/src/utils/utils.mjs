import axios from "axios";

const binanceCryptos =async()=>
{
    let response = await axios.get ('https://api.binance.com/api/v3/ticker/price');
    
    return (response.data.map(e=>e.symbol));
}
 const kucoinCryptos =async()=>
{
    let response = await axios.get (`https://api.kucoin.com/api/v1/market/allTickers`);
    return (response.data.data.ticker.map(e=>(e.symbol)));

}

export const symbolsArray=async()=>{
    let kucoin= await kucoinCryptos();
    let binance =await binanceCryptos();
    let total=[]
    for (let i=0; i<kucoin.length; i++ ){
        for(let j=0; j<binance.length; j++){
            if (kucoin[i].replace('-','')===binance[j]) total.push(kucoin[i])
            j++;
        }
        i++;
}
 total.splice(10)
 //console.log(total)
return total;

};
export const cryptosToShow =[
    'NKN-USDT',  'KNC-USDT',
    'AGLD-USDT', 'SYS-BTC',
    'LINA-USDT', 'WBTC-ETH',
    'ETH-DAI',   'CELO-USDT',
    'SAND-USDT', 'T-USDT'
  ];
 export const images=[
     {NKN:"https://tokens.1inch.io/0x5cf04716ba20127f1e2297addcf4b5035000c9eb.png"},
     {USDT: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png"},
     {LINA: "https://tokens.1inch.io/0x3e9bc21c9b189c09df3ef1b824798658d5011937.png"},
     {ETH:"https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"},
     {DAI: "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png"},
     {SAND:"https://tokens.1inch.io/0x3845badade8e6dff049820680d1f14bd3903a5d0.png"},
     {KNC: "https://tokens.1inch.io/0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png"},
     {BTC: "https://tokens.1inch.io/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png"},
     {KNC: "https://tokens.1inch.io/0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png"}, 
     {WBTC: "https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"}, 
      

    ] ;

const binancePrice =async (symbol)=>

{
    
    let response =  await axios.get (`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    let {bidPrice, askPrice}= response.data;

    
    return {bid:bidPrice,ask:askPrice};
   

}
const kucoinPrice =async (symbol)=>
{
 
    //let response =  await axios.get (`https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`)
    let response =  await axios.get (`http://localhost:3001/kucoin?symbol=${symbol}`)
   
    let {bestBid, bestAsk}= response.data.data;
    
    return {bid:bestBid,ask:bestAsk};
   

}

 export const  periodicPrice= async(exchange, symbol)=>{
    let response;
    if (exchange==='binance'){
    //setInterval(async () => console.log( await  binancePrice(cryptosToShow[0].replace('-','')),"binance"),30000);
    response= await  binancePrice(symbol.replace('-',''));
    }else {
    //setInterval(async () =>  console.log( await  kucoinPrice(cryptosToShow[0]), "kucoin"),30000);
    response= await  kucoinPrice(symbol);
    }
    return response;

}; 
/* periodicPrice("binance",'NKN-USDT').then((v)=>console.log(v));
periodicPrice("kucoin",'NKN-USDT').then((v)=>console.log(v));  */

