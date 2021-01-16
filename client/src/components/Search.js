import React, { useState } from 'react';
import io from 'socket.io-client';
import ResultSearch from './ResultSearch';
import { useTranslation } from 'react-i18next';


export default function Search() {
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { t, i18n } = useTranslation();
    const [option, setOption] = useState([]);
    const [word, setWord] = useState('');

    const searchFT = async(e)=> {
        e.preventDefault();
        if(option) setOption(null);
        setWord('');
        if(word!=''){
            await socket.emit('searchFT', {
                word: word
            })
            await socket.on('dataItem', (data) => {
                setOption(data);
            })
            await socket.on('dataComment', (data) => {
                data.map( async el=>{
                    await socket.emit('getItemInfo', {
                        _id: el.idItem
                    })
                    await socket.on('getItemDataInfo', (dataItem) => {
                        const newOption = option.concat(dataItem);
                        setOption(newOption);
                    }) 
                })

            })
        }
    }

return (
    <div>
        <div className = "search-block">
            <input className='search' style={{color: 'black', backgroundColor: 'white'}} onChange={(e)=>{setWord(e.target.value)}}
                    placeholder={t('searchP')}/>
            <button onClick={searchFT}>{t('searchB')}</button>
        </div>
        {(option)&&(<ResultSearch data = {option}/>)}
    </div>
    )
}