import BrandIcon from '@elements/BrandIcons'
import simpleIcon from 'simple-icons'

const TechList = ({ icons }: TechListProps) => (
  <div className='grid grid-cols-2 gap-4'>
    {icons.map(icon => (
      <div
        key={icon}
        className='flex items-center space-x-3 font-mono md:space-x-4'
      >
        <BrandIcon
          icon={icon}
          dimensions={32}
          className='text-4xl fill-current'
        />
        <p className='md:text-xl'>{simpleIcon.Get(icon).title}</p>
      </div>
    ))}
  </div>
)
interface TechListProps {
  icons: Array<string>
}

export default TechList
