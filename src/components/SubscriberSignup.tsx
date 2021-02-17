import React, { useCallback, useState } from 'react';
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Link, TextField } from '@material-ui/core';
import axios from 'axios';

export const SubscriberSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiId, setApiId] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const onCreateAccount = useCallback(() => {
        const createAccount = async () => {
            const { data } = await axios.post(`${process.env.AWS_ENDPOINT}/signup`, {
                username: email,
                password: password,
                clientId: apiId,
                clientSecret: secretKey,
            });
        };
    }, []);

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Create you Main Street account 📈</FormLabel>
                <FormGroup style={{ alignItems: 'center' }}>
                    <FormControlLabel
                        control={<TextField onChange={e => setFirstName(e.target.value)} id="outlined-basic" label="First Name" variant="outlined" />}
                        label=''
                    />
                    <FormControlLabel
                        control={<TextField onChange={e => setLastName(e.target.value)} id="outlined-basic" label="Last Name" variant="outlined" />}
                        label=''
                    />
                    <FormControlLabel
                        control={<TextField onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />}
                        label=''
                    />
                    <FormControlLabel
                        control={<TextField onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />}
                        label=''
                    />
                    <FormControlLabel
                        control={<TextField onChange={e => setApiId(e.target.value)} id="outlined-basic" label="Alpaca API id" variant="outlined" />}
                        label=''
                    />
                    <FormControlLabel
                        control={<TextField onChange={e => setSecretKey(e.target.value)} id="outlined-basic" label="Alpaca secret key id" variant="outlined" />}
                        label=''
                    />
                </FormGroup>
                <FormHelperText>
                    If you do not have an Alpaca account, you can make one <Link target='_blank' rel='noopener noreferrer' href='https://app.alpaca.markets/signup' onClick={(e: any) => e.preventDefault}>here</Link>
                    <br />
                    Once you are done, you can generate your keys and input them here.
                </FormHelperText>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onCreateAccount}
                >
                    Create Account
                </Button>
            </FormControl>
        </>
    );
};