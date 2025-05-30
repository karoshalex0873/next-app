import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)
  return (
    <div className="flex flex-row ">
      {techIcons.slice(0,3).map(({tech,url},index)=>(
        <div 
          key={tech} 
          className={cn('relative group p-2 bg-dark-300 rounded-full hover:bg-dark-400 transition-colors',index >= 1 && `-ml-3`)}
        >
          <span className='tech-tooltip'>{tech}</span>
          <Image 
            src={url} 
            alt={tech} 
            width={24} 
            height={24} 
            className=' object-cover'
          />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons