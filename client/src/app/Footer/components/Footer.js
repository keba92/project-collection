import React, { memo } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer">
      <div style={{ display: 'inline-block', width: '50%', textAlign: 'center' }}>
        <a
          href="https://github.com/keba92/project-collection"
          style={{ backgroundColor: '#191919', color: '#78dde2' }}
        >
          <FaGithub style={{ cursor: 'pointer', margin: '7px' }} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/alexey-kebets-7996b41b4/"
          style={{ backgroundColor: '#191919', color: '#78dde2' }}
        >
          <FaLinkedin style={{ cursor: 'pointer', margin: '7px' }} />
          LinkedIn
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <span>Copyright &copy; Alexey Kebets</span>
      </div>
    </div>
  );
}

export default memo(Footer);
