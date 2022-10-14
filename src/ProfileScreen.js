import React, { useContext, useState } from 'react';
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

    const { firstName, lastName, email, avatar, jsonwebtoken,  updateUser } = useContext(UserContext);

    // The states are: 
    // (1) null, (2) "client error", (3) "backend error", (4) "loading", (5) "success"

    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);


    // 1. Declare variables (not defined)
    var firstNameField;
    var lastNameField;
    var emailField;
    var passwordField;
    var avatarField;

    // Create a JS object like an HTML form element 
    var formData = new FormData();

    function attachFile(evt) {

        console.log('file data', evt.target.files)
        // Creating an array from the files attached by user
        var files = Array.from(evt.target.files);

        files.forEach(
            function(fileAttachment, index) {
                formData.append(index, fileAttachment);
            }
        )
    }

    function update() {


        // 2. Validate the fields
        var errors = [];

        if(firstNameField.value.length === 0) {
            errors.push('Please enter your first name');
        }

        if(lastNameField.value.length === 0) {
            errors.push('Please enter your last name');
        }

        if(emailField.value.length === 0) {
            errors.push('Please enter your email');
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
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value);
            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/update`,
                {
                    "method": "POST",
                    "headers": {
                        "Authorization" : `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                    },
                    "body": formData
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
                        console.log('backend response /users/update', jsonResponse)
                        setFormState("success");
                        // Update the user context
                        updateUser(
                            {
                                "email": jsonResponse.message.email,
                                "firstName": jsonResponse.message.firstName,
                                "lastName": jsonResponse.message.lastName,
                                "avatar": jsonResponse.message.avatar,
                                "jsonwebtoken": jsonwebtoken || jsonResponse.message.jsonwebtoken
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
                    console.log('backendError at /users/update', backendError)
                    setFormState("backend error");
                }
            )
        }
    }

    function addListItem(str) {
        return <li>{str}</li>
    }

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

                    <Button size="small" variant="contained" component="label">
                        Upload New Picture
                        <input 
                            ref={function(thisElement){ avatarField = thisElement }} 
                            onClick={attachFile}
                            onChange={attachFile}
                            hidden accept="image/*" 
                            multiple type="file" 
                        />
                    </Button>
                </Box>
                

                <Box mt={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={function(thisElement) { return firstNameField = thisElement; }}
                        label="Firstname" 
                        required={true}
                        defaultValue={firstName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={function(thisElement) { return lastNameField = thisElement; }}
                        label="Lastname" 
                        required={true}
                        defaultValue={lastName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={function(thisElement) { return emailField = thisElement; }}
                        label="Email" 
                        required={true}
                        defaultValue={email}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={function(thisElement) { return passwordField = thisElement; }}
                        label="Password" 
                        required={true}
                        />
                    </FormControl>
                </Box>


                <Box display="flex">
                
                    {
                        formState !== "loading" &&
                        <Button onClick={update} size="large" variant="contained">Send</Button>
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
                            Updates saved successfully!
                        </Alert>
                    }
                </Box>
            </Container>
    )
}

export default ProfileScreen;