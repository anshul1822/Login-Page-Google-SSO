import React from 'react'
import './Login.css';
import InnerRight from './InnerRight';
import img_path from '../images/unsplash.jpg'

function Login() {
  return (
    <div className='outer'>
      <div className='inner'>
        <div className='inner left'>
          <img src={img_path} alt="login app" />
        </div>
        <div className='inner right'>
          <InnerRight/>
        </div>
      </div>
    </div>
  )
}

export default Login;