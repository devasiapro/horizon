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
  Box
} from '@chakra-ui/react';
import { useAuthHook } from '../hooks/useAuthHook';

export const CustomerPerformanceGraph = () => {
  const [graph, setGraph] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  const arr = Array.from({length: moment().date()}, (_, i) => i + 1);
  const labels = arr.map(el => String(el).padStart(2, '0'));

  const currentMonth = String(moment().month() + 1).padStart(2, '0');
  const currentYear = moment().year();

  const startDate = currentYear + '-' + currentMonth + '-01';
  const endDate = currentYear + '-' + currentMonth + '-' + String(moment().date()).padStart(2, '0');

  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;
  const customerId = params.customerId;

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/${customerId}/report/ggr`, {
              params: {
                start_date: startDate,
                end_date: endDate 
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
          }
        ); 

        const gameSessions = response.data;
        const emptyGgrs = [];
        for (let i = 0; i < arr.length; i++) {
          emptyGgrs[i] = 0;
        }

        gameSessions.forEach(gameSession => {
          const index = moment(gameSession.datePlayed).date() - 1;
          emptyGgrs[index] = emptyGgrs[index] + Number(gameSession.totalIncome);
        });
        setGraph({
          labels: labels,
          datasets: [
            {
              label: '',
              data: emptyGgrs,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      } catch (err) {
        console.log('err', err);
      } finally {

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
      <Bar options={options} data={graph} />
    </Box>
  );
};
