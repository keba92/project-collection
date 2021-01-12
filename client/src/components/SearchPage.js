import React, { useState, useEffect } from 'react';

const SearchPage = () => {
    const [dataSearch, setDataSearch] = useState(null);

    useEffect(()=>{
        setDataSearch(JSON.parse(localStorage.getItem('search')));
        console.log(JSON.parse(localStorage.getItem('search')))
    },[])

  return (
     <>
     </>
  )
}

export default SearchPage;