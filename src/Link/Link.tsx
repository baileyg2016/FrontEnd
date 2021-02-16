import React, { useCallback, useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";

import Context from "../Context/Context";
import axios from "axios";

const Link = () => {
  const { linkToken, dispatch } = useContext(Context);

  const onSuccess = useCallback((public_token: string) => {
    // send public_token to server
    const setToken = async () => {
        console.log('token', public_token)
        const response = await axios.post("http://localhost:8000/api/set_access_token", {
            public_token: public_token,
        }
        );

        console.log(response)
        if (response.data.error) {
            dispatch({
                type: "SET_STATE",
                state: {
                    itemId: `no item_id retrieved`,
                    accessToken: `no access_token retrieved`,
                    isItemAccess: false,
                },
            });
            return;
        }

        const data = await response.data;
        const state = {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
        }
        localStorage.setItem('plaid-state', JSON.stringify(state));
        dispatch({
            type: "SET_STATE",
            state: state,
        });
    };

    setToken();

    dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
    window.history.pushState("", "", "/");
  }, []);

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button type="button" large onClick={() => open()} disabled={!ready}>
      Launch Link
    </Button>
  );
};

Link.displayName = "Link";

export default Link;