import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import Link from '../Link/Link';
import { ConnectedPlaidInfo } from './ConnectedPlaidInfo';

export const InvestorSignup = () => {
    const history = useHistory();
    const { linkSuccess } = useContext(Context);

    useEffect(() => {

    }, [history]);

    return (
        <>
            {
                linkSuccess
                ? <ConnectedPlaidInfo />
                : <Link />
            }
        </>
    )
};