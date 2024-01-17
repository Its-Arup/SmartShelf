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
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBook } from "../redux/books/action";
import EditBookModal from "./EditBookModal";

function BookTable() {

  const[bookId, setBookId] =useState("");

  const { books } = useSelector((store) => store.bookReducer);
  const { user } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteBook = (id)=>{
    dispatch(DeleteBook(id,toast))
  }

  const handleEdit = (id) => {
    setBookId(id)
    onOpen()
  }
  return (
    <>
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
                      <Button colorScheme="blue" onClick={()=>handleEdit(ele._id)}>Edit</Button>
                      
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
    <EditBookModal isOpen={isOpen} onClose={onClose} id={bookId}/>
    </>
  );
}

export default BookTable;
