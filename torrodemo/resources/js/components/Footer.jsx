import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box
      mt="100px"
      borderTop="1px"
      color={'gray'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Box as="a" href={'/'}>
            Home
          </Box>
          <Box as="a" href={'/guide'}>
            Guide
          </Box>
        </Stack>
        <Text>© 2023 Horizon88. All rights reserved</Text>
      </Container>
    </Box>
  )
}

