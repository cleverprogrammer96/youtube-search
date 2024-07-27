import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a
          href="https://github.com/cleverprogrammer96"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/manish-goyal-5bb22a154/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
      <p className="footer-text">© 2024 CleverProgrammer96. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
