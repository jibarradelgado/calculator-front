import React from "react"
import { AppProps } from "next/app"

import AuthProvider from '@store/AuthContext'

const MyApp = ({Component, pageProps} : AppProps) => {
  return (
    <AuthProvider.AuthProvider>
      <Component {...pageProps} />
    </AuthProvider.AuthProvider>
  )
}

export default MyApp