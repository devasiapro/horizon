import React, { useState, useContext, useEffect } from 'react';
import { 
  Show,
  Spacer,
  Flex,
  Text,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Container,
  Box ,
  FormControl,
  FormHelperText,
  FormLabel,
  Tooltip,
  Select,
  Button
} from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';

import { CustomerEditTransferStep } from '../components/CustomerEditTransferStep';
import { FormTransferContext } from '../context/FormTransferContext';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { StockInputFile } from '../components/StockInputFile';

export const CustomerContract = () => {
  const [ isFormComplete, setIsFormComplete ] = useState(false);
  const [ contractStatuses, setContractStatuses ] = useState([]);
  const [ contractLabel, setContractLabel ] = useState('');
  const [ contractStatusId, setContractStatusId ] = useState(0);
  const [ contractFile, setContractFile ] = useState({});
  const [ contractFileId, setContractFileId] = useState(0);
  const [ contractFilename, setContractFilename] = useState('');

  const navigate = useNavigate();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;

  const params = useParams();
  const customerId = params.customerId;

  const onBack = () => {
    navigate(`/customer`);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('contract_file', contractFile, contractFile.name);
      formData.append('contract_status_id', contractStatusId);
      formData.append('contract_label', contractLabel);
      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/customer/${customerId}/contract`, 
          formData, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
      setContractFileId(response.data.contract_file_id);
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  }; 

  const onFileChange = (file: File) => {
    setContractFile(file);
  };

  const fetchContractStatus = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/contract-status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };   

  const fetchCustomerContract = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/${customerId}/contract`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };

  const downloadFile = async () => {
    try {
      window.open(`${import.meta.env.VITE_API_URL}/contract-file/${contractFileId}/download`, '_blank');
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const responses = await Promise.all([
          fetchContractStatus(), 
          fetchCustomerContract()
        ]);
        setContractStatuses(responses[0].data);
        const customer = responses[1].data;
        setContractLabel(customer.contract_label ?? '');
        setContractStatusId(customer.contract_status_id);
        setContractFileId(customer.contract_files ? customer.contract_files[0].id : 0);
        setContractFilename(customer.contract_files ? customer.contract_files[0].filename : '');
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  return (
    <Container maxW={"800px"} my={{ base: "10px", sm: "20px", md: "30px" }}>
      <Card borderRadius={"8px"}>
        <CardHeader
          pb={{ base: 0, sm: 1, md: 2, lg: 5 }}
          color={"horizon.300"}
        >
          <Heading size={["sm", "md", "lg"]}>CONTRACTS</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={() => onSubmit()}>
            <FormControl mb={3} variant={"horizon"}>
              <FormLabel ml={"15px"} fontSize={["sm", "md", "lg"]}>Status</FormLabel>
              <Select value={contractStatusId} onChange={(ev) => setContractStatusId(ev.target.value)}>
                {contractStatuses.map(contractStatus => {
                  return (
                    <option 
                      key={contractStatus.id} 
                      value={contractStatus.id} 
                    >
                      {contractStatus.name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <StockInputText 
              label={"Contract Label"} 
              formName={"contactLabel"}
              onChange={(e) => setContractLabel(e.target.value)}
              value={contractLabel}
            /> 

            <StockInputFile originalFilename={contractFilename} onChangeCallback={onFileChange} />
 
            {contractFileId > 0 && 
            <Button type="button" mt="4px" colorScheme="horizon" onClick={() => downloadFile()}>
              <DownloadIcon boxSize={6} />
            </Button>
            }

            <Flex mt="40px">
              <StockFormButton label={"Back"} onClick={(e) => onBack()}/>
              <Spacer />
              <StockFormButton 
                label={"Update"}
                toolTipText={"Complete all fields in order to continue"} 
                isEnabled={true}
                onClick={(e) => onSubmit()}
              />
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};
