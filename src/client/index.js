/**
 * Created by Leonid on 26/04/17.
 */
import 'babel-polyfill';
import React from 'react';
import io from 'socket.io-client';
import renderToContainer from './libs/renderToContainer';
import './styles/index.less';
import Drawer from './components/Drawer';

const socket = io.connect('http://localhost:4123');
socket.on('refresh', () => {
  window.location.reload(true);
});

renderToContainer(
  <Drawer />,
  {
    id: 'container',
  },
);
