import React, { useEffect } from 'react'
import axios from 'axios';
import { CrytoState } from '../context/CryptoContext';

import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function CommaNumber(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');  
    }

function Carousel() {
    const [Tredingdata, setTredingdata] = useState([])
    const {currency,symbol}=CrytoState();
   
    const fetchTradingData = async ()=>{
        try {
            const {data}= await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,{crossDomain: true });
            
           console.log(data)
           setTredingdata(data);
         } catch (error) {
            console.log(error)
        }
           
    }
    
    useEffect(()=>{
        fetchTradingData();
   },[currency])
   const responsive={
    0:{
        items:2,
    },
    600:{
        items:4,
    },
}


const items = Tredingdata.map((coin)=>{
let profit=coin.price_change_percentage_24h>=0;
return (
   <Link to={`/coins/${coin.id}`} className=' flex items-center justify-center flex-col'>
    <img  className='h-[80px]' src={coin?.image} alt={coin.name} />
    <span className='text-white uppercase mt-2 text-[15px]'>{coin?.symbol} 
    &nbsp;
    <span className={`font-bold ${profit>0?'text-green-500':'text-red-500'}`} >{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span></span>
    <h1 className='text-white text-[20px]' >{symbol} {CommaNumber(coin?.current_price.toFixed(2))} </h1>
   </Link>
)})


  return (
    <div className=''>
         <AliceCarousel mouseTracking 
         infinite
         autoPlayInterval={1000}
         animationDuration={1500}
         disableDotsControls
         responsive={responsive}
         autoPlay
         disableButtonsControls
        items={items} />
    </div>
  )
}

export default Carousel