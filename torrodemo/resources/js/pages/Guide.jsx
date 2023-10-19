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
      <Tabs>
        <TabList>
          <Tab>Tutorial</Tab>
          <Tab>API Reference</Tab>
          <Tab>Callback URL Reference</Tab>
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
