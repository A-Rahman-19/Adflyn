import logo2 from './assets/LogoWhite.png';
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container">
      <img src={logo2} alt="Adflyn Logo" className="logo fade-in-logo" />
      <h1 className='fade-in-text'>Adflyn: Simplify. Automate. Market.<br/>All in One Place</h1>
      <p className="subtitle fade-in-subtext">We're building something powerful.<br/>Stay tuned.</p>
      <a href="https://www.linkedin.com/company/adflyn/" target="_blank" className="linkedin" rel="noopener noreferrer">
        <img src=" https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className='fade-in-icon' />
      </a>
      <footer className="footer">
        &copy; {currentYear} Adflyn. All rights reserved  
      </footer>
    </div>
  );
}

export default App;
