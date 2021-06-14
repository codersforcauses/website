import BrandIcon from '@components/Elements/BrandIcons'

const TechList = ({ data }: TechListProps) => (
  <div className='grid grid-cols-2 gap-4'>
    {data.map((tech: Tech) => (
      <div
        key={tech.name}
        className='flex items-center space-x-3 font-mono md:space-x-4'
      >
        <BrandIcon
          icon={tech.icon}
          dimensions={32}
          className='text-4xl fill-current'
        />
        <p className='md:text-xl'>{tech.name}</p>
      </div>
    ))}
  </div>
)

export interface Tech {
  name: string
  icon: string
}
interface TechListProps {
  data: Array<Tech>
}

export default TechList
