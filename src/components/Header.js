import React from 'react'
import { CrytoState } from '../context/CryptoContext';
import { useNavigate } from 'react-router-dom';
function Header() {
  const Navigate=useNavigate();
    const {currency,setcurrency}=CrytoState();
  return (
    <div className='bg-zinc-900 sticky z-10 top-0'>

<div className='flex  justify-evenly h-[60px] lg:px-[50px]  lg:justify-between 2xl:px-[200px]  items-center'>
          <span className='text-[20px] font-extrabold cursor-pointer text-yellow-500 sm:text-[20px] lg:[15px] xl:[10px]' onClick={()=> Navigate('/')}>Crypto-hunt</span>
        <div>
              <select name="\" id="" 
              className='bg-zinc-900 text-slate-300  border-2 w-20  py-1 px-2 rounded-md' 
              value={currency} onChange={(e)=> setcurrency(e.target.value) } >
                <option value="USD" className='' >USD</option>
                <option value="INR" className=''>INR</option>
            </select>
        </div>
                </div>
    </div>
  )
}

export default Header