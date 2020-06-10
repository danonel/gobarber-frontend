import React from 'react';

import SignIn from './pages/Signin';
// import SignUp from './pages/Singup';

import GlobalStyles from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyles />
  </>
);
export default App;
