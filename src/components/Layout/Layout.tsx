import React from "react"
import { Container } from "@mui/material"
import Head from "next/head"
import Navbar from "../Navbar/Navbar"

const siteTitle = 'Calculator'

type LayoutProps = {
  children?: React.ReactNode
  title?: string
}

const Layout =  ({ children, title }: LayoutProps) => (
  <>
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
    </Head>
    <Navbar />
    <Container component="main">
      {children}
    </Container>
  </>
)

export default Layout 