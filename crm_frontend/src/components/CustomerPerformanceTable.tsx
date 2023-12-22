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
  Box,
  Center
} from '@chakra-ui/react';

export const CustomerPerformanceTable = ({ gameSessions, label }) => {
  const [tabular, setTabular] = useState([]); 

  useEffect(() => {
    const countries = {};
    gameSessions.current.forEach(gameSession => {
      countries[gameSession.player.countryName] = {
        income: 0,
        bets: 0  
      }; 
    });
    gameSessions.current.forEach(gameSession => {
      countries[gameSession.player.countryName] = {
        income: countries[gameSession.player.countryName]['income'] + Number(gameSession.totalIncome),
        bets: countries[gameSession.player.countryName]['bets'] + Number(gameSession.totalBets)
      };
    });

    const countryList = [];
    for (const country in countries) {
      countryList.push({
        country,
        income: countries[country].income,
        bets: countries[country].bets
      });
    }
    setTabular(countryList);
  }, [gameSessions]);

  return (
    <Box 
      p="6px"
      boxShadow={"lg"} 
      border={"1px"} 
      borderColor={"#eee"} 
      align="center" 
      rounded="lg"
    >
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
                  <Tr key={row.country}>
                    <Td><Center>{row.country}</Center></Td>
                    <Td><Center>{row.bets.toLocaleString()}</Center></Td>
                    <Td><Center>{row.income.toLocaleString()}</Center></Td>
                  </Tr>
                );
              })
            }
          </Tbody>
        </Table>
     </TableContainer> 
    </Box>
  );
};
