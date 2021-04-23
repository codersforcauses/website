/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext } from 'react'
import { Card, CardTitle } from 'reactstrap'
import Link from 'next/link'
import Image from 'next/image'
import projects from 'data/projects.json'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

const ProjectCards = () => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <div css={styles(theme, isDark)}>
      {projects.map(project => (
        <div
          key={project.name}
          className='align-items-center justify-content-center'
        >
          <Link href={project.purl}>
            <a className='text-decoration-none'>
              <Card className='secondary-bg rounded-0 border-0'>
                <div className='position-relative project-img'>
                  <Image
                    src={`/projects/${project.logo}`}
                    alt={project.client}
                    layout='fill'
                    objectFit='contain'
                    quality={90}
                  />
                </div>
                <div className='d-flex align-items-center'>
                  <div className='bg-primary'>
                    <i className='material-icons-sharp text-secondary p-3'>
                      {project.icon}
                    </i>
                  </div>
                  <CardTitle
                    className={`font-weight-bold ml-3 mb-0 text-${
                      isDark ? 'secondary' : 'primary'
                    } text-monospace`}
                  >
                    {project.name}
                  </CardTitle>
                </div>
              </Card>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProjectCards
