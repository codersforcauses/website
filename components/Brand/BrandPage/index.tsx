import { useState } from 'react'
import Title from 'components/Utils/Title'
import LogoCard from '../LogoCard'
import ColourCard from '../ColourCard'

const BrandPage = () => {
  const [typographyText, setTypographyText] = useState('Coders for Causes')

  return (
    <>
      <Title typed>./branding</Title>
      <div className='bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 py-12 mx-auto space-y-12 md:py-24'>
          <div>
            <h2 className='pb-2 font-mono text-3xl font-black'>Our Logo</h2>
            <p className='mb-4'>
              Please do not edit, change, distort, re-colour, or reconfigure the
              Coders for Causes logo.
            </p>
            <div className='grid grid-cols-2 gap-2 md:gap-4'>
              <LogoCard
                dark
                main
                svg='/logo/cfc_logo_white_full.svg'
                png='/logo/cfc_logo_white_full.png'
              />
              <LogoCard
                main
                svg='/logo/cfc_logo_black_full.svg'
                png='/logo/cfc_logo_black_full.png'
              />
            </div>
          </div>
          <div>
            <h3 className='pb-2 font-mono text-2xl font-black'>
              Alternate Logos
            </h3>
            <p className='mb-4'>
              If possible, we prefer you use our full logo. If not, we have
              provided alternate logos for you to use.
            </p>
            <div className='grid grid-cols-3 gap-2 md:gap-4'>
              <LogoCard
                dark
                svg='/logo/cfc_logo_white.svg'
                png='/logo/cfc_logo_white.png'
              />
              <LogoCard
                dark
                svg='/logo/cfc_logo_black_square.svg'
                png='/logo/cfc_logo_black_square.png'
              />
              <LogoCard
                dark
                svg='/logo/cfc_logo_black_circle.svg'
                png='/logo/cfc_logo_white_circle.png'
              />
              <LogoCard
                svg='/logo/cfc_logo_black.svg'
                png='/logo/cfc_logo_black.png'
              />
              <LogoCard
                svg='/logo/cfc_logo_white_square.svg'
                png='/logo/cfc_logo_white_square.png'
              />
              <LogoCard
                svg='/logo/cfc_logo_white_circle.svg'
                png='/logo/cfc_logo_white_circle.png'
              />
            </div>
          </div>
          <div>
            <h2 className='pb-2 font-mono text-3xl font-black'>Typography</h2>
            <p className='mb-4'>
              You can test our fonts below. Click on the text to edit it.
            </p>
            <div className='grid grid-cols-2 gap-2 md:gap-4'>
              <div className='p-4 font-mono border border-primary dark:border-secondary'>
                <div className='flex items-center justify-between mb-2'>
                  <strong>IBM Plex Mono</strong>
                  <a
                    href='https://fonts.google.com/specimen/IBM+Plex+Mono'
                    target='_blank'
                    rel='noreferrer noopener'
                    title='Link to font'
                  >
                    <span className='flex self-center material-icons-sharp'>
                      link
                    </span>
                  </a>
                </div>
                <textarea
                  data-gramm={false}
                  value={typographyText}
                  className='w-full h-12 p-0 text-3xl bg-transparent border-0 resize-none'
                  onChange={({ target: { value } }) => setTypographyText(value)}
                />
              </div>
              <div className='p-4 font-mono border border-primary dark:border-secondary'>
                <div className='flex items-center justify-between mb-2'>
                  <strong>IBM Plex Sans</strong>
                  <a
                    href='https://fonts.google.com/specimen/IBM+Plex+Sans'
                    target='_blank'
                    rel='noreferrer noopener'
                    title='Link to font'
                  >
                    <span className='flex self-center material-icons-sharp'>
                      link
                    </span>
                  </a>
                </div>
                <textarea
                  data-gramm={false}
                  value={typographyText}
                  className='w-full h-12 p-0 text-3xl bg-transparent border-0 resize-none'
                  onChange={({ target: { value } }) => setTypographyText(value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className='pb-2 font-mono text-3xl font-black'>Our colours</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <ColourCard
                color='#000000'
                name='All Black (Primary)'
                className='text-secondary bg-primary'
              />
              <ColourCard
                color='#ffffff'
                name='All White (Secondary)'
                className='text-primary bg-secondary'
              />
              <ColourCard
                color='#01f1cc'
                name='Electric Teal (Accent)'
                className='text-primary bg-accent'
              />
              <ColourCard
                color='#0070F3'
                name='Ocean Blue (Success)'
                className='text-secondary bg-success'
              />
              <ColourCard
                color='#F5A623'
                name='Signal Yellow (Warning)'
                className='text-secondary bg-warning'
              />
              <ColourCard
                color='#ff0000'
                name='Red Alert (Alert)'
                className='text-secondary bg-danger'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrandPage
