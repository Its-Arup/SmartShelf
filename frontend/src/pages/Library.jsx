import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  useDisclosure,
  Input,
  Select,
  Grid,
} from "@chakra-ui/react";
import AddBookModal from "../components/AddBookModal";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../redux/books/action";
import BookTable from "../components/BookTable";

function Library() {
  const [order, setOrder] = useState("");
  const [searchinp, setsearchinp] = useState("");
  const [sort, setSort] = useState("");
  const [bookTimingBefore, setBookTimingBefore] = useState("");
  const [bookTimingAfter, setBookTimingAfter] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books } = useSelector((store) => store.bookReducer);
  const { user } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();

  // this function is handeling filter input tag
  const handleSortOrder = (e) => {
    setOrder(e.target.value);
  };

  // this function is handeling Search input tag
  const hadelSearch = (e) => {
    setsearchinp(e.target.value);
  };

  // this function is handeling Sort input tag
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  // this is function is handeling 10mis before addded books

  const handleBefore = ()=>{
    setBookTimingBefore(1)
    setBookTimingAfter("")
  }

  // this function is handeling addded books in last 10mis  
  const handleAfter = ()=>{
    setBookTimingAfter(1)
    setBookTimingBefore("")
  }


  useEffect(() => {

    let params = {
      order: order,
      q: searchinp,
      sort: sort,
      old : bookTimingBefore,
      _new : bookTimingAfter
    };

    dispatch(GetBooks(params));
  }, [order, searchinp, sort,bookTimingBefore,bookTimingAfter]);

  console.log(books);
  return (
    <>
      <Flex flexDirection={"column"} p={5}>
        <p> User : {user.userName}</p>
        <p>
          Access Role :
          {user.role.map((ele, i) => (
            <span style={{ padding: "5px" }} key={i}>
              {ele}
            </span>
          ))}
        </p>
      </Flex>

      <Grid templateColumns={"3fr 1fr 1fr"} px={5} gap={5}>
        <Flex>
          <Button colorScheme="blue" onClick={onOpen} mr={5}>
            Add Book
          </Button>
          <Input
            type="text"
            placeholder="Search Books"
            value={searchinp}
            onChange={hadelSearch}
            w="400px"
          />
        </Flex>

        <Flex gap={5}>
          <Select value={order} onChange={handleSortOrder}>
            <option value="">
              Sort By
            </option>
            <option value="oldtonew">Oldest to Newest</option>
            <option value="newtoold">Newest to Oldest</option>
          </Select>
          <Select value={sort} onChange={handleSort}>
            <option value="" >
              Select Genre
            </option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="horror">Horror</option>
          </Select>
        </Flex>
        <Flex justifyContent="space-evenly">
          <Button colorScheme="blue" onClick={handleAfter}>Resent Added</Button>
          <Button colorScheme="blue" onClick={handleBefore}>Old Added</Button>
        </Flex>
      </Grid>

      <AddBookModal isOpen={isOpen} onClose={onClose} />
      <BookTable />
    </>
  );
}

export default Library;
