import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import DarkTheme from '../../Theame/components/DarkTheme';
import LightTheme from '../../Theame/components/LightTheme';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header() {
  const { i18n } = useTranslation();
  const [theame, setTheme] = useState(null);
  const [language, setLanguage] = useState(null);
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      socket.emit('getUser', {
        id: user.sub,
      });
      socket.on('getUserData', (data) => {
        if (data.length != 0) {
          if (!theame) setTheme(data[0].theme);
          if (!language) {
            setLanguage(data[0].lang);
            i18n.changeLanguage(data[0].lang);
          }
          data[0].theme == 'dark' ? DarkTheme() : LightTheme();
        }
      });
    }
  });

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    saveStore();
  };

  const changeTheame = (value) => {
    value !== 'light' ? DarkTheme() : LightTheme();
    setTheme(value);
    localStorage.setItem('theme', value);
    saveStore();
  };

  const saveStore = () => {
    if (isAuthenticated) {
      socket.emit('userData', {
        id: user.sub,
        theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
        lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru',
      });
    }
  };

  if (!theame && !isAuthenticated) {
    LightTheme();
    setTheme('light');
  }

  return (
    <div className="header">
      <div className="language">
        <Flag className="en lang" code={'gb'} height="15" onClick={() => handleClick('en')} />
        <Flag className="ru lang" code={'ru'} height="16" onClick={() => handleClick('ru')} />
      </div>
      <div className="language">
        <FaSun
          style={{ width: '50px', color: '#78dde2', cursor: 'pointer' }}
          onClick={() => changeTheame('light')}
        />
        <FaMoon
          style={{ width: '50px', color: '#78dde2', cursor: 'pointer' }}
          onClick={() => changeTheame('dark')}
        />
      </div>
      <Profile />
    </div>
  );
}

export default Header;
