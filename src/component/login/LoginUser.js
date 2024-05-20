import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    Typography,
    TextField
   } from '@mui/material';
   import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
   
   function LoginUser() {
    const [userName, setUserName] = useState(""); 
    const [newpassword, setPassword] = useState("");

    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleApiCall = (event) => {
        event.preventDefault();
        const username = userName.trim();
        const password = newpassword.trim();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username,password: password })
        };
        fetch(`${process.env.REACT_APP_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(data => {setToken(data.data.token); console.log(data.data.token); navigate('/profile');})
            .catch(err => console.log(err))
    }
   
    return (
     <>
      <Container component="main" maxWidth="xs">
       <Box>
        <Typography component="h1" variant="h5">
         Sign In
        </Typography>
        <form autoComplete='off' onSubmit={handleApiCall} >      
          <TextField
           margin="normal"
           required
           fullWidth
           id="username"
           type="text"
           label="Username"
           name="username"
           autoComplete="username"
           value={userName}
           onChange={e => setUserName(e.target.value)}
          />
          <TextField
           margin="normal"
           required
           fullWidth
           name="password"
           label="Password"
           type="password"
           id="password"
           value={newpassword}
           onChange={e => setPassword(e.target.value)}
          />                        
         <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {console.log(token); }}
          >
          Sign In
         </Button>
        </form>
       </Box>
      </Container>
     </>
    );
   }
   
   export default LoginUser;