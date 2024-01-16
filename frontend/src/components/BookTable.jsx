import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react'
import { useSelector } from "react-redux";

function BookTable() {
  const { books } = useSelector((store) => store.bookReducer);

  return (
    <TableContainer p={5}>
      <Table variant="striped" colorScheme="teal" size={"lg"} mt={10}>  
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Genre</Th>
            <Th>Upload Time</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        {books.length > 0 &&
          books.map((ele) => {
            return <Tr key={ele._id}>
              <Td>{ele.title}</Td>
              <Td>{ele.author}</Td>
              <Td>{ele.genre}</Td>
              <Td>{ele.createdAt}</Td>
              <Td><Button colorScheme='blue'>Edit</Button></Td>
              <Td><Button colorScheme='red'>Delete</Button></Td>
            </Tr>
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default BookTable;
