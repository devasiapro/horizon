import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Box,
  Center
} from '@chakra-ui/react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import moment from 'moment';
import { useAuthHook } from '../hooks/useAuthHook';

export const CustomerPerformanceTable = ({ label }) => {
  const [tabular, setTabular] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const customerId = params.customerId;

  const startDate = moment().startOf('month');
  const endDate = moment().subtract(1, 'days');

  const fetchRanking = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/customer/${customerId}/rank`, {
          params: {
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
            category: 'country',
            indicator: 'ggr',
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    ); 
    return Promise.resolve(response.data);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRanking();
        const items = [];
        for (const key in response) {
          items.push({
            category: key,
            income: response[key].income,
            bets: response[key].bets
          });
        }
        console.log('items', items);
        setTabular(items);
      } catch (err) {
        console.log('err', err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  return (
    <Box 
      p="6px"
      boxShadow={"lg"} 
      border={"1px"} 
      borderColor={"#eee"} 
      align="center" 
      rounded="lg"
    >
      <Skeleton isLoaded={!isLoading}>
        <TableContainer>
            <Table variant='striped' colorScheme='horizon'>
              <Thead>
                <Tr>
                  <Th>
                    <Center>{label}</Center>
                  </Th>
                  <Th><Center>Bets</Center></Th>
                  <Th><Center>Income</Center></Th>
                </Tr>
              </Thead>
              <Tbody>
                { tabular.map(row => {
                    return (
                      <Tr key={row.category}>
                        <Td><Center>{row.category}</Center></Td>
                        <Td><Center>{row.bets.toLocaleString()}</Center></Td>
                        <Td><Center>{row.income.toLocaleString()}</Center></Td>
                      </Tr>
                    );
                  })
                }
              </Tbody>
            </Table>
         </TableContainer> 
       </Skeleton>
    </Box>
  );
};
