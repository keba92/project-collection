import React, { useCallback, useState } from 'react';
import io from 'socket.io-client';
import ResultSearch from '../components/ResultSearch';
import { useTranslation } from 'react-i18next';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default function Search() {
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { t, i18n } = useTranslation();
    const [option, setOption] = useState(null);
    const [word, setWord] = useState('');

    const searchFT = useCallback(async(e)=>{
        e.preventDefault();
        if(option) setOption(null);
        setWord('');
        if(word!=''){
            await socket.emit('searchFT', {
                word: word
            })
            await socket.on('dataItem', (data) => setOption(data))
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
        document.querySelector('.search-input').value = '';
    }, [word, option])

return (
    <div>
        <div className = "search-block">
            <InputGroup className="mb-3" style={{maxWidth: '400px'}}>
                <FormControl 
                    className='search-input'
                    placeholder={t('searchP')}
                    aria-describedby="basic-addon2"
                    onChange={(e)=>{setWord(e.target.value)}}
                />
                <InputGroup.Append>
                <Button variant="light" onClick={searchFT}>{t('searchB')}</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
        {(option)&&(
            <div>
                <Button variant="danger" 
                        style={{float:'right'}} 
                        onClick={()=>setOption(null)}>
                            Close
                </Button>
                <ResultSearch data = {option}/>
            </div>
            )}
    </div>
    )
}