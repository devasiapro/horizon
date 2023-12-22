import { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Image,
  Box,
  Heading
} from '@chakra-ui/react';
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';
import { InlineInputText } from './InlineInputText';
import { StockFormButton } from './StockFormButton';

export const CustomerGeneralInformationView = ({ setCustomer, customer }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;

  const update = async (ev) => {
    ev.preventDefault();
    setIsEditMode(false);
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
        <Button bg="white" colorScheme="white" size="xs">
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
          <Heading>Contact Details:</Heading>
          <InlineInputText label={"Name"} />
          <InlineInputText label={"Email"} />
          <InlineInputText label={"Skype ID"} />
          <InlineInputText label={"Test User Credentials"} />
        </GridItem>
      </Grid>
    </form>
  );
};
