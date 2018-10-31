import React from 'react';
import { render } from 'react-dom';
import './style.css';

import App from './components/App';


const viewport = document.createElement('viewport');
document.body.append(viewport);

render(<App />, viewport);
