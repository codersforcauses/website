import { memo } from 'react'
import services from 'data/services.json'

const Service = (props: {
  icon: string
  title: string
  description: string
}) => (
  <div className='px-0 text-center bg-transparent'>
    <span className='text-7xl material-icons-sharp'>{props.icon}</span>
    <p className='mt-4 font-mono text-2xl font-black'>{props.title}</p>
    <p className='mb-0'>{props.description}</p>
  </div>
)

const Services = () => (
  <div className='grid grid-cols-1 grid-rows-4 gap-8 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>
    {services.map(service => (
      <Service key={service.title} {...service} />
    ))}
  </div>
)

export default memo(Services)
