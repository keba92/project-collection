import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LikeButton from '../../ItemPage/containers/LikeButton';
import { useTranslation } from 'react-i18next';
import ItemBody from '../../ItemPage/components/ItemBody';

function TabelItems(props) {
    const {dataItems, idCollect} = props;
    const { isAuthenticated } = useAuth0();
    const { t, i18n } = useTranslation();
    let collectItems;

    if(idCollect == ''){
        collectItems = dataItems.filter((el) => el);
    } else {
        collectItems = dataItems.filter((el) => el.idCollect == idCollect);
    }
    const makeItems = useCallback(() => {
        if(collectItems.length!=0){
            return collectItems.reverse().map((el, idx) => {
                const data = JSON.parse(el.dataItem);
                const pole = JSON.parse(el.poleItem);
                return (
                    <Card style={{ width: '20rem' }} className='item' key={idx}>
                        <ItemBody data={data} pole={pole} el={el} />
                        <LikeButton id={el._id}/>
                        <Link to={`/item/${el._id}`}> {t('openL')} </Link>
                    </Card>
                )
            })
        }
    }, [dataItems, idCollect, collectItems, isAuthenticated, t])

    return (
        <div className='table-items'>
            {makeItems()}
        </div>
    )
}

export default TabelItems;