import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { Paths } from './routes';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Signup } from '../components/Signup';
import { InvestorSignup } from '../components/InvestorSignup';
import { SubscriberSignup } from '../components/SubscriberSignup';
import { ConnectedPlaidInfo } from '../components/ConnectedPlaidInfo';

export const App: React.FC = () => {
  const { dispatch } = useContext(Context);

  const generateToken = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/api/create_link_token`, {
      method: 'POST',
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      }
  });
    
    if (response.status !== 200) {
      dispatch({ type: "SET_STATE", state: { linkToken: null } });
      return;
    }

    const data = await response.json();

    if (data) {
      console.log(data)
      dispatch({ type: "SET_STATE", state: { linkToken: data.link_token, } });
    }
    localStorage.setItem("link_token", data.link_token); //to use later for Oauth
  };

  useEffect(() => {
    // do not generate a new token for OAuth redirect; instead
    // setLinkToken from localStorage
    if (window.location.href.includes("?oauth_state_id=")) {
      dispatch({
        type: "SET_STATE",
        state: { linkToken: localStorage.getItem("link_token") },
      });
    } else {
      generateToken();

      // adding this so i don't have to login every single time
      if (localStorage.getItem('plaid-state')) {
        dispatch({
          type: "SET_STATE",
          state: {
            ...JSON.parse(localStorage.getItem('plaid-state') ?? ''),
            linkSuccess: true
          }
        })
      }
    }
  }, []);

  return (
    //   <div /*className={styles.App}*/>
    //   <div /*className={styles.container}*/>
    //     {!linkSuccess && <Link />}

    //     {linkSuccess && isItemAccess && (
    //       <>
    //         <ConnectedPlaidInfo />
    //       </>
    //     )}
    //   </div>
    // </div>
    // <>
    <Router>
      <Switch>
        <Route exact path={Paths.Home} component={InvestorSignup} />
        <Route exact path={Paths.InvestorSignup} component={InvestorSignup} />
        <Route exact path={Paths.SubscriberSignup} component={SubscriberSignup} />
        <Route exact path={Paths.InvestorData} component={ConnectedPlaidInfo} />
        <Redirect from='*' to={Paths.Home} />
      </Switch>
    </Router>
  );
}

export default App;
