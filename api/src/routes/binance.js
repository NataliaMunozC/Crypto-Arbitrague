const express = require ('express');
const { Router } = require('express');
const axios = require ('axios');

const router= Router ();

router.get ('/', async (req, res)=>{
    
    try{
        let {symbol} =req.query;
        if (symbol){

        let response =  await axios.get (`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        res.json(response.data);
        }else{
         let all =   await axios.get (`https://api.binance.com/api/v3/ticker/price`)
         res.json(all.data);
        }
        
    }catch(e){
        console.log(e)
    }

})

module.exports =router;