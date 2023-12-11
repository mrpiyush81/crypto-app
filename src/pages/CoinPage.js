import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CrytoState } from '../context/CryptoContext';
import { SingleCoin } from '../config/Api';
import CoinInfo from '../components/CoinInfo';

import axios from 'axios';
import { useEffect } from 'react';

function CoinPage() {
    const {id}=useParams();
    const [coin,setcoin]=useState();
    
    const {currency,symbol}=CrytoState();
    
    const fetchcoin = async ()=>{
      

      try {
        const {data} = await axios.get(SingleCoin(id));
        console.log(data);
        setcoin(data);
      } catch (error) {
        console.log(error)
      }

    }

useEffect(()=>{
      fetchcoin()
    },[id]);
    

  return (
    
    <div className='bg-gray-950 pt-6 lg:px-[50px] flex flex-col lg:flex-row  2xl:px-[200px]  '>

      {coin?( 
        <>
      <div className="sideba flex flex-col  lg:w-[25%]">
            <div className='flex flex-col justify-center items-center'>
            <img src={coin?.image.large} className='h-[150px] w-[150px]' alt={coin?.name} />
            <h1 className='text-4xl mt-5 tracking-wider font-extrabold text-white '>{coin?.name}</h1>
            </div>
            <div className='text-white px-2  text-justify mt-6' dangerouslySetInnerHTML={{ 
                                   __html:coin?.description.en.split(". ")[0]+'.' ,
                              }}/>
           <div>
             <h1 className='text-white px-2 text-[20px] font-bold mt-3'>{"Rank: "}{coin?.market_cap_rank}</h1>
             <h1 className='text-white px-2 text-[20px] font-bold mt-3'>Current Price:{symbol} {coin?.market_data
.current_price[currency.toLowerCase()]}</h1>
             <h1 className='text-white px-2 text-[20px] font-bold mt-3'>{"Market Cap:"}{symbol}{coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)}M</h1>
           </div>
          </div>
          {
           (<div className=' w-1 lg:h-[460px] mt-2 rounded-sm bg-slate-500 mx-4'></div>)
          }
           <div className="chartbar lg:w-[70%]">

             <CoinInfo coin={id}></CoinInfo>
           </div>
           </>
           ):(<div className='text-white text-center  mx-auto w-[80%] text-3xl center'>loading...</div>)
           }
         

    </div>
             
  )
}

export default CoinPage