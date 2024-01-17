import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

const App = () => {
  // State for header fields
  const [headerData, setHeaderData] = useState({
    vr_no: '',
    vr_date: '',
    ac_name: '',
    ac_amt: '',
    status: 'A',
    ac_number: '',
  });

  // State for detail fields
  const [detailData, setDetailData] = useState([
    {
      sr_no: 1,
      item_code: '',
      item_name: '',
      description: '',
      qty: '',
      rate: '',
    },
  ]);

  // Fetch detail data from the API
  useEffect(() => {
    fetch('http://5.189.180.8:8010/detail')
      .then((response) => response.json())
      .then((data) => {
        setDetailData(data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  // Handler to update header fields
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler to update detail fields
  const handleDetailChange = (e, index) => {
    const { name, value } = e.target;
    setDetailData((prevData) => {
      const updatedDetailData = [...prevData];
      updatedDetailData[index] = {
        ...updatedDetailData[index],
        [name]: value,
      };
      return updatedDetailData;
    });
  };


  // Handler to remove a row from the detail table


  // Handler for form submission
  const handleSubmit = () => {
    // Validate form data here

    // Prepare data for API call
    const postData = {
      header_table: headerData,
      detail_table: detailData,
    };

    // Call the API to save data
    fetch('http://5.189.180.8:8010/header/multiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved successfully', data);
        // Add logic to show success message or redirect to another page
      })
      .catch((error) => {
        console.error('Error saving data', error);
        // Add logic to show error message
      });
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Entry Screen</Heading>
      {/* HEADER SECTION */}
      <Box mb={4}>
        <label>VR Number:</label>
        <Input
          type="text"
          name="vr_no"
          value={headerData.vr_no}
          onChange={handleHeaderChange}
        />

        <label>VR Date:</label>
        <Input
          type="date"
          name="vr_date"
          value={headerData.vr_date}
          onChange={handleHeaderChange}
        />

        <label>AC Name:</label>
        <Input
          type="text"
          name="ac_name"
          value={headerData.ac_name}
          onChange={handleHeaderChange}
        />

        <label>AC Amount:</label>
        <Input
          type="text"
          name="ac_amt"
          value={headerData.ac_amt}
          onChange={handleHeaderChange}
        />

        <label>Status:</label>
        <Select
          name="status"
          value={headerData.status}
          onChange={handleHeaderChange}
        >
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </Select>

        <label>AC Number:</label>
        <Input
          type="text"
          name="ac_number"
          value={headerData.ac_number}
          onChange={handleHeaderChange}
        />
        <Button onClick={handleSubmit} colorScheme="teal" style={{marginTop:10}}>
        Submit
      </Button>
      </Box>

      {/* DETAIL SECTION */}
      <Box mb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item Code</Th>
              <Th>Item Name</Th>
              <Th>Description</Th>
              <Th>Quantity</Th>
              <Th>Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detailData.map((detail, index) => (
              <Tr key={index}>
                <Td>
                 
                   {detail.item_code}
        
                 
                </Td>
                <Td>
                {detail.item_name}
                </Td>
                <Td>
                {detail.description}
                </Td>
                <Td>
                {detail.qty}
                </Td>
                <Td>
                {detail.rate}

                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    
      </Box>

      
    </Box>
  );
};

export default App;
