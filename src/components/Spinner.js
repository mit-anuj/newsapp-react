import React, { Component } from 'react'
import Skateboarding from './Skateboarding.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src ={Skateboarding} alt='loading...'/>
      </div>
    )
  }
}

export default Spinner
