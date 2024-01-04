import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  Grid,
  SimpleGrid,
  Skeleton,
  GridItem,
  Box,
  Heading
} from "@chakra-ui/react";
import axios from 'axios';

import { useAuthHook } from '../hooks/useAuthHook';

export const DistributionChart = ({ 
  currentDateStart, 
  currentDateEnd,
  previousDateStart, 
  previousDateEnd,
}) => {
  const [chartData, setChartData] = useState({
    labels: ['Live Games', 'Progressive', 'Slot Games'],
    datasets: [
      {
        label: 'GGR',
        data: [0, 0, 0],
        backgroundColor: [
          '#EAF4D8',
          '#84B332',
          '#374A16',
        ],
        borderColor: [
          '#EAF4D8',
          '#84B332',
          '#374A16',
        ],
        borderWidth: 1,
      },
    ]
  });
  const [isLoading, setIsLoading] = useState(false);

  const useAuth = useAuthHook();
  const token = useAuth.getToken();

  const fetchDistributionReport = async (dateStart, dateEnd) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/report/distribution/ggr`, {
          params: {
            start_date: dateStart,
            end_date: dateEnd
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
        const gameTypeCategories = await fetchDistributionReport(
          currentDateStart.format('YYYY-MM-DD'), 
          currentDateEnd.format('YYYY-MM-DD')
        );
        setChartData({
          labels: ['Live Games', 'Progressive', 'Slot Games'],
          datasets: [
            {
              label: 'GGR',
              data: [
                gameTypeCategories['Live Games'], 
                gameTypeCategories['Progressive Slot Machines'], 
                gameTypeCategories['Slot Machines']
              ],
              backgroundColor: [
                '#EAF4D8',
                '#84B332',
                '#374A16',
              ],
              borderColor: [
                '#EAF4D8',
                '#84B332',
                '#374A16',
              ],
              borderWidth: 1,
            },
          ]
        });
      } catch (err) {
        console.log('err', err);
      } finally {
        setIsLoading(false);
      } 
    };
    init();
  }, []);

  return (
    <Card>
      <Skeleton isLoaded={!isLoading}>
        <CardBody>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={{ base: 12, lg: 6 }}>
              <Pie data={chartData} />
            </GridItem>
            <GridItem colSpan={{ base: 12, lg: 6 }}>
              <Heading mt={20} textAlign={'center'} size={'2xl'} color={'#374A16'}>
                GGR Distribution 
              </Heading>
            </GridItem>
          </Grid>
        </CardBody>
      </Skeleton>
    </Card>
  );
};
