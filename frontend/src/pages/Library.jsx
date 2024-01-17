import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  useDisclosure,
  Input,
  Select,
  Grid,
  FormLabel,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import AddBookModal from "../components/AddBookModal";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../redux/books/action";
import BookTable from "../components/BookTable";
import { Navigate } from "react-router-dom";
import { updateRole } from "../redux/auth/action";

function Library() {
  const [order, setOrder] = useState("");
  const [searchinp, setsearchinp] = useState("");
  const [sort, setSort] = useState("");
  const [bookTimingBefore, setBookTimingBefore] = useState("");
  const [bookTimingAfter, setBookTimingAfter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books } = useSelector((store) => store.bookReducer);
  const { user, isLoggedIn } = useSelector((store) => store.authReducer);
  const [userData, setUserData] = useState({...user, role : user.role});
  const[flag,setFlag]= useState(false);
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

  const handleBefore = () => {
    setBookTimingBefore(1);
    setBookTimingAfter("");
  };

  // this function is handeling addded books in last 10mis
  const handleAfter = () => {
    setBookTimingAfter(1);
    setBookTimingBefore("");
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      if (!userData.role.includes(e.target.value)) {
        setUserData((prev) => {
          return {
            ...prev,
            role: [...prev.role, e.target.value],
          };
        });
      } else {
        const updaatedRole = userData.role.filter((ele) => {
          return ele != e.target.value;
        });
        setUserData((prev) => {
          return {
            ...prev,
            role: [...updaatedRole],
          };
        });
      }
    }
  };

  const handelRoleSubmit =(e)=>{
    e.preventDefault();
    dispatch(updateRole(user._id, userData))  
    setFlag(!flag)
  }

  useEffect(() => {
    let params = {};

    if (order) {
      params.order = order;
    }
    if (searchinp) {
      params.q = searchinp;
    }
    if (sort) {
      params.sort = sort;
    }
    if (bookTimingBefore) {
      params.old = bookTimingBefore;
    }
    if (bookTimingAfter) {
      params._new = bookTimingAfter;
    }

    dispatch(GetBooks(params));
  }, [order, searchinp, sort, bookTimingBefore, bookTimingAfter,flag]);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Flex flexDirection={"column"} p={5}>
        <p> User : {user.userName}</p>
        <p>
          Access Role :
          {user.role?.map((ele, i) => (
            <span style={{ padding: "5px" }} key={i}>
              {ele}
            </span>
          ))}
        </p>
      </Flex>

      <Grid templateColumns={"2fr 1fr 1fr 1fr"} px={5} gap={5}>
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

        <Flex>
          <form onSubmit={handelRoleSubmit}>
            <FormLabel>Role</FormLabel>
            <Stack spacing={5} direction="col">
              <Checkbox
                colorScheme="blue"
                value={"CREATOR"}
                onChange={handleChange}
                isChecked={userData.role.includes("CREATOR")}
              >
                CREATOR
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                value={"VIEWER"}
                onChange={handleChange}
                isChecked={userData.role.includes("VIEWER")}
              >
                VIEWER
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                value={"VIEW_ALL"}
                onChange={handleChange}
                isChecked={userData.role.includes("VIEW_ALL")}
              >
                VIEW_ALL
              </Checkbox>
            </Stack>
            <Button colorScheme="blue" type="submit">Confirm Chnage</Button>
          </form>
        </Flex>
        <Flex gap={5}>
          <Select value={order} onChange={handleSortOrder}>
            <option value="">Sort By</option>
            <option value="oldtonew">Oldest to Newest</option>
            <option value="newtoold">Newest to Oldest</option>
          </Select>
          <Select value={sort} onChange={handleSort}>
            <option value="">Select Genre</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="horror">Horror</option>
          </Select>
        </Flex>
        <Flex justifyContent="space-evenly">
          <Button colorScheme="blue" onClick={handleAfter}>
            New Books
          </Button>
          <Button colorScheme="blue" onClick={handleBefore}>
            Old Books
          </Button>
        </Flex>
      </Grid>

      <AddBookModal isOpen={isOpen} onClose={onClose} />
      <BookTable />
    </>
  );
}

export default Library;
