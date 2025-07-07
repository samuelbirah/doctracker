import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { customTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider theme={customTheme}>
    <App />
  </ConfigProvider>
);

reportWebVitals();
