const { Router } = require('express');
const axios = require ('axios');

const router= Router ();

router.get ('/', async (req, res)=>{
    
    try{
        let {symbol} =req.query;
        if (symbol){

        let response =  await axios.get (`https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`)
    
        response?
        res.status(200).send(response.data):res.status(400);
        }else{
         let all =   await axios.get (`https://api.kucoin.com/api/v1/market/allTickers`);
         let symbols =all.data.data.ticker.map(e=>e.symbol); 
         res.json(symbols);
        }
        
    }catch(e){
        console.log(e)
    }

})

module.exports =router;