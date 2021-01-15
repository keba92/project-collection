import React from 'react';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Checkbox = ({ type = "checkbox", checked = false, onChange, title, value }) => {
    return (
      <input type={type} className ='form-check-input' checked={checked} onChange={onChange} title ={title} value={value} />
    );
};
function AdminPage() {
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedAll, setCheckedAll] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const socket = io(`${window.location.origin}/`,{transports: ['websocket'], rejectUnauthorized: false});
    const { t, i18n } = useTranslation();
    const idUsers = []

    useEffect(() =>{
        socket.emit('getUsers', { message: process.env.REACT_APP_AUTH0_TOKEN});
        socket.on('getUsersData', (data)=>{
            setData(data);
        })
        socket.emit('getAdmins', { message: process.env.REACT_APP_AUTH0_TOKEN});
        socket.on('getAdminsData', (data)=>{
            setAdminList(data);
        })
    },[])

    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.value] : event.target.checked });
        if(!event.target.checked && checkedAll==true){
            selectAll(false);
        }
    }

    const deleteUsers = (e) => {
        e.preventDefault();
		Object.keys(checkedItems).map((keyName) => {
            // eslint-disable-next-line no-restricted-globals
            const answer = confirm(`Вы уверены, что хотите удалить пользователя с id:'${keyName}'?`)
            if(checkedItems[keyName] && answer) {
                socket.emit('deleteUser', {
                    message: process.env.REACT_APP_AUTH0_TOKEN,
                    idUser: keyName
                })
            }
        })
    }

    const makeAdmin = (e) => {
        e.preventDefault();
        Object.keys(checkedItems).map((keyName) => {
            if(checkedItems[keyName]) {
                adminList.push(keyName);
                setAdminList(adminList);
                socket.emit('makeAdmin', {
                    message: process.env.REACT_APP_AUTH0_TOKEN,
                    adminList: adminList
                })
            }
        })
    }
    
    const tableTemplate = data.map((row) => {
        idUsers.push(row.user_id);
         return(
            <tr key={row.user_id}>
                <td><Checkbox checked={checkedItems[row.user_id]}
                    onChange={handleChange} value ={row.user_id}/>
                </td>
                <td><Link to={`/user/${row.user_id}`}>{row.user_id}</Link></td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.created_at}</td>
                <td>{row.last_login}</td>
                <td>{(row.blocked)?('Block'):('OK')}</td>
                <td>{(adminList.includes(row.user_id))?('Admin'):('')}</td>
            </tr>
         );
    });

    const blockUser = (e) =>{
        e.preventDefault();
		Object.keys(checkedItems).map((keyName) => {
            if(e.target.title == 'block') {
                // eslint-disable-next-line no-restricted-globals
                const answer = confirm(`Вы уверены, что хотите заблокировать пользователя с id:'${keyName}'?`)
                if(checkedItems[keyName] && answer) {
                    socket.emit('blockUser', {
                        message: process.env.REACT_APP_AUTH0_TOKEN,
                        idUser: keyName,
                        block: true
                    })
                }
            } else {
                // eslint-disable-next-line no-restricted-globals
                const answer = confirm(`Вы уверены, что хотите разблокировать пользователя с id:'${keyName}'?`)
                if(checkedItems[keyName] && answer) {
                    socket.emit('blockUser', {
                        message: process.env.REACT_APP_AUTH0_TOKEN,
                        idUser: keyName,
                        block: false
                    })
                }
            }
            
        })
    }

    const selectAll = (value) => {
        idUsers.forEach((el) => {
            checkedItems[el] = false;
        })
        setCheckedAll(value);
        setCheckedItems((prevState) => {
          const newState = { ...prevState };
          for (const inputName in newState) {
            newState[inputName] = value;
          }
          return newState;
        });
      };
    
    return(
        <div className='admin-page'>
            <Link className='back' to='/'>{t('backMainL')}</Link>
            <div className = 'users'>
                <h1>{t('usersH')}</h1>
                <span className = 'toolBar'>
                    <button className = 'btn' title='block' onClick={blockUser}><i className='fa fa-close'>{t('blockI')}</i></button>
                    <button className = 'btn' onClick={deleteUsers}><i className='fa fa-trash'>{t('deleteI')}</i></button>
                    <button className = 'btn' title='unblock' onClick={blockUser}><i className='fa fa-check'>{t('unblockI')}</i></button>
                    <button className = 'btn' onClick={makeAdmin}><i className='fa fa-check'>{t('adminI')}</i></button>
                </span>
                <table className ='table-light'>
                    <tr>
                        <th>Check All<br/>
                            <input type='checkbox' className ='form-check-input' onChange={(event) => selectAll(event.target.checked)} checked={checkedAll}/>
                        </th>
                        <th>ID</th>
                        <th>{t('nameT')}</th>
                        <th>{t('emailT')}</th>
                        <th>{t('dateRegT')}</th>
                        <th>{t('dateLastT')}</th>
                        <th>{t('statusT')}</th>
                        <th>{t('adminT')}</th>
                    </tr>
                    {tableTemplate}
                </table>
            </div>
        </div>
    );
}

export default AdminPage;