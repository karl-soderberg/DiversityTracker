import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './base.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientPrincipalContextProvider } from '@aaronpowell/react-static-web-apps-auth';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClientPrincipalContextProvider>
        <App />
      </ClientPrincipalContextProvider>
    </QueryClientProvider>
  // </React.StrictMode>,
)
