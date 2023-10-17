import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Text, 
  Button, 
  Spacer,
  ButtonGroup, 
  Divider, 
  Flex 
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const authHook = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        await authHook.startupLoginCheck();
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_URL}/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${authContext.auth.token}`
        }
      });
    } catch (err) {
      console.log('err', err);
      // TODO: logout error action
    } finally {
      authHook.setAsLoggedOut();
    }
  };

  return (
    <div>
      <Flex 
        padding="20px" 
        minWidth="max-content" 
        alignItems="center"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
        >
          Torrodemo
        </Button> 
        <Spacer />
        <ButtonGroup gap="4">
            <>
              { authContext.auth.isSignedIn &&
              <Text marginTop="10px">
                Balance: {authContext.auth.player.currency} {authContext.auth.player.balance}
              </Text>
              }
              <Button 
                onClick={() => navigate('/guide')}
                variant="outline" 
                colorScheme="green"
              >
                Guide
              </Button>
            </>
          { !authContext.auth.isSignedIn &&
            <>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              colorScheme="green"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              variant="outline" 
              colorScheme="green"
            >
              Register   
            </Button>
            </>
          }
          { authContext.auth.isSignedIn &&
            <>
            <Button 
              onClick={() => logout()}
              variant="outline" 
              colorScheme="green"
            >
              Logout   
            </Button>
            </>
          }
        </ButtonGroup>
      </Flex>
      <Divider />
    </div>
  );
};
