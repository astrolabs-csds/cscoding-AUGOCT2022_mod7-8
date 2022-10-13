import React, { useContext } from 'react';
// Connect to the context (i.e, global state)
import {UserContext} from './UserContext';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ProfileScreen() {

    const { firstName, lastName, email, avatar, updateUser } = useContext(UserContext);


    return (
            <Container maxWidth="sm">
                <Box mt={8}>
                    <Typography component="h1" variant="h2">
                        Profile Settings
                    </Typography>
                </Box>

                <Box mt={4}>
                    <Avatar 
                        sx={{ width: 128, height: 128 }} 
                        alt="Remy Sharp" src={avatar} 
                    />
                </Box>
                

                <Box mt={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={{}}
                        label="Firstname" 
                        required={true}
                        defaultValue={firstName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={{}}
                        label="Lastname" 
                        required={true}
                        defaultValue={lastName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={{}}
                        label="Email" 
                        required={true}
                        defaultValue={email}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={{}}
                        label="Password" 
                        required={true}
                        />
                    </FormControl>
                </Box>


                <Box display="flex">
                    <Button size="large" variant="contained">Send</Button>
                </Box>
            </Container>
    )
}

export default ProfileScreen;