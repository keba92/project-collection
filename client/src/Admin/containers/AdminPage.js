import React, { useCallback } from 'react';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminTableRow from '../components/AdminTableRow';
import AdminTableHead from '../components/AdminTableHead';
import AdminButtons from '../components/AdminButtons';
import { Table } from 'react-bootstrap';

function AdminPage() {
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedAll, setCheckedAll] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { t, i18n } = useTranslation();
    const idUsers = []

    useEffect(() =>{
            socket.emit('getUsers', { message: process.env.REACT_APP_AUTH0_TOKEN});
            socket.on('getUsersData', (data)=>{
                setData(data);
            })
            socket.emit('getAdmins', { message: process.env.REACT_APP_AUTH0_TOKEN});
            socket.on('getAdminsData', (data)=>{
                const newData = data.map(el=>el.user_id)
                setAdminList(newData);
            })
    },[])

    const handleChange = useCallback((event) => {
        setCheckedItems({...checkedItems, [event.target.value] : event.target.checked });
        if(!event.target.checked && checkedAll==true){
            selectAll(false);
        }
    }, [checkedItems])

    const deleteUsers = useCallback((e) => {
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
    }, [checkedItems])

    const makeAdmin = useCallback((e) => {
        e.preventDefault();
        Object.keys(checkedItems).map((keyName) => {
            if(checkedItems[keyName] && !adminList.includes(keyName)) {
                adminList.push(keyName);
                setAdminList(adminList);
                socket.emit('makeAdmin', {
                    message: process.env.REACT_APP_AUTH0_TOKEN,
                    adminList: adminList
                })
            }
        })
    },[checkedItems, adminList])
    
    const blockUser = useCallback((e) =>{
		Object.keys(checkedItems).map((keyName) => {
            if(e.target.attributes[1].value == 'block') {
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
    }, [checkedItems])

    const selectAll = useCallback((value) => {
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
      }, [idUsers, checkedItems, setCheckedAll, setCheckedItems])
    
    return(
        <div className='admin-page'>
            <div className='button-main'>
                <Link className='back' to='/'>{t('backMainL')}</Link>
            </div>
            <div className = 'users'>
                <h1>{t('usersH')}</h1>
                <AdminButtons blockUser={blockUser} deleteUsers={deleteUsers} makeAdmin={makeAdmin} />
                <Table striped bordered hover variant="dark" className ='table-light'>
                    <thead>
                        <AdminTableHead selectAll={selectAll} checkedAll={checkedAll} />
                    </thead>
                    <AdminTableRow data={data} adminList={adminList} handleChange={handleChange} 
                                   checkedItems={checkedItems} idUsers={idUsers} />
                </Table>
            </div>
            <div style={{height:'500px'}}></div>
        </div>
    );
}

export default AdminPage;