import { useState, useEffect } from 'react';
import { 
  Grid, 
  GridItem,
  Flex
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { PerformanceCard } from './PerformanceCard';
import { CustomerPerformanceGraph } from './CustomerPerformanceGraph';
import { CustomerPerformanceTable } from './CustomerPerformanceTable';
import { useAuthHook } from '../hooks/useAuthHook';

export const CustomerPerformanceView = ({ customer }) => {
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

  const params = useParams();
  const customerId = params.customerId;
  const useAuth = useAuthHook();
  const token = useAuth.getToken();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/${customerId}/player-count`, {
            headers: {
              Authorization: `Bearer ${token}`
            } 
          }
        ); 
        console.log('response', response.data);
        setDailyPlayerStat({
          value: response.data.daily,
          label: 'Daily Players',
          movement: Number(response.data.daily_movement),
        });
        setWeeklyPlayerStat({
          value: response.data.weekly,
          label: 'Weekly Players',
          movement: Number(response.data.weekly_movement),
        });
        setMonthlyPlayerStat({
          value: response.data.monthly,
          label: 'Monthly Players',
          movement: Number(response.data.monthly_movement),
        });

      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);
  
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
        <CustomerPerformanceGraph />
      </GridItem>
      <GridItem w="100^">
        <CustomerPerformanceTable label={"Country"} />
      </GridItem>
    </Grid>
  );
};
