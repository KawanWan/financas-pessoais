"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Loading from '@/components/loading';

const AppContext = createContext({
  loggedId: false,
})

export function AppWrapper({ children }: {
  children: React.ReactNode
}) {
  let [state, setState] = useState({
    loggedId: false,
    user: null
  })

  interface User {
    id: number;
    email: string;
    name: string;
}


  useEffect(() => {
    console.log('Executando...')
    checkLogin();
  }, []);
  
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    const cookieToken = Cookies.get('jwt');
    console.log(cookieToken)
    const response = await fetch('/api/isLoggedIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookieToken }),
    });

    const result = await response.json()
    

    if (result) {
      setState({
        loggedId: true,
        user: result
      })
    }

    setLoading(false)
  }

  if (loading) {
    return <Loading />; // Exibir uma mensagem de carregamento ou um spinner
  }

  return (

    <React.StrictMode>
      <AppContext.Provider value={state}>
        {children}
      </AppContext.Provider>
    </React.StrictMode>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

