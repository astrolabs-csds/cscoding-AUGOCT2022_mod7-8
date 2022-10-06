import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function RegistrationScreen() {

    // The states are: 
    // (1) null, (2) "client error", (3) "backend error", (4) "loading", (5) "success"

    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);


     // 1. Declare variables (not defined)
     var firstNameField;
     var lastNameField;
     var emailField;
     var passwordField

     
    function register() {


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

        if(passwordField.value.length === 0) {
            errors.push('Please enter your password');
        }

        // 3. If any field is not validated, go to "client error"
        if( errors.length > 0 ) {
            setFormState("client error");
        }

        // 4. If all fields are valid
            // 5. Go to "loading"
            // 6. Send data backend
                // 7. If backend sends success, go to "success"
                // 8. If backends sends error, go to "backend error"
    }



    return (
        <Container maxWidth="sm">
            <Box pt={8}>
                <Typography component="h1" variant="h2">
                    Registration
                </Typography>
            </Box>
            <Box mt={4} mb={2}>
                <FormControl fullWidth sx={ { mb: 2 } }>
                    <TextField 
                    inputRef={ 
                        function( thisElement ){
                            firstNameField = thisElement;
                        } 
                    }
                    label="Firstname" required={true}/>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                   <TextField 
                   inputRef={ 
                        function( thisElement ){
                            lastNameField = thisElement;
                        } 
                    }
                   label="Lastname" required={true}/>
                </FormControl>

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
                <Button onClick={register} size="large" variant="contained">Send</Button>
            </Box>

            <Box mt={2}>

                { 
                    formState === "client error" &&
                    <Alert severity="error">
                        Please enter all the correct details!
                    </Alert>
                }

                {
                    formState === "success" &&
                    <Alert severity="success">
                        You have registered successfully!
                    </Alert>
                }
            </Box>

        </Container>
    )

}

export default RegistrationScreen;