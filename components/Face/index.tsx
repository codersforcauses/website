import React from 'react'
import style from './style'

export default class Face extends React.Component <{}, { face: string }> {
  constructor (props: Readonly<{}>) {
    super(props)
    this.state = { face: ':)' }
  }

  onMouseover () {
    this.setState({ face: ';)' })
  }

  onMouseout () {
    this.setState({ face: ':)' })
  }

  render () {
    return (
      <div>
        {style}
        <h1 className='display-1 face'
          onMouseEnter={this.onMouseover.bind(this)}
          onMouseLeave={this.onMouseout.bind(this)}
        >{this.state.face}</h1>
      </div>
    )
  }
}
