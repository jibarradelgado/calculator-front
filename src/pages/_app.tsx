import React from "react"
import { AppProps } from "next/app"

import AuthProvider from '@store/AuthContext'
import { ErrorProvider } from "@store/ErrorContext"

const MyApp = ({Component, pageProps} : AppProps) => {
  return (
    <ErrorProvider>
      <AuthProvider.AuthProvider>
        <Component {...pageProps} />
      </AuthProvider.AuthProvider>
    </ErrorProvider>
  )
}

export default MyApp