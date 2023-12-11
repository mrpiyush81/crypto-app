import React from 'react'

function Setbutton({children,selected,onclick}) {
    
  return (
    <span onClick={onclick} className={`border border-1 mt-2  border-yellow-500  py-2 px-6 rounded-md ${selected?"bg-yellow-500 text-black":'text-white'} cursor-pointer mx-10`}>{children}</span>
  )
}

export default Setbutton