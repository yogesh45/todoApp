import React from 'react';
import './App.css';
import AppComponent from './components/AppComponent';
import {Provider} from 'react-redux';
import { store, persistor } from './Store/Store'
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className='Todos_Users_App'>
            <AppComponent />
          </div>
        </PersistGate>
    </Provider>
  )
}

export default App;
