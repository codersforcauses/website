import { memo } from 'react'
import services from 'data/services.json'

const Services = () => (
  <div className='grid grid-cols-1 grid-rows-4 gap-8 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>
    {services.map(service => (
      <div key={service.icon} className='px-0 text-center bg-transparent'>
        <span className='material-icons-sharp' style={{ fontSize: '4.5rem' }}>
          {service.icon}
        </span>
        <p className='mt-4 font-mono text-2xl font-black'>{service.title}</p>
        <p className='mb-0'>{service.description}</p>
      </div>
    ))}
  </div>
)

export default memo(Services)
