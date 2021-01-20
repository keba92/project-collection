import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminTableHead(props) {
    const { selectAll, checkedAll } = props;
    const { t, i18n } = useTranslation();

    return (
        <tr>
            <th>Check All<br/>
                <input type='checkbox' className ='form-check-input' 
                       onChange={(event) => selectAll(event.target.checked)} 
                       checked={checkedAll}/>
            </th>
            <th>ID</th>
            <th>{t('nameT')}</th>
            <th>{t('emailT')}</th>
            <th>{t('dateRegT')}</th>
            <th>{t('dateLastT')}</th>
            <th>{t('statusT')}</th>
            <th>{t('adminT')}</th>
        </tr>
    )
}