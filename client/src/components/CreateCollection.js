import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"; 

export default function CreateCollection() {
    
    const [collection, setCollection] = useState('');
    const [collections, setCollections] = useState([]);
    const [nameItem, setNameItem] = useState('');
    const [shortNameItem, setShortNameItem] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [collectionItem, setCollectionItem] = useState('');
    const [optionItem, setOptionItem] = useState('');
    const { user } = useAuth0();

    useEffect(() =>{
        Axios.get('/getCollection')
        .then((res) => {
            setCollections(res.data);
        });
    },[])

    const createCollection = ()=>{
        Axios.post('/addCollection', {
            id: user.sub,
            collect: collection
        })
    }

    const createOptions = collections.map((el,idx) => {
        return (
            <option key={idx} value={el.collections}>{el.collections}</option>
        )
    })
    

    const createItem = () =>{
        Axios.post('/addItem',{
            id: user.sub,
            collect: collectionItem,
            name: nameItem,
            description: shortNameItem,
            teg: optionItem,
            url: urlPicture
        })
    }

    return(
        <div className='create-block'>
            <h1 className='create'>Создать коллекцию</h1>
            <div className='create-collection create'>
                <label>Название коллекции: </label>
                <input 
                    className='input-collection'
                    onChange={(e)=>setCollection(e.target.value)}
                    placeholder='Введите название коллекции' 
                />
                <button onClick={createCollection}>Создать коллекцию</button>
            </div>
            <h1 className='create'>Создать элемент коллекции</h1>
            <div className='create-item create'>
                <label>Выберите коллекцию: </label>
                <select className='select-collection' onInput={(e)=>setCollectionItem(e.target.value)}>
                    <option></option>
                    {createOptions}
                </select>
                Введите название: <input 
                                    className='name-item'
                                    onChange={(e)=>setNameItem(e.target.value)}
                                    placeholder='Введите название'
                                    />
                Введите краткое описание: <textarea 
                                    className='short-name'
                                    onChange={(e)=>setShortNameItem(e.target.value)}
                                    placeholder='Введите краткое описание'
                                    />
                Выберите тематику: <select className='select-tag' onInput={(e)=>setOptionItem(e.target.value)}>
                                        <option></option>
                                        <option value='alcohol'>Алкоголь</option>
                                        <option value='book'>Книга</option>
                                   </select>
                URL Картинки: <input 
                                className='url-item'
                                onChange={(e)=>setUrlPicture(e.target.value)}
                                placeholder='Введите URL'
                             />
                             <button className='createItem' onClick={createItem}>Создать Элемент</button>
            </div>
        </div>
    )
}