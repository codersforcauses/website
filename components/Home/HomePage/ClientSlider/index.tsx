import Image from 'next/image'
import foodbank from 'public/clients/foodbank_logo.svg'
import anglicare from 'public/clients/anglicare_logo.svg'
import ignite from 'public/clients/ignite_logo.svg'
import p2s from 'public/clients/p2s_logo.svg'
import wais from 'public/clients/wais_logo.svg'
import fog from 'public/clients/fog_logo.svg'

const clients = [
  {
    src: foodbank,
    alt: 'Foodbank WA logo',
    width: 140,
    className: 'w-[140]'
  },
  {
    src: wais,
    alt: 'WAIS logo',
    width: 250,
    className: 'w-[250]'
  },
  {
    src: anglicare,
    alt: 'Anglicare WA logo',
    width: 100,
    className: 'w-[100]'
  },
  {
    src: fog,
    alt: 'Friends of Grounds logo',
    width: 180,
    className: 'w-[180]'
  },
  {
    src: ignite,
    alt: 'Ignite logo',
    width: 100,
    className: 'w-[100]'
  },
  {
    src: p2s,
    alt: 'P2S RugbyWorks logo',
    width: 200,
    className: 'w-[200]'
  }
]

const width = clients.reduce(
  (val, { width }) => val + width,
  clients.length * 16 * 6
)

const ClientSlider = () => (
  <div
    className='h-[100px] overflow-hidden flex animate-slide'
    style={{ width: width * 2 }}
  >
    {[1, 2].map(count => (
      <div key={count} className='flex space-x-24' style={{ width }}>
        {clients.map(({ alt, className, ...client }) => (
          <div key={alt} className={`h-[100px] ${className}`}>
            <Image
              {...client}
              alt={alt}
              title={alt}
              height={100}
              className='transition duration-300 grayscale contrast-[0.2] brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100'
            />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default ClientSlider
