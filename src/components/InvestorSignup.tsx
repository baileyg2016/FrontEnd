import React, { useContext } from 'react';
import Context from '../Context/Context';
import Link from '../Link/Link';
import { ConnectedPlaidInfo } from './ConnectedPlaidInfo';

export const InvestorSignup = () => {
    const { linkSuccess } = useContext(Context);

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