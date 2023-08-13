import React from "react"
import { CircularProgress } from '@mui/material'
import { useCurrentUser } from "@store/AuthContext"
import MainApp from "@components/App/MainApp"
import Layout from "@components/Layout/Layout"
import Login from "@components/Login/Login"



const HomePage = () => {
  const { user, status } = useCurrentUser()

  if (user == null) {
    return <Login />
  }

  if (status == 'loading') {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    )
  }
  const id = user.id
  return (
    <MainApp />
  )
}

export default HomePage