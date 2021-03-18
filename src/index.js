import React from 'react';

import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom'; //оборачивает весь App в Browser Router - главный компонент, маршрутизатор, который под капотом реализовывает слежение за url-строкой (адресной строкой браузера) и при обнаружении изменений в ней, будет вносить изменения, указанные разработчиком

import App from './App';

// Styles
import 'modern-normalize/modern-normalize.css'; //подключение стилей для normalize
import './index.css';
import './styles/base.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
