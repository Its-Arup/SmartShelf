import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { EditBook } from "../redux/books/action";

function EditBookModal({ isOpen, onClose, id, toast }) {

    const [bookdata, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
      });
      
      const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setBookData((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };
    
      const handleBookEdit = () => {
        dispatch(EditBook(id,bookdata,toast))
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Enter Title</FormLabel>
            <Input
              placeholder="Title"
              type="text"
              name="title"
              value={bookdata.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Enter Auther Name</FormLabel>
            <Input
              placeholder="Author"
              type="text"
              name="author"
              value={bookdata.author}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Genre</FormLabel>
            <Select value={bookdata.genre} name="genre" onChange={handleChange}>
              <option value="" disabled>
                Select Genre
              </option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="horror">Horror</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleBookEdit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditBookModal



