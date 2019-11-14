import React from 'react'
import style from './style'

export default class Face extends React.Component <{}, { face: string }> {
  constructor (props: Readonly<{}>) {
    super(props)
    this.state = { face: ':)' }
    this.handleOnMouseover = this.handleOnMouseover.bind(this)
    this.handleOnMouseout = this.handleOnMouseout.bind(this)
  }

  handleOnMouseover () {
    this.setState({ face: ';)' })
  }

  handleOnMouseout () {
    this.setState({ face: ':)' })
  }

  render () {
    return (
      <div>
        {style}
        <h1
          className='display-1 face'
          onMouseEnter={this.handleOnMouseover}
          onMouseLeave={this.handleOnMouseout}
        >{this.state.face}
        </h1>
      </div>
    )
  }
}
