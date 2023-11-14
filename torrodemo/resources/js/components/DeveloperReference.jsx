import React from 'react';
import {
  Container,
  Center,
  Code,
  Box,
  Tag,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList
} from '@chakra-ui/react';

export const DeveloperReference = () => {
  const sampleParameters = `
{
  "casino_user_id": "myuser12",
  "username": "my_user"
}
  `;
  const sampleHashedParameters = `
{
  "casino_user_id": "myuser12",
  "username": "my_user",
  "hash": "HASHKEYHERE"
}
  `;

  const sampleNodeHash = `#NodeJS

import crypto from "crypto";

const hash = crypto
  .createHash('md5')
  .update(casinoUserId + username + SECRET_KEY)
  .digest('hex');
  `;
  const samplePhpHash = `#PHP

$hash = md5($casinoUserId . $username . config('torro.secret_key'));
  `;
  return (
    <React.Fragment>
      <Heading mt="40px" align="center" mb="40px" fontSize="2xl">
        Developer Reference 
      </Heading>
      <Center>  
      <Box p="20px" w="1024px" borderRadius="md" borderWidth="1px">
        <Accordion allowToggle>
          <AccordionItem>
            <Text as="b">
              <AccordionButton bg="blue.50">
                <Box display="flex" as="span" flex="1" textAlign="left">
                  Hashing
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <Text>
                Hashing is simply the process of transforming any given key or a string of 
                characters into another value. In Torrospin's case, it is used for security 
                by ensuring that the parameters you passed are intact from third-party hackers.
              </Text>
            
              <Box mt="20px">
                <Text as="b">How to Hash:</Text>
              </Box>
            
              <Text>
                Hashing is performed to the body parameters of an API call. The values of the said
                parameter are combined as a single string that reflects their order in the body.
                The SECRET KEY provided to you when you registered to Torrospin is appended.
                That one line of string is then hashed using MD5 algorithm. 
                Here is the step-by-step details with examples:
              </Text>
              <OrderedList>
                <ListItem mt="20px"> 
                  <Text>
                    Prepare the parameters. Let's say you have the following parameter 
                    for the api/add/user:
                  </Text>
                  <Code>
                    <pre>
                      {sampleParameters} 
                    </pre> 
                  </Code>
                </ListItem> 
                <ListItem mt="20px"> 
                  <Text>
                    Concatenate the values according to the order in the body. That means
                    "myuser12my_user" is correct while "my_usermyuser12" is wrong. We now have
                    <Tag>"myuser12my_user"</Tag> as the unhashed string.
                  </Text>
                </ListItem> 
                <ListItem mt="20px"> 
                  <Text>
                    Append the SECRET KEY provided to you. Our unhashed string is now
                    <Tag>"myuser12my_userMYHASHKEY"</Tag>.
                  </Text>
                </ListItem> 
                <ListItem mt="20px"> 
                  <Text>
                    Hashed the string using MD5 algorithm. Here are examples of how to do so in
                    different languages:
                  </Text>
                  <Code>
                    <pre>{sampleNodeHash}</pre>
                  </Code>
                  <Code mt="20px">
                    <pre>{samplePhpHash}</pre>
                  </Code>
                </ListItem> 
                <ListItem mt="20px"> 
                  <Text>
                    Finally, include the generated hashed in the body parameters:
                  </Text>
                  <Code>
                    <pre>
                      {sampleHashedParameters} 
                    </pre> 
                  </Code>
                </ListItem> 
              </OrderedList> 
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      </Center>
    </React.Fragment>
  );
};
