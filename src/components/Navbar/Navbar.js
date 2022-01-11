import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import './Navbar.scss'

const Navbar = ({ walletAddress }) => {
  walletAddress = walletAddress.slice(0,10) + '...'
  return(
    <nav>
      <div className='logo-container'>
        <Link smooth to='/#home'>lobot.xyz</Link>
      </div>
      <div className='menu-container'>
        <Link smooth to='/#home'>home</Link>
        {/* <Link smooth to='/#faq'>faq</Link> */}
        <a href='https://twitter.com/lobotsquad' target='_blank' rel="noreferrer">twitter</a>
        <div className='mintBtnContainer'>
          <button className='pixel-btn-secondary'>{walletAddress}<span className={walletAddress.length > 0 ? 'connected' : 'disconnected'}>■</span></button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar