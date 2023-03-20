import React from 'react';

import Login from './pages/login';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <Login />
      <GlobalStyle />
    </>
  );
}

export default App;
