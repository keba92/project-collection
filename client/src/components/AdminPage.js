import React from 'react';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

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
    const socket = io("http://localhost:3001/");
    const idUsers = []

    useEffect(() =>{
        const getUserMetadata = async () => {
      
            try {

              const metadataResponse = await fetch('https://dev-lma8p4gy.eu.auth0.com/api/v2/users',{
                  method: 'GET',
                  params: {q: 'logins_count:{0 TO *]', search_engine: 'v3'},
                  headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AUTH0_TOKEN}`,
                  },
                  scope: "read:user_idp_tokens",
                }
              );

                const admindataResponse = await fetch('https://dev-lma8p4gy.eu.auth0.com/api/v2/roles/rol_T31Z6EKjiFLeoH0T/users',{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AUTH0_TOKEN}`,
                      },
                    scope: "read:users",
                }
              );

              const adminsInfo = await admindataResponse.json();
              const admins = adminsInfo.map(el => el.user_id)
              setAdminList(admins)
        
              const info = await metadataResponse.json();      
              setData(info);
            } catch (e) {
              console.log(e.message);
            }
          };
          getUserMetadata();  
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

   const _refreshPage = () => {
        window.location.reload();
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
            <Link className='back' to='/'>На главную страницу</Link>
            <div className = 'users'>
                <h1>Users</h1>
                <span className = 'toolBar'>
                    <button className = 'btn' title='block' onClick={blockUser}><i className='fa fa-close'>Block</i></button>
                    <button className = 'btn' onClick={deleteUsers}><i className='fa fa-trash'>Delete</i></button>
                    <button className = 'btn' title='unblock' onClick={blockUser}><i className='fa fa-check'>Unblock</i></button>
                    <button className = 'btn' onClick={makeAdmin}><i className='fa fa-check'>Admin</i></button>
                </span>
                <table className ='table-light'>
                    <tr>
                        <th>Check All<br/>
                            <input type='checkbox' className ='form-check-input' onChange={(event) => selectAll(event.target.checked)} checked={checkedAll}/>
                        </th>
                        <th>ID</th>
                        <th>Name(Login)</th>
                        <th>Email</th>
                        <th>Date Registration</th>
                        <th>Date Last Login</th>
                        <th>Status</th>
                        <th>Admin</th>
                    </tr>
                    {tableTemplate}
                </table>
            </div>
        </div>
    );
}

export default AdminPage;