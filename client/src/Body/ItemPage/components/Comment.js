import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function Comment(props){
    const {data} = props;
    const { t, i18n } = useTranslation();
    const makeComment = useMemo(()=>data.map((el,idx)=>{
        const obj = JSON.parse(el);
        return (
            <>
                <span key={idx}> <b>{obj.nameUser}</b> </span>
                <p key={idx}> {obj.message} </p>
            </>
        )
    }),[data])

    return(
        <div className='comment'>
            {(data.length!=0)?(makeComment):(<p>{t('nonCommentP')}</p>)}
        </div>
    )
}

export default memo(Comment);