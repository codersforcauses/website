import { memo } from 'react'

const services = [
  {
    icon: 'devices',
    title: 'Applications',
    description:
      'Build custom web and mobile applications to engage with your audience'
  },
  {
    icon: 'web',
    title: 'Websites',
    description:
      'Build new websites or optimise existing pages to improve online visibility'
  },
  {
    icon: 'storage',
    title: 'Data Storage',
    description:
      'Design and create databases for efficient information storage and retrieval'
  },
  {
    icon: 'how_to_reg',
    title: 'Consulting',
    description:
      'Empower your organisation through technical knowledge and advice'
  }
]

const Services = () => (
  <div className='grid grid-cols-1 grid-rows-4 gap-8 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>
    {services.map(service => (
      <div key={service.icon} className='px-0 text-center bg-transparent'>
        <span className='material-icons-sharp !text-7xl'>{service.icon}</span>
        <p className='mt-4 font-mono text-2xl font-black'>{service.title}</p>
        <p className='mb-0'>{service.description}</p>
      </div>
    ))}
  </div>
)

export default memo(Services)
