'use client';
import { ProjectCard } from '@/app/_components'
import React from 'react'

const toggleAccordion = (accordBtn: any) => {
  let accordionContent = accordBtn.parentNode.childNodes[1];
  console.log(accordBtn.parentNode.childNodes)
  accordionContent.classList.toggle('hidden');
}

const Administrate = () => {
  return (
    <div>
      Administration
      <div>
        <button className="border-solid" onClick={(e)=>{toggleAccordion(e.target)}}>Section 1</button>
        <div className="hidden" id='accordion_1'>
          <p>Lorem ipsum...</p>
        </div>
      </div>

      <div>
        <button className="border-solid">Section 2</button>
        <div className="accordion_1 hidden">
          <p>Lorem ipsum...</p>
        </div>
      </div>

      <div>
        <button className="border-solid hidden">Section 3</button>
        <div className="accordion_1">
          <p>Lorem ipsum...</p>
        </div>
      </div>
      
    </div>
  )
}

export default Administrate