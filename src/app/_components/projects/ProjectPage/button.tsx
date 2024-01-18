import Link from "next/link"

const WebsiteButton = ({ link, text }: ButtonType) => (
  <Link
    href={link}
    target="_blank"
    rel="noreferrer"
    className="grid place-items-center border border-primary bg-transparent px-3 py-2 font-mono text-sm font-black text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary dark:focus:bg-white dark:focus:text-primary md:px-4 md:text-lg"
  >
    {text}
  </Link>
)

interface ButtonType {
  link: string
  text: string
}

export default WebsiteButton
