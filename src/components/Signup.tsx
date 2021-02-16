import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Paths } from '../App/routes';

export const Signup: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <h1>Are you wanting to </h1>
            <button onClick={() => history.push(Paths.InvestorSignup)}>
                Have people mirror your portfolio?
            </button>
            <br />
            <h1>Or</h1>
            
            <button onClick={() => history.push(Paths.SubscriberSignup)}>
                Mirror someone else's portfolio?
            </button>
        </>
    );
};
