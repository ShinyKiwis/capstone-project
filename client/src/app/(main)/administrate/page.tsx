'use client';
import React, { useState } from 'react'

const toggleAccordion = (accordBtn: any) => {
  let accordionContent = accordBtn.parentNode.childNodes[1];
  console.log(accordBtn.parentNode.childNodes)
  accordionContent.classList.toggle('hidden');
}

const Administrate = () => {

  return (
    <div>
      Administration. Below is for testing dropdowns, remove later...
      <div>
        <button className="border-solid border" onClick={(e)=>{toggleAccordion(e.target)}}>Section 1</button>
        <div className="hidden" id='accordion_1'>
          <p>Lorem ipsum...</p>
        </div>
      </div>    


      <button 
        className="px-4 py-2 font-semibold text-sm bg-blue text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-300 delay-150"
        onClick={()=>{
          let expand = document.getElementById('textExpand');
          if (expand) {
            if (expand.style.maxHeight == '0px'){
              expand.style.maxHeight = '10em';
              // expand.style.display = 'block';
            }
            else{
              expand.style.maxHeight = '0px';
              // expand.style.display = 'none';
            }
          }
        }}
      >
        Expand
      </button> 
      <div 
        className='w-96 h-96 bg-gray ease-in-out duration-300' 
        id="textExpand" 
        style={{maxHeight:'0px', overflow:'hidden'}}
      >
        Expanded content
      </div>

    </div>
  )
}

export default Administrate