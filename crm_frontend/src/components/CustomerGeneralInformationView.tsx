import React, { useState, useEffect } from 'react';
import {
  Divider,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Image,
  Box,
  Flex,
  Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';
import { InlineInputText } from './InlineInputText';
import { StockFormButton } from './StockFormButton';

export const CustomerGeneralInformationView = ({ setCustomer, customer }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [contactForms, setContactForms] = useState([]);

  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const navigate = useNavigate();

  const addContactForm = () => {
    setContactForms([...contactForms, 
      {
        id: Math.random() * (1000 - 1) + 1,
        labelEmail: 'Email',
        email: '',
        labelSkypeId: 'Skype ID',
        skypeId: '',
        labelTestUserCredential: 'Test User Credential',
        testUserCredential: ''
      }        
    ]); 
  };

  const updateGeneralInformation = async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/customer/${customer.id}`, {
        instance: customer.instance ? customer.instance.name : null,
        kiosk: customer.kiosk ? customer.kiosk.name : null
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  const createNewContacts = async () => {
    const contacts = contactForms.map(contact => {
      return {
        email: contact.email,
        skype_id: contact.skypeId,
        test_user_credential: contact.testUserCredential
      };
    });
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/contact`, {
        customer: customer.id,
        contacts
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  const deleteCustomer = async (ev) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/customer/${customer.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/customer');
    } catch (err) {
      console.log('err', err);
    }
  };

  const update = async (ev) => {
    ev.preventDefault();
    setIsEditMode(false);
    updateGeneralInformation();
    createNewContacts();
  };

  return ( 
    <form onSubmit={(ev) => update(ev)}>
      <Box textAlign="end">
        {
          !isEditMode &&
          <Button 
            onClick={() => setIsEditMode(true)}
            bg="white" 
            colorScheme="white" 
            size="xs"
          >
            <Image boxSize="30px" src="/images/edit_icon.svg" />
          </Button>
        }
        {
          isEditMode &&
          <Button 
            onClick={(ev) => update(ev)}
            colorScheme="horizon" 
            size="sm"
          >
            Save
          </Button>
        }
        <Button 
          type={"button"} 
          onClick={(ev) => {deleteCustomer(ev)}} 
          bg={"white"}
          colorScheme={"white"} 
          size={"xs"}
        >
          <Image boxSize="30px" src="/images/delete_icon.svg" />
        </Button>
      </Box>
      <Grid mt="40px" templateColumns='repeat(7, 1fr)' gap={2}>
        <GridItem align="center" colSpan={1}>
          <Box bg="grey" h="150px" w="150px">
            &nbsp;
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <InlineInputText  
            isDisabled={!isEditMode}
            label={"Merchant"} 
            formName={"brandName"}
            onChange={(ev) => setCustomer({...customer, brandName: ev.target.value})}
            value={customer.brandName}
          />
          <InlineInputText 
            isDisabled={!isEditMode}
            label={"Group"} 
            formName={"group"}
            onChange={(ev) => {
                setCustomer({...customer, parent: {
                  ...customer.parent, brandName: ev.target.value
                }})
              }
            }
            value={customer.parent.brandName}
          />
          <InlineInputText 
            isDisabled={true}
            label={"Integration Type"} 
            formName={"integrationType"}
            onChange={(ev) => {}}
            value={customer.walletType.name}
          />
          <InlineInputText isDisabled={!isEditMode} label={"Website"} />
          <InlineInputText isDisabled={!isEditMode} label={"Test User Credentials"} />
          <InlineInputText isDisabled={!isEditMode} label={"Currency"} />
          <InlineInputText isDisabled={!isEditMode} label={"Skype Group"} />
          { 
            customer.walletType.name === 'seamless' &&
            <InlineInputText 
              isDisabled={!isEditMode}
              label={"Instance"} 
              formName={"instance"}
              onChange={(ev) => {
                  setCustomer({...customer, instance: {
                    ...customer.instance, name: ev.target.value
                  }})
                }
              }
              value={customer.instance.name} 
            />
          }
          { 
            customer.walletType.name === 'transfer' &&
            <InlineInputText 
              isDisabled={!isEditMode}
              label={"Kiosk"} 
              formName={"kiosk"}
              onChange={(ev) => {
                  setCustomer({...customer, kiosk: {
                    ...customer.kiosk, name: ev.target.value
                  }})
                }
              }
              value={customer.kiosk.name} 
            />
          }
        </GridItem>
        <GridItem colSpan={3}>
          <Flex>
            <Heading>
              Contact Details:
            </Heading> 
            {
              isEditMode && (
                <Button 
                  ms={2}
                  onClick={(ev) => addContactForm(ev)}
                  colorScheme="horizon" 
                  size="sm"
                >
                  Additional Contact
                </Button>
              )
            }
          </Flex>

          {
            contactForms.map((contactForm, index) => {
              return (
                <React.Fragment key={contactForm.id}>
                  <InlineInputText 
                    label={contactForm.labelEmail} 
                    value={contactForm.email}  
                    onChange={(ev) => {
                      setContactForms(contactForms.map((contactForm, index2) => {
                        if (index === index2) {
                          contactForm['email'] = ev.target.value;
                        }
                        return contactForm;
                      }))
                    }}
                  />
                  <InlineInputText 
                    label={contactForm.labelSkypeId} 
                    value={contactForm.skypeId}  
                    onChange={(ev) => {
                      setContactForms(contactForms.map((contactForm, index2) => {
                        if (index === index2) {
                          contactForm['skypeId'] = ev.target.value;
                        }
                        return contactForm;
                      }))
                    }}
                  />
                  <InlineInputText 
                    label={contactForm.labelTestUserCredential} 
                    value={contactForm.testUserCredential}  
                    onChange={(ev) => {
                      setContactForms(contactForms.map((contactForm, index2) => {
                        if (index === index2) {
                          contactForm['testUserCredential'] = ev.target.value;
                        }
                        return contactForm;
                      }))
                    }}
                  />
                  <Divider mb={"4"} />
                </React.Fragment>
              );
            })
          }

          {
            customer.contacts.map(contact => {
              return (
                <React.Fragment key={contact.id}>
                  <InlineInputText  
                    isDisabled={true}
                    label={"Email"} 
                    onChange={(ev) => {}}
                    value={contact.email ?? ''}
                  />
                  <InlineInputText  
                    isDisabled={true}
                    label={"Skype ID"} 
                    onChange={(ev) => {}}
                    value={contact.skypeId ?? ''}
                  />
                  <InlineInputText  
                    isDisabled={true}
                    label={"Test User Credential"} 
                    onChange={(ev) => {}}
                    value={contact.testUserCredential ?? '' }
                  />
                  <Divider mb={5} />
                </React.Fragment>
              ); 
            })
          }
        </GridItem>
      </Grid>
    </form>
  );
};
