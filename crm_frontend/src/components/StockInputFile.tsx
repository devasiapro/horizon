import React, { useRef, useState } from 'react';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
  Button,
  Text,
  Flex
} from "@chakra-ui/react";

export const StockInputFile = ({ onChangeCallback }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  
  const onChange = (ev) => {
    setFileName(ev.target.files[0].name);
    onChangeCallback(ev.target.files[0]);
  };

  return (
    <React.Fragment>
      <Flex>
        <Button onClick={() => fileInputRef.current.click()} type="button" colorScheme="horizon">
          <AttachmentIcon boxSize={6} /> Upload File
        </Button>
        <Text ml="20px" mt="10px">{fileName}</Text>
      </Flex>
      <input 
        ref={fileInputRef}
        style={{display: 'none' }} 
        type="file" 
        onChange={(ev) => onChange(ev)}
      />
    </React.Fragment>
  );
};
