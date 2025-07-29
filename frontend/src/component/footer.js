import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      &copy; {currentYear} Adflyn. All rights reserved
    </footer>
  );
}

export default Footer;
