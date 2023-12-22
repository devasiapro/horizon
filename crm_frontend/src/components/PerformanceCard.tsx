import {
  Card,
  CardBody,
  Text,
  Box
} from '@chakra-ui/react';

export const PerformanceCard = ({ label, movementPercent, value }) => {
  return (
    <Card 
      w="100%" 
      boxShadow={"lg"} 
      border={"1px"} 
      borderColor={"#eee"} 
      align="center" 
      rounded="lg"
    >
      <CardBody>
        <Box>    
          <Text color={"#374A16"} as={"b"} fontSize={"lg"} align={"center"}>
            {label}
          </Text>
        </Box>    
        <Box align="center" mt={2}>
          <Text color={"#374A16"} as={"b"} fontSize={"xl"} align={"center"}>{value}</Text>
        </Box>    
        <Box align="center">
          <Text color={"#374A16"} fontSize={"xs"} align={"center"}>
            { movementPercent >= 0 ? '+' : '' }
            {movementPercent.toFixed(2)} %
          </Text>
        </Box>    
      </CardBody>
    </Card>
  );
};
