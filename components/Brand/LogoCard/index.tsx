import Image from 'next/image'

const LogoCard = (props: {
  dark?: boolean
  main?: boolean
  svg: string
  png: string
}) => (
  <div
    className={[
      'border border-primary flex flex-col',
      props.dark ? 'bg-primary text-secondary' : 'bg-secondary text-primary'
    ]
      .join(' ')
      .trim()}
  >
    <div className='flex items-center justify-center flex-grow h-24 p-2 md:p-4 md:h-56'>
      <div className='relative w-2/3 h-full'>
        <Image src={props.svg} alt='CFC logo' layout='fill' />
      </div>
    </div>
    <div className='flex items-center p-1 text-sm sm:px-2 md:px-3'>
      <span className='flex-grow'>
        <a href={props.png} download className='flex self-center'>
          <span className='material-icons-sharp'>get_app</span>
        </a>
      </span>
      <a href={props.svg} download className='hover:underline'>
        .svg
      </a>
      &emsp;
      <a href={props.png} download className='hover:underline'>
        .png
      </a>
    </div>
  </div>
)

export default LogoCard
