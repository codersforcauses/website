import Image from 'next/image'
import clients from '@data/clients.json'
import { useTheme } from 'next-themes'

const width = clients.reduce(
  (val, { width }) => val + width,
  clients.length * 16 * 6
)

const ClientSlider = () => {
  const { resolvedTheme: theme, setTheme } = useTheme()

  return (
    <div
      className='h-[100px] overflow-hidden flex animate-slide'
      style={{ width: width * 2 }}
    >
      {[1, 2].map(count => (
        <div key={count} className='flex space-x-24' style={{ width }}>
          {clients.map(({ logo, name, width, dark_logo }) => (
            <div key={name} className={`h-[100px] w-[${width}px]`}>
              <Image
                src={
                  'dark' === theme ? logo : dark_logo === '' ? logo : dark_logo
                }
                alt={`${name} Logo`}
                title={`${name} Logo`}
                height={100}
                width={width}
                className='transition duration-300 grayscale contrast-[0.2] brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100'
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ClientSlider
