import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  SimpleGrid,
  Heading,
  Skeleton,
  Box
} from '@chakra-ui/react';
import { useAuthHook } from '../hooks/useAuthHook';

export const CustomerPerformanceGraph = () => {
  const [graph, setGraph] = useState({
    labels: [],
    datasets: [
      {
        label: 'Month to Date Daily GGR',
        data: [],
        backgroundColor: '#84B332',
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);

  const arr = Array.from({length: moment().date()}, (_, i) => i + 1);
  const labels = arr.map(el => String(el).padStart(2, '0'));

  const currentMonth = String(moment().month() + 1).padStart(2, '0');
  const currentYear = moment().year();

  const startDate = currentYear + '-' + currentMonth + '-01';
  const endDate = currentYear + '-' + currentMonth + '-' + String(moment().date()).padStart(2, '0');

  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getToken();
  const customerId = params.customerId;

  const fetchDailyReport = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/customer/${customerId}/daily-total`, {
          params: {
            start_date: startDate,
            end_date: endDate,
            category: 'ggr',
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
        const response = await fetchDailyReport();
        console.log('response2', response);
        const days = [];
        for (const key in response) {
          days.push(moment(key, 'YYYY-MM-DD').date());
        }

        const currents = [];
        for (const key in response) {
          currents.push(response[key].toFixed(2));
        }
        setGraph({
          labels: days,
          datasets: [
            {
              label: 'Month to Date Daily GGR',
              data: currents,
              backgroundColor: '#84B332',
            },
          ],
        });
      } catch (err) {
        console.log('err', err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: null,
        text: '',
      },
    },
  };

  return (
    <Box 
      mt="20px"
      p="6px"
      boxShadow={"lg"} 
      border={"1px"} 
      borderColor={"#eee"} 
      align="center" 
      rounded="lg"
    >
      <Skeleton isLoaded={!isLoading}>
        <Bar options={options} data={graph} />
      </Skeleton>
    </Box>
  );
};
