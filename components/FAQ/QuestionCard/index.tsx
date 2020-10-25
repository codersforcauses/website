/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import { Theme } from 'lib/theme'
import { styles } from './styles'
import { DarkContext } from 'helpers/user'
import { useContext,useState } from 'react'

const ToggleBtn = (props: any)=>{
    const theme = useTheme()
    const isDark = useContext(DarkContext)
    const [isOpen,setIsopen]=  useState(false)

    const toggle = ()=>{
        setIsopen(!isOpen)
    }

    return(
        <Button id="toggler" outline={isDark} color={isDark ? 'secondary' : 'primary'} className='rounded-0' style={{ maxHeight: '3em',minWidth:'40px'}} onClick={toggle}>
            {isOpen? '-':'+'}
        </Button>
    )
}

const QuestionCard = (props: any) => {
    const theme = useTheme()
    const isDark = useContext(DarkContext)

    return (
        <div>
            <Card
                className={`rounded-0 border-0 ${props.className}`}
                css={styles(theme, isDark)}
                >
                <CardBody style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                    similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                    dignissimos esse fuga! Minus, alias.
                    </h4>
                    <ToggleBtn />
                </CardBody>
            </Card>
            
            <UncontrolledCollapse toggler="#toggler">
                <Card
                    className={`rounded-0 border-0 ${props.className}`}
                    css={styles(theme, isDark)}
                    >
                    <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                        dignissimos esse fuga! Minus, alias.
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    )
}

export default QuestionCard
