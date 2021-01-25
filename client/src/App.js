import React from 'react';
import Header from './app/Header/containers/Header';
import Body from './app/Body/Body';
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from 'react-bootstrap';


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default App;
