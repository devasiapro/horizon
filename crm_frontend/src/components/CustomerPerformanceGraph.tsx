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

export const CustomerPerformanceGraph = ({ gameSessions }) => {
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
  const token = useAuth.getToken();
  const customerId = params.customerId;

  useEffect(() => {
    const emptyGgrs = [];
    for (let i = 0; i < arr.length; i++) {
      emptyGgrs[i] = 0;
    }
    gameSessions.current.forEach(gameSession => {
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
  }, [gameSessions]);

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
