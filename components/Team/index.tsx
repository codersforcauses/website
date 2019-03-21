import React, { Component } from 'react'
import { Col, CardDeck } from 'reactstrap'
import CardItem, { CardItemContent } from './CardItem'

export default class CommitteeCard extends Component {
  committee: CardItemContent[] = [
    {
      name: 'Jeremiah Pinto',
      position: 'President',
      about: '',
      social: {
        email: 'president@codersforcauses.org',
        discord: 'Smooth Jezz',
        github: {
          name: 'JeremiahPinto',
          href: 'https://github.com/JeremiahPinto'
        },
        linkedin: {
          name: 'Jeremiah Pinto',
          href: 'https://www.linkedin.com/in/jeremiah-pinto-3b5201160/'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC President'
      }
    },
    {
      name: 'Drew Alexander',
      position: 'Vice President',
      about: '',
      social: {
        email: 'vicepresident@codersforcauses.org',
        discord: 'Drubi',
        github: {
          name: 'DrewAlexander98',
          href: 'https://github.com/DrewAlexander98'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC Vice-President'
      }
    },
    {
      name: 'Ekin Bukulmez',
      position: 'Secretary',
      about: '',
      social: {
        email: 'secretary@codersforcauses.org',
        discord: 'Elysian',
        github: {
          name: 'ekinbukulmez',
          href: 'https://github.com/ekinbukulmez'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC Secretary'
      }
    },
    {
      name: 'David Yu',
      position: 'Treasurer',
      about: '',
      social: {
        email: 'treasurer@codersforcauses.org',
        discord: 'davidyu112311234',
        github: {
          name: 'noobling',
          href: 'https://github.com/noobling'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC Treasurer'
      }
    },
    {
      name: 'Innocent Muisha',
      position: 'Client Officer',
      about: '',
      social: {
        email: 'clientofficer@codersforcauses.org',
        discord: 'Eagle-i',
        github: {
          name: 'innocentmm',
          href: 'https://github.com/innocentmm'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC Client Officer'
      }
    },
    {
      name: 'Minh Le',
      position: 'Marketting Officer',
      about: '',
      social: {
        email: 'publicity@codersforcauses.org',
        discord: 'Minhocent Bystander',
        github: {
          name: 'Pixeladed',
          href: 'https://github.com/Pixeladed'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC Marketing Officer'
      }
    },
    {
      name: 'Thai Nguyen',
      position: 'Ordinary Committee Member',
      about: '',
      social: {
        email: 'committee@codersforcauses.org',
        discord: 'Tai',
        github: {
          name: 'thaingu',
          href: 'https://github.com/thaingu'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC OCM'
      }
    },
    {
      name: 'Jong Kyung Lim',
      position: 'Ordinary Committee Member',
      about: '',
      social: {
        email: 'committee@codersforcauses.org',
        discord: 'Happy Dust',
        github: {
          name: 'JKKim98',
          href: 'https://github.com/JKKim98'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC OCM'
      }
    },
    {
      name: 'Joshua Milambo',
      position: 'Ordinary Committee Member',
      about: '',
      social: {
        email: 'committee@codersforcauses.org',
        discord: 'Joshua Milambo',
        github: {
          name: 'Papajmil',
          href: 'https://github.com/Papajmil'
        }
      },
      picture: {
        src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        alt: 'CFC OCM'
      }
    }
  ]

  render () {
    return (
      <CardDeck>
        {this.committee.map(member => (
          <Col xs='12' md='6' lg='4' className='p-0'>
            <CardItem item={member} key={member.name} />
          </Col>
        ))}
      </CardDeck>
    )
  }
}
