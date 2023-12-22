import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Heading,
  Spacer,
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from 'axios';
import { StockInputText } from '../components/StockInputText';
import { StockFormButton } from '../components/StockFormButton';
import { useAuthHook } from "../hooks/useAuthHook";

export const CustomerCreate = () => {
  const [errors, setErrors] = useState({
    generalError: '',
    operatorName: '',
    group: '',
    integrationType: '',
    contactPerson: '',
    email: '',
    skypeGroup: ''
  });
  const [operatorName, setOperatorName] = useState('');
  const [group, setGroup] = useState('');
  const [integrationType, setIntegrationType] = useState(1);
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [skypeGroup, setSkypeGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const navigate = useNavigate();

  const submit = async (ev) => {
    ev.preventDefault();
    const payload = {
      brand_name: operatorName,
      parent: group,
      wallet_type_id: Number(integrationType),
      contact_person: contactPerson,
      email: email,
      skype_group: skypeGroup,
    };
    try {
      setIsLoading(true);
      setErrors({
        generalError: '',
        operatorName: '',
        group: '',
        integrationType: '',
        contactPerson: '',
        email: '',
        skypeGroup: ''
      });
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer`, 
        payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      navigate('/customer/create/success'); 
    } catch (err) {
      console.log('err', err);
      if (err.response && err.response.status === 400) {
        const errs = err.response.data;
        setErrors({
          operatorName: errs.brand_name ? errs.brand_name.map(a => a.replace('brand_name', 'operator name')) : '',
          contactPerson: errs.contact_person ? errs.contact_person.map(a => a.replace('contact_person', 'contact person')) : '',
          email: errs.email,
          group: errs.parent ? errs.parent.map(a => a.replace('parent', 'group')) : '',
          skypeGroup: errs.skype_group ? errs.skype_group.map(a => a.replace('skype_group', 'skype group')) : '',
        });
      } else {
        setErrors({
          generalError: 'error encountered',
          operatorName: '',
          group: '',
          integrationType: '',
          contactPerson: '',
          email: '',
          skypeGroup: ''
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex mt={20} mb={20}>
      <Spacer flex='1' />
      <Box flex='2'>
        <Card>
          <CardBody>
            <Heading color={'#374A16'} size="lg" mb="5">
              Integration Form
            </Heading>
            <form onSubmit={(ev) => submit(ev)}>
              { errors.generalError &&
                <Alert status='error'>
                  <AlertIcon />
                  An error was encountered. Please contact the admins.
                </Alert>
              }
              <StockInputText 
                helperText={"Required"}
                label={"Operator Name"} 
                formName={"operatorName"}
                onChange={(e) => {setOperatorName(e.target.value)}}
                errorMessage={errors.operatorName}
                value={operatorName}
              />
              <StockInputText 
                helperText={"Optional"}
                label={"Group"} 
                formName={"group"}
                onChange={(e) => {setGroup(e.target.value)}}
                errorMessage={errors.group}
                value={group}
              />

              <FormControl mb={3}>
                <FormLabel fontSize={["sm", "md", "lg"]}>Integration Type</FormLabel>
                <Select 
                  value={integrationType}
                  onChange={(ev) => setIntegrationType(ev.target.value)} 
                  bg={'#EAF4D8'}
                >
                  <option value={1}>Seamless</option> 
                  <option value={2}>Transfer</option> 
                </Select>
              </FormControl>

              <StockInputText 
                helperText={"Optional"}
                label={"Contact Person"} 
                formName={"contactPerson"}
                onChange={(e) => {setContactPerson(e.target.value)}}
                errorMessage={errors.contactPerson}
                value={contactPerson}
              />
              <StockInputText 
                helperText={"Optional"}
                label={"Email"} 
                formName={"email"}
                onChange={(e) => {setEmail(e.target.value)}}
                errorMessage={errors.email}
                value={email}
              />
              <StockInputText 
                helperText={"Optional"}
                label={"Skype Group"} 
                formName={"skypeGroup"}
                onChange={(e) => {setSkypeGroup(e.target.value)}}
                errorMessage={errors.skypeGroup}
                value={skypeGroup}
              />
              <Box align="right">
                <StockFormButton 
                  isLoading={isLoading}
                  isEnabled={true}
                  label={"Submit"}
                  onClick={(e) => submit(e)}
                />
              </Box>
            </form>
          </CardBody>
        </Card>
      </Box>
      <Spacer flex='1' />
    </Flex>
  );
};
