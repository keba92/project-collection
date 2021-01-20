import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Comment(props){
    const {data} = props;
    const { t, i18n } = useTranslation();
    const makeComment = data.map((el,idx)=>{
        const obj = JSON.parse(el);
        return (
            <>
                <span key={idx}> <b>{obj.nameUser}</b> </span>
                <p key={idx}> {obj.message} </p>
            </>
        )
    })

    return(
        <div className='comment'>
            {(data.length!=0)?(makeComment):(<p>{t('nonCommentP')}</p>)}
        </div>
    )
} 