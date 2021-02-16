import React, { useCallback, useState } from 'react';

export const SubscriberSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [apiKey, setApiKey] = useState('');

    const createAccount = useCallback(() => {
        console.log('clicking')
    }, []);

    return (
        <div>
            <label>First Name: <input name="first_name" type='text' onChange={e => setFirstName(e.target.value)} /></label>
            <label>Last Name: <input name="last_name" type='text' onChange={e => setLastName(e.target.value)} /></label>
            <label>Email: <input name="email" type='email' onChange={e => setEmail(e.target.value)} /></label>
            <label>Alpaca API key: <input name="alpaca_api" onChange={e => setApiKey(e.target.value)} /></label>
            <input name="create_account" type='button' value="Create Account" onClick={createAccount} />
        </div>
    );
};