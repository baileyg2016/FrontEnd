import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import { Holdings, HoldingsProps } from './Holdings';

export const ConnectedPlaidInfo: React.FC = () => {
    const { linkSuccess, isItemAccess, dispatch } = useContext(Context);
    const [data, setData] = useState<HoldingsProps | undefined>(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const getHoldings = async () => {
            const { data } = await axios.get(`${process.env.API_ENDPOINT}/api/holdings`);

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
                linkSuccess && isItemAccess ?
                    <Holdings
                        accounts={data?.accounts}
                        holdings={data?.holdings}
                        securities={data?.securities}
                    />
                :
                    <h1>Not getting anything</h1>
    );
}