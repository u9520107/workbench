import { render } from 'react-dom';
import React from 'react';
import Stage from './components/Stage';
import ReduxApp from './containers/ReduxApp';
import MobXApp from './containers/MobXApp';
import 'normalize-css/normalize.css';
import './styles.css';

const viewport = document.createElement('div');
viewport.setAttribute('id', 'viewport');
document.body.append(viewport);


render(
  <Stage>
    <ReduxApp />
    <MobXApp />
  </Stage>,
  viewport
);
