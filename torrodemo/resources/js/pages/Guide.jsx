import React from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { 
  Text,
  Card,
  Code,
  Container,
  CardBody,
  CardHeader,
  Heading
} from '@chakra-ui/react';
import { Footer } from '../components/Footer';

export const Guide = () => {
  const sampleCode = `
// NodeJS sample implementation
import axios from 'axios';
import crypto from 'crypto';

const API_KEY = 'API_KEY_FROM_ADMIN';
const SECRET_KEY = 'SECRET_KEY_FROM_ADMIN';
 
const casinoUserId = 'CASINO44';
const username = 'goldenplayor';
const hash = crypto
  .createHash('md5')
  .update(casinoUserId + username + SECRET_KEY)
  .digest('hex');

const length = JSON.stringify({
  'casino_user_id': casinoUserId,
  'username': username,
  'hash': hash
}).length;

const call = async () => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await axios.post('https://api.torrospins.com/api/add/user', {
      'casino_user_id': casinoUserId,
      'username': username,
      'hash': hash,
    }, { 
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': length,
        'X-Api-Key': API_KEY
      }, 
    });
    console.log('response', response.data);
  } catch (err) {
    console.log('err' ,err);
  }
};

call();
  `
  return (
    <div>
      <NavigationBar />
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        Torrospin Integration Guide
      </Heading>

      <Container maxW='container.md'>
        <Card>
          <CardHeader>
            <Heading>Add User</Heading>
          </CardHeader>
          <CardBody>
            <Code>
              <pre>
              {sampleCode}
              </pre>
            </Code>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading>Request Link</Heading>
          </CardHeader>
          <CardBody>
            <Code>
              <pre>
              </pre>
            </Code>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};
