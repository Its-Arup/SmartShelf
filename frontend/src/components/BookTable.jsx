import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { DeleteBook } from "../redux/books/action";

function BookTable() {
  const { books } = useSelector((store) => store.bookReducer);
  const { user } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch()

  const handleDeleteBook = (id)=>{
    console.log(id);
    dispatch(DeleteBook(id))
  }

  
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
              return (
                <Tr key={ele._id}>
                  <Td>{ele.title}</Td>
                  <Td>{ele.author}</Td>
                  <Td>{ele.genre}</Td>
                  <Td>{moment(ele.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Td>
                  {user._id == ele.userId && (
                    <Td>
                      <Button colorScheme="blue">Edit</Button>
                    </Td>
                  )}
                  {user._id == ele.userId && (
                    <Td>
                      <Button colorScheme="red" onClick={()=>handleDeleteBook(ele._id)}>Delete</Button>
                    </Td>
                  )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default BookTable;
