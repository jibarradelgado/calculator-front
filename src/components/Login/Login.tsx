import { Paper, Typography, FormControl, Alert, Container, InputLabel, Input, Button } from "@mui/material"

import Layout from "../Layout/Layout"

const Login = () => {
  

  return (
    <Layout title="Login">
      <Typography variant="h2" >
        Login
      </Typography>
      {/* Alert */}
      <form>
        <Container className="loginContainer">
          <Paper>
            <FormControl>
              <InputLabel htmlFor="username-input">Username</InputLabel>
              <Input id="username-input" type="email" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="username-input">Username</InputLabel>
              <Input id="username-input" type="password" />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Paper>
        </Container>
      </form>
    </Layout>
  )
}

export default Login