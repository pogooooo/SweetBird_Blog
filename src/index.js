import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // 확장자를 추가합니다.
import reportWebVitals from './reportWebVitals.js'; // 확장자를 추가합니다.
import './style.css';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);

reportWebVitals();

