import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/Api';
import { CrytoState } from '../context/CryptoContext';
import axios from 'axios';
import LinearProgress from '../loader/LinearProgress'
import {  useNavigate } from 'react-router-dom';
import { CommaNumber } from './Carousel';
function CoinTable() {
  const [coins,setcoins]=useState([]);
  const [searchdata,setsearchdata]=useState('');
   const [loading,setloading]=useState(false);
   const {currency,symbol}=CrytoState();
const navigate=useNavigate();
   const fetchCoins= async()=>{
    
    try { 
        // setloading(true);
        const {data}=await axios.get(CoinList(currency),{ crossDomain: true });
        setcoins(data);
        setloading(false);
    } catch (error) {
        console.log(error)
    }
   
   }
   console.log('coins',coins )
useEffect(()=>{
    fetchCoins();
},[currency])

function handleSearch(){
    
    return coins.filter((coin)=>
    coin.name.toLowerCase().includes(searchdata)||
    coin.symbol.toLowerCase().includes(searchdata)
    )

}
console.log(handleSearch());
  return (
    <div className='bg-zinc-900 lg:px-[50px]  2xl:px-[200px] '>
        <div className="container w-[90%] mx-auto">
            <h1 className='text-center text-white  pt-3 text-3xl tracking-wide'>Cryptocurrency Prices by Market Cap</h1>
            <input type="search" className='w-full bg-zinc-900 boed text-white border border-1 p-3 mt-4 border-slate-600 rounded-md' name="" placeholder='Search For a Crypto Currency...' onChange={(e)=>{setsearchdata(e.target.value)}} id="" />
            <div className="tablecontainer mt-6 flex justify-center items-center">
                {
                    loading?(
                        <LinearProgress></LinearProgress>
                    ):(
                        <table className=" sm:w-full text-sm text-left rtl:text-right bg-zinc-900 ">
                        <thead className="text-xs text-black bg-yellow-500 uppercase ">
                            <tr>
                                <th scope="col" className="py-1 px-2 sm:text-base text-[10px] sm:px-6 sm:py-4 font-bold">
                                    Coin
                                </th>
                                <th scope="col" className="py-1 px-2  text-[10px] sm:text-base sm:px-6 sm:py-4 font-bold">
                                    price
                                </th>
                                <th scope="col" className=" py-1 px-2 text-[10px] sm:text-base sm:px-6 sm:py-4 font-bold">
                                    24h Change
                                </th>
                                <th scope="col" className=" py-1 px-2 text-[10px] sm:text-base sm:px-6 sm:py-4 font-bold">
                                    Market Cap
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-zinc-900'>
                            {
                                handleSearch().map((row)=>{
                                    let profit=row.price_change_percentage_24h>=0;
                                  return (
                                      <tr className="bg-zinc-900 border-b border-gray-500" onClick={()=> navigate(`/coins/${row.id}`)}  key={row.name} >
                                <th scope="row" className="py-1 pl-1 sm:px-6 sm:py-4 font-medium flex flex-col sm:flex-row whitespace-nowrap cursor-pointer">
                                <img src={row?.image} alt={row.name} className='
                                h-[25px] w-[25px] sm:h-[50px] sm:w-[50px]'  />
                                  <div className='sm:flex sm:flex-col sm:ml-2 sm:py-1 cursor-pointer'>
                                    <div className='text-gray-100  sm:w-auto uppercase cursor-pointer text-[12px] sm:text-[20px]'>{row.symbol}</div>
                                    <div className='text-gray-300 -mt-2 w-4 text-[9px] sm:text-[13px] sm:mt-1 cursor-pointer'>{row.name}</div>
                                  </div>
                                </th>

                                <td className="text-[8px]  sm:px-6 sm:py-4 sm:text-base font-bold cursor-pointer text-gray-100">
                                {symbol} {CommaNumber(row?.current_price.toFixed(2))}
                                </td>
                                <td className={`font-bold text-[8px] sm:px-6 sm:text-base  sm:py-4 cursor-pointer ${profit>0?'text-green-500':'text-red-500'}`}>
                                   {profit && "+"} {row?.price_change_percentage_24h?.toFixed(2)}%
                                </td>
                                <td className="sm:px-6 text-[8px] font-bold sm:text-base  sm:py-4 cursor-pointer text-gray-100">
                                {symbol} {CommaNumber(row?.market_cap.toString().slice(0,-6))}M
                                </td>
                                      </tr>
                                  )

                                })
                            }
                            </tbody>
    </table>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default CoinTable