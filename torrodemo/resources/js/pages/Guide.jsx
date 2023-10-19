import React from 'react';
import { 
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading
} from '@chakra-ui/react';

import { NavigationBar } from '../components/NavigationBar';
import { Footer } from '../components/Footer';
import { Tutorial } from '../components/Tutorial';
import { ApiReference } from '../components/ApiReference';
import { CallbackUrlReference } from '../components/CallbackUrlReference';

export const Guide = () => {
  return (
    <div>
      <NavigationBar />
      <Tabs isFitted>
        <TabList>
          <Tab pt="20px" pb="20px">Tutorial</Tab>
          <Tab pt="20px" pb="20px">API Reference</Tab>
          <Tab pt="20px" pb="20px">Callback URL Reference</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tutorial />
          </TabPanel>
          <TabPanel>
            <ApiReference /> 
          </TabPanel>
          <TabPanel>
            <CallbackUrlReference />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </div>
  );
};
