import React from 'react';
import { render } from 'react-dom';
import { App } from './App/App';

// Importing the Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
import { QuickstartProvider } from './Context/Context';

render(
    <React.StrictMode>
        <QuickstartProvider>
            <App />
        </QuickstartProvider>
    </React.StrictMode>,
  document.getElementById('root')
);
