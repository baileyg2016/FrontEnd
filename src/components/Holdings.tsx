import React from 'react';

export interface HoldingsProps {
    accounts?: Array<any>;
    holdings?: Array<any>;
    securities?: Array<any>;
}

export const Holdings: React.FC<HoldingsProps> = ({
    accounts,
    holdings,
    securities,
}) => {

    return (
        <>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Available</th>
                    <th>Current</th>
                </tr>
                {
                    accounts?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.balances.available ?? 0}</td>
                                <td>${item.balances.current ?? 0}</td>
                            </tr>
                        )
                    })
                }
            </table>

            <br />
            <br />

            <table>
                <tr>
                    <th>Name</th>
                    <th>Close Price</th>
                    <th>Ticker Symbol</th>
                    <th>Type</th>
                </tr>
                {
                    securities?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.close_price}</td>
                                <td>{item.ticker_symbol}</td>
                                <td>{item.type}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </>
    );
};