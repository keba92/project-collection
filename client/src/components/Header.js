import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';
import Switch from 'react-input-switch';

function Header() {
  const { i18n } = useTranslation();
  const [theame, setTheme] = useState(null);

  const handleClick = (lang) =>{
    i18n.changeLanguage(lang);
  }

  if(!theame) {
    LightTheme();
    setTheme('light')
  }

  return (
    <div className="header">
      <div className='language'>
        <Flag className='en lang' code={ 'gb' } height="15" onClick={()=>handleClick('en')}/>
        <Flag className='ru lang' code={ 'ru' } height="16" onClick={()=>handleClick('ru')}/>
      </div>
      <div className='language'>
        Light <Switch on="dark" 
                off="light" 
                value={theame} 
                onChange={()=>{
                if(theame == 'light'){
                  DarkTheme();
                  setTheme('dark');
                } else {
                  LightTheme();
                  setTheme('light')
                }
              }} 
        /> Dark
      </div>
      <Profile />
    </div>
  );
}

export default Header;