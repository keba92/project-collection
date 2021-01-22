import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

function AdminButtons(props) {
    const { blockUser, deleteUsers, makeAdmin } = props;
    const { t, i18n } = useTranslation();

    return (
        <span className = 'toolBar'>
            <button className = 'btn' ><i className='fa fa-close' title='block' onClick={blockUser}>{t('blockI')}</i></button>
            <button className = 'btn' ><i className='fa fa-trash' onClick={deleteUsers}>{t('deleteI')}</i></button>
            <button className = 'btn' ><i className='fa fa-check' title='unblock' onClick={blockUser}>{t('unblockI')}</i></button>
            <button className = 'btn' onClick={makeAdmin}><i className='fa fa-check'>{t('adminI')}</i></button>
        </span>
    )
}

export default memo(AdminButtons);