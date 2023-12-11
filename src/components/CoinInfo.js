import React, { useEffect, useState } from 'react'
import {CrytoState } from '../context/CryptoContext';
import { HistoricalChart } from '../config/Api';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/chartdata';
import axios from 'axios';
import Setbutton from './Setbutton';
import { 
 Chart as  ChartJS,
 LineElement,
 PointElemnt,
 CategoryScale,
 Tooltip,
 Legend,
 LinearScale,
 PointElement
} from 'chart.js'
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
function CoinInfo({coin}) {
    const [historicalData,setHistoricaldata]=useState([]);
    const [days,setdays]=useState(1);
    const {currency}=CrytoState('bitcoin');
    console.log(days)
    const fetchhistoricalData = async ()=>{
        console.log(coin);
        
  
        try {
          const {data} = await axios.get(HistoricalChart(coin,days,currency));
         setHistoricaldata(data.prices);
         console.log('dta',data)
        } catch (error) {
          console.log(error)
        }
  
      }

      useEffect(()=>{
        fetchhistoricalData()
      },[currency,days]);

  return (
    <div>
        <div>
            {
                !historicalData?('Loading...'):(
                    <div >
                    <Line data={{
                        labels:historicalData.map((coin)=>  {
                            let date = new Date(coin[0]);
                            let time = date.getHours()>12 ? `${date.getHours()-12}:${date.getMinutes()} PM`
                            :`${date.getHours()}:${date.getMinutes()} AM`

                            return days===1? time : date.toLocaleDateString();  
                        }),
                        datasets:[{
                            data:historicalData.map((coin)=> coin[1]),
                            label:`Price ( Past ${days} Days ) in ${currency} `,
                            borderColor:'rgb(234 179 8)',
                            borderWidth: 2,
                            pointRadius: 0.5,
                        }
                        ]
                    }}
                    
                    options={{
                      elements:{
                            point:{
                                redius:1,
                            }
                        }
                    }}
                    >

                    </Line>
                    <div className='mt-6 flex flex-col pb-10 lg:flex-row'>
                          {
                            chartDays.map((day)=>{
                                return (
                                    <Setbutton className='mx-10 ' key={day.value} onclick={()=> setdays(day.value)} selected={day.value===days} >{day.label}</Setbutton>
                                )
                            })
                          }
                    </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default CoinInfo