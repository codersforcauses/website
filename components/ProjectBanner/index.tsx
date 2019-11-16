import React from 'react'
import style from './style'

export default ({ imageSrc }: BannerProp) => (
  <div>
    {style}
    <img src={imageSrc} className='banner' alt='Ignite Banner' />
  </div>
)

interface BannerProp {
  imageSrc: string
}
