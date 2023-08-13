import { Box, Typography, FormControl, Alert, Container, InputLabel, Input, Button, TextField } from "@mui/material"

import Layout from "../Layout/Layout"
import { useLogin } from "@service/auth"

const Login = () => {
  const { login, message } = useLogin({
    onDone: () => window.location.replace('/')
  })

  return (
    <Layout title="Login">
      <Typography variant="h2" >
        Login
      </Typography>
      {message && <Alert color="error">{message}</Alert>}
      <Container className="loginContainer" maxWidth="xs">
        <Box component="form" onSubmit={login} noValidate sx={{ mt:1}} >
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            id="email" 
            type="email" 
            label="Email Address" 
            name="email" 
            autoComplete="email"
            autoFocus
          />
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            id="password" 
            type="password" 
            label="Password" 
            name="password" 
            autoComplete="current-password"
            autoFocus
          />
          <Button type="submit" variant="contained" color="primary" fullWidth  sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Login