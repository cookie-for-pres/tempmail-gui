import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <MantineProvider theme={{ colorScheme: 'dark' }}>
    <App />
  </MantineProvider>, 
document.getElementById('root'));