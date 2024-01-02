import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  Grid,
  SimpleGrid,
  GridItem,
  Box,
  Heading
} from "@chakra-ui/react";

export const DistributionChart = ({ gameSessions }) => {
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

  useEffect(() => {
    const gameTypeCategories = {
      'Live Games': 0,
      'Slot Machines': 0,
      'Progressive Slot Machines': 0 
    };
    gameSessions.current.forEach(gameSession => {
      if (gameSession.game.gameType.name in gameTypeCategories) {
        gameTypeCategories[gameSession.game.gameType.name] += Number(gameSession.totalIncome);
      }
    });
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
  }, [gameSessions]);

  return (
    <Card>
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
    </Card>
  );
};
