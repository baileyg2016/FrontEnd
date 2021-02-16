import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Holdings, HoldingsProps } from './Holdings';

export const ConnectedPlaidInfo: React.FC = () => {
    const [data, setData] = useState<HoldingsProps | undefined>(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const getHoldings = async () => {
            const { data } = await axios.get('http://localhost:8000/api/holdings');
            
            if (data.error) {
                setError(data.error);
            } else {
                setData({
                    accounts: data.holdings.accounts,
                    holdings: data.holdings.holdings,
                    securities: data.holdings.securities,
                });
            }
        };

        getHoldings();
    }, []);


    return (
        error 
            ? 
                <h1>yeah, you have an error {error}</h1>
            :
                <Holdings
                    accounts={data?.accounts}
                    holdings={data?.holdings}
                    securities={data?.securities}
                />
    );
}