import { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext.js';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function LoginScreen() {

    // The states are: 
    // (1) null, (2) "client error", (3) "backend error", (4) "loading", (5) "success"

    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);
    var { loggedIn, updateUser } = useContext(UserContext);


    // 1. Declare variables (not defined)
    var emailField;
    var passwordField;

     
    // Create a JS object like an HTML form element 
    var formData = new FormData();

    function login() {


        // 2. Validate the fields
        var errors = [];

        if(emailField.value.length === 0) {
            errors.push('Please enter your email');
        }

        if(passwordField.value.length === 0) {
            errors.push('Please enter your password');
        }

        // 3. If any field is not validated, go to "client error"
        if( errors.length > 0 ) {
            setFormState("client error");
            setErrorsState( errors );
        }

        // 4. If all fields are valid
        else {
            // 5. Go to "loading"
            setFormState("loading");
            setErrorsState([]);

            // 6. Send data backend
            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/login`,
                {
                    'method': 'POST',
                    'body': formData
                }
            )
            .then(
                function(backendResponse) {
                    // Convert the HTTP string response to JSON
                    return backendResponse.json();
                }
            )
            .then(
                // 7. If backend sends success, go to "success"
                function(jsonResponse) {
                    if(jsonResponse.status === "ok") {
                        console.log('backend response /users/login', jsonResponse)
                        setFormState("success");

                        // Update the user context
                        updateUser(
                            {
                                "email": jsonResponse.message.email,
                                "firstName": jsonResponse.message.firstName,
                                "lastName": jsonResponse.message.lastName,
                                "avatar": jsonResponse.message.avatar,
                                "jsonwebtoken": jsonResponse.message.jsonwebtoken,
                                "loggedIn": true
                            }
                        )
                    }
                    else {
                        setFormState("backend error");
                    }
                }
            )
            .catch(
                // 8. If backends sends error, go to "backend error"
                function(backendError) {
                    console.log('backendError at /users/login', backendError)
                    setFormState("backend error");
                }
            )
        }
    }

    function addListItem(str) {
        return <li>{str}</li>
    }

    if(loggedIn || formState === "success") {
        return (
            <Redirect to="/" />
        )
    }
    else {
        return (
            <Container maxWidth="sm">
                <Box pt={8}>
                    <Typography component="h1" variant="h2">
                        Login
                    </Typography>
                </Box>

                <Box mt={4} mb={2}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                emailField = thisElement;
                            } 
                        }
                        label="Email" required={true}/>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                passwordField = thisElement;
                            } 
                        }
                        label="Password" required={true} />
                    </FormControl>
                </Box>

                <Box display="flex">
                    
                    {
                        formState !== "loading" &&
                        <Button onClick={login} size="large" variant="contained">Send</Button>
                    }
                    
                    {
                        formState === "loading" &&
                        <CircularProgress />
                    }
                </Box>

                <Box mt={2}>

                    { 
                        formState === "client error" &&
                        <Alert severity="error">
                            <ul>
                            {
                                errorsState.map(addListItem)
                            }
                            </ul>
                        </Alert>
                    }

                    {
                        formState === "success" &&
                        <Alert severity="success">
                            You have logged in successfully!
                        </Alert>
                    }
                </Box>
            </Container>
        )
    }

}

export default LoginScreen;