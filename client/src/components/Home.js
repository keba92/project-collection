import React from 'react';
import TabelItems from './TableItems';
import UserProfileButton from './UserProfileButton';

export default function Home() {

    return (
        <div className='home-page'>
            <UserProfileButton />
            <TabelItems />
        </div>
    )
}