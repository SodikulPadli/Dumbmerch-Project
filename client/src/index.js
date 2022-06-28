import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

// Init QueryClient and QueryClientProvider here ...
import { QueryClient, QueryClientProvider } from 'react-query';

// favicon
// import Favicon from './assets/DumbMerch.png';
// const favicon = document.getElementById('idFavicon');
// favicon.setAttribute('href', Favicon);

// Init Client from QueryClient() here ...
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
