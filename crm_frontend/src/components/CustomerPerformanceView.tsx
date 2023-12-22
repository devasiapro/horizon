import { useState, useEffect } from 'react';
import { 
  Grid, 
  GridItem,
  Flex
} from '@chakra-ui/react';
import moment from 'moment';
import { PerformanceCard } from './PerformanceCard';
import { CustomerPerformanceGraph } from './CustomerPerformanceGraph';
import { CustomerPerformanceTable } from './CustomerPerformanceTable';

export const CustomerPerformanceView = ({ 
  gameSessions, 
  customer,
}) => {
  const [dailyPlayerStat, setDailyPlayerStat] = useState({
    value: 0,
    label: 'Daily Players',
    movement: 0.00
  });
  const [weeklyPlayerStat, setWeeklyPlayerStat] = useState({
    value: 0,
    label: 'Total Weekly Players',
    movement: 0.00
  });
  const [monthlyPlayerStat, setMonthlyPlayerStat] = useState({
    value: 0,
    label: 'Monthly Weekly Players',
    movement: 0.00
  });

  const yesterday = moment().subtract(1, 'days');
  const weekBefore = moment().subtract(8, 'days');

  const currentDateStart = yesterday.clone().weekday(0).format('YYYY-MM-DD');
  const currentDateEnd = yesterday.format('YYYY-MM-DD');
  const currentMonthStart = moment().startOf('month').clone().format('YYYY-MM-DD');;
  const previousDateStart = weekBefore.clone().weekday(0).format('YYYY-MM-DD');
  const previousDateEnd = weekBefore.format('YYYY-MM-DD');
  const previousMonthStart = moment()
    .subtract(1, 'months')
    .clone()
    .startOf('month')
    .format('YYYY-MM-DD');
  
  useEffect(() => {
    const totalCurrentDaily = gameSessions.current.filter(gameSession => {
      return gameSession.datePlayed == currentDateStart;
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const totalPreviousDaily = gameSessions.previous.filter(gameSession => {
      return gameSession.datePlayed == previousDateStart;
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const movementDaily = (((totalCurrentDaily / totalPreviousDaily) * 100) - 100);
    setDailyPlayerStat({
      value: totalCurrentDaily,
      label: 'Daily Players',
      movement: movementDaily
    });

    const totalCurrentWeekly = gameSessions.current.filter(gameSession => { 
      return moment(currentDateStart).unix() <= moment(gameSession.datePlayed).unix() <= moment(currentDateEnd).unix();
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const totalPreviousWeekly = gameSessions.previous.filter(gameSession => {
      return moment(previousDateStart).unix() <= moment(gameSession.datePlayed).unix() <= moment(previousDateEnd).unix();
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const movementWeekly = (((totalCurrentWeekly / totalPreviousWeekly) * 100) - 100);
    setWeeklyPlayerStat({
      value: totalCurrentWeekly,
      label: 'Total Weekly Players',
      movement: movementWeekly
    });

    const totalCurrentMonthly = gameSessions.current.filter(gameSession => { 
      console.log(currentMonthStart, gameSession.datePlayed, currentDateEnd);
      return moment(currentMonthStart).unix() <= moment(gameSession.datePlayed).unix() <= moment(currentDateEnd).unix();
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const totalPreviousMonthly = gameSessions.previous.filter(gameSession => {
      return moment(previousMonthStart).unix() <= moment(gameSession.datePlayed).unix() <= moment(previousDateEnd).unix();
    })
    .reduce((total, current) => {
      return total + Number(current.playersCount);
    }, 0);
    const movementMonthly = (((totalCurrentMonthly / totalPreviousMonthly) * 100) - 100);
    setMonthlyPlayerStat({
      value: totalCurrentMonthly,
      label: 'Total Monthly Players',
      movement: movementMonthly
    });

  }, [gameSessions]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <GridItem w="100%">
        <Flex justifyContent={"space-between"} grow={1} gap={2}>
          <PerformanceCard 
            movementPercent={dailyPlayerStat.movement} 
            value={dailyPlayerStat.value}
            label={dailyPlayerStat.label} 
          />
          <PerformanceCard 
            movementPercent={weeklyPlayerStat.movement} 
            value={weeklyPlayerStat.value}
            label={weeklyPlayerStat.label} 
          />
          <PerformanceCard 
            movementPercent={monthlyPlayerStat.movement} 
            value={monthlyPlayerStat.value}
            label={monthlyPlayerStat.label} 
          />
        </Flex>
        <CustomerPerformanceGraph customerId={customer.id} />
      </GridItem>
      <GridItem w="100^">
        <CustomerPerformanceTable gameSessions={gameSessions} label={"Brand"} />
      </GridItem>
    </Grid>
  );
};
