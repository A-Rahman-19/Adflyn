import logo2 from './assets/LogoWhite.png';
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="container">
        <img src={logo2} alt="Adflyn Logo" className="logo fade-in-logo" />
        <h1 className='fade-in-text'>Adflyn: Simplify. Automate. Market.<br/>All in One Place</h1>
        <p className="subtitle fade-in-subtext">We're building something powerful.<br/>Stay tuned.</p>
        <a href="https://www.linkedin.com/company/adflyn/" target="_blank" className="socials" rel="noopener noreferrer">
       <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" className="fade-in-icon" />
</a>
        <a href="https://www.instagram.com/adflyn_com/" target="_blank" className="socials" rel="noopener noreferrer">
         <FontAwesomeIcon icon={faInstagram} size="2x" color="white" className="fade-in-icon" />
        </a>
      </div>
      <footer className="footer">
        &copy; {currentYear} Adflyn. All rights reserved  
      </footer>
    </>
  );
}

export default App;
