const WebsiteButton = ({ link, text }: ButtonType) => (
  <a
    href={link}
    target='_blank'
    rel='noreferrer'
    className='grid px-3 py-2 font-mono text-sm font-black bg-transparent border md:px-4 md:text-lg place-items-center border-primary text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-primary dark:focus:bg-secondary dark:focus:text-primary focus:outline-none'
  >
    {text}
  </a>
)

interface ButtonType {
  link: string
  text: string
}

export default WebsiteButton
