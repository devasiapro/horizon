import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Card,
  Grid,
  Text,
  Image,
  Button,
  Heading,
  Divider,
  GridItem,
  CardBody,
  Container,
  CardFooter,
} from '@chakra-ui/react';

import { NavigationBar } from '../components/NavigationBar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export const Home = () => {
  const authContext = useContext(AuthContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/game`);
        setGames(response.data);
      } catch (err) {
        console.log('err', err);
      }
    };

    init();
  }, []);

  const randHex = (len) => {
    const maxlen = 8;
    const min = Math.pow(16, Math.min(len, maxlen) - 1);
    const max = Math.pow(16, Math.min(len, maxlen)) - 1;
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    let r = n.toString(24);
    while (r.length < len) {
       r = r + randHex(len - maxlen);
    }
    return r;
  };

  const play = async (game) => {
    try {
      const token = randHex(16);
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/game-link`, {
        token: token,
        launch_code: game.launch_code,
        device: 'desktop'
      }, {
        headers: {
          Authorization: `Bearer ${authContext.auth.token}`
        }
      });
      console.log('response', response);
      if (response.data.status === 200) {
        const gameWindow = window.open(
          `${import.meta.env.VITE_APP_URL}/play?token=${token}&game_url=${encodeURIComponent(response.data.url)}`,
          game.name, 
          'popup'
        );
      } else {
        window.alert('Error: ' + response.data.message);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container mt="40px" maxW="container.xl">
        <Heading>Slot Games</Heading>
        <Grid 
          templateColumns='repeat(6, 1fr)' 
          gap={4}
        >
        { games.map((game) => {
            if (game.game_type !== 'slot') {
              return;
            }
            return (
              <GridItem key={game.id} w='100%'>
                <Card>
                  <CardBody>
                    <Image
                      src={game.thumbnail_url}
                    />
                  </CardBody>
                  <CardFooter>
                    { authContext.auth.isSignedIn &&
                      <Button onClick={() => play(game)} variant='solid' colorScheme='green'>
                        Play
                      </Button>
                    }
                    { !authContext.auth.isSignedIn &&
                      <Text>
                        Login To Play
                      </Text>
                    }
                  </CardFooter>
                </Card>
              </GridItem>
            );
          }
        )}
        </Grid>
        <Divider borderw="1px" mt="40px" mb="40px" />
        <Heading>Live Games</Heading>
        <Grid 
          templateColumns='repeat(6, 1fr)' 
          gap={4}
        >
        { games.map((game) => {
            if (game.game_type !== 'live') {
              return;
            }
            return (
              <GridItem key={game.id} w='100%'>
                <Card>
                  <CardBody>
                    <Image
                      src={game.thumbnail_url}
                    />
                  </CardBody>
                  <CardFooter>
                    { authContext.auth.isSignedIn &&
                      <Button onClick={() => play(game)} variant='solid' colorScheme='green'>
                        Play
                      </Button>
                    }
                    { !authContext.auth.isSignedIn &&
                      <Text>
                        Login To Play
                      </Text>
                    }
                  </CardFooter>
                </Card>
              </GridItem>
            );
          }
        )}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
