import React, { useEffect, useState } from 'react'
import './App.scss'
import CandyMachine from './CandyMachine'
import gif from './assets/nfts/merged.gif'
import Modal from 'react-modal'

// COMPONENTS
import Navbar from './components/Navbar/Navbar'
import Faq from './components/Faq/Faq'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(20, 20, 20, 1)',
    color: 'white'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.75)'
  }
};

Modal.setAppElement('#root');

const App = () => {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window
      if(solana) {
        if(solana.isPhantom) {
          console.log('Phantom wallet found!')
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public Key:', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        openModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window;

    if (solana && solana.isPhantom) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
      openModal()
    }
  };

  const renderNotConnectedContainer = () => (
    <div className='mintBtnContainer'>
      <button className="pixel-btn" onClick={connectWallet}>Connect phantom wallet</button>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App" id='home'>
      <Navbar walletAddress={walletAddress ?? ''} />
      {/* SECTION 1 */}
      <div className="container">
        <div className='section-left'>
          <div className="header-container">
            <h1>Welcome to lobot squad</h1>
            <p>100 unique and limited NFT on Solana: MINT NOW and show it off as your social avatar.</p>
          </div>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
        <div className='section-right'>
          <img alt='Lobot NFT' src={gif} />
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="modal"
          >
            <div className='modal-container'>
              <p>You need a Phantom Wallet</p>
              <a href='https://phantom.app/download' target='_blank' rel='noreferrer'>Get it here</a>
            </div>
          </Modal>
        </div>
      </div>

      {/* SECTION 2 - FAQ*/}
      {/* <Faq /> */}
    </div>
  );
};

export default App;
