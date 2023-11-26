import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TablePagination,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios, {isCancel, AxiosError} from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: useTheme().spacing(4),
    paddingBottom: useTheme().spacing(4),
  },
  paper: {
    padding: useTheme().spacing(2),
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: useTheme().palette.background.paper,
    boxShadow: useTheme().shadows[5],
    padding: useTheme().spacing(2, 4, 3),
    width:'50vw'
  },
  containerForm:{
    display:'flex',
    flexDirection:'column',
    paddingTop: useTheme().spacing(2),
    paddingBottom: useTheme().spacing(2),
  },
  containerTextfield:{
    width:'100%',
    marginTop: useTheme().spacing(2),
    marginBottom: useTheme().spacing(2),
  },
  buttonContainer:{
    display:'flex',
    justifyContent:'flex-end'
  }
}));


const dropdownList = [
    { id: 1, text: 'Active' },
    { id: 2, text: 'Inactive' },
    // Add more orders as needed
  ];

const CustomerManagement = () => {

  const classes = useStyles();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [render, setRender] = useState(false);
  const [ordersData, setOrdersData] = useState([
    { id: 1, name: 'PT. Jogn Doe', total: 50.0, status: 1 },
    { id: 2, name: 'PT. John Smith', total: 75.0, status: 2 },
    { id: 3, name: 'PT. Mrs Smith', total: 50.0, status: 1 },
    { id: 4, name: 'PT. Mr Smith', total: 75.0, status: 2 },
    { id: 5, name: 'PT. Sir Smith', total: 50.0, status: 1 },
    { id: 6, name: 'PT. Allright Smith', total: 75.0, status: 2 },
    { id: 7, name: 'PT. Monday Smith', total: 50.0, status: 1 },
    { id: 8, name: 'PT. Power Smith', total: 75.0, status: 2 },
    { id: 9, name: 'PT. Cool Smith', total: 50.0, status: 1 },
    { id: 10, name: 'PT. Fast Smith', total: 75.0, status: 2 },
    // Add more orders as needed
]);



  useEffect(() => {
    setDataOnRender();
  }, [ordersData])
  
  const setDataOnRender = () =>{
    setDataFiltered(ordersData.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage))
  }

  const handleOpenModal = (order) => {
    let data = JSON.stringify(order);

    setSelectedOrder(JSON.parse(data));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let data = ordersData.slice(newPage*rowsPerPage,newPage*rowsPerPage+rowsPerPage);
    setDataFiltered(data);
    setRender(!render)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Handle TextField
  const handleChangename = (event) =>{
    var tempData = selectedOrder
    tempData.name = event.target.value
    setSelectedOrder(tempData)
    setRender(!render)
  }

  const handleChangeTotal = (event) =>{
    var tempData = selectedOrder
    tempData.total = event.target.value
    setSelectedOrder(tempData)
    setRender(!render)
  }

  const handleChangeStatus = (event) =>{
    var tempData = selectedOrder
    tempData.status = event.target.value
    setSelectedOrder(tempData)
    setRender(!render)
  }

  const handleSave = () =>{
    let index = ordersData.findIndex(x=>x.id == selectedOrder.id)
    let tempData = ordersData
    tempData[index] = selectedOrder
    setOrdersData(tempData)
    setDataOnRender();
    setRender(!render)
    handleCloseModal();
  }

  const dummyToken = localStorage.getItem("token")
  const getData = async () =>{
    await axios
    .post(`https://dummy.com/customermanagement/getData`, { 
        page:page,
        rowCount:rowsPerPage
    },
    {
        headers: {
          Authorization: 'Bearer ' + dummyToken
        }
    })
    .then((res) => {
        setOrdersData(res.data);
    });
  }
  
  const saveData = async () =>{
    await axios
    .post(`https://dummy.com/customermanagement/updateCustomer`, { 
        id:selectedOrder.id,
        status:selectedOrder.status,
        name:selectedOrder.name,
        total: selectedOrder.total
    },
    {
        headers: {
          Authorization: 'Bearer ' + dummyToken
        }
    })
    .then((res) => {
        setOrdersData(res.data);
    });
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="order management table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order Count</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFiltered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{dropdownList.find(x=>x.id == order.status).text}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenModal(order)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ordersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Order Details Modal */}
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <div className={classes.modalPaper}>
            <Typography variant="h5" gutterBottom>
              Order Details
            </Typography>
            {selectedOrder && (
              <div>
                <Typography variant="subtitle1">
                  ID: {selectedOrder.id}
                </Typography>
                <div className={classes.containerForm}>
                    <TextField
                        id="outlined-required"
                        label="name"
                        defaultValue="name"
                        value={selectedOrder.name}
                        onChange={handleChangename}
                    />
                    <div className={classes.containerTextfield}>
                    <TextField
                        id="outlined-required"
                        label="Total"
                        defaultValue="Total"
                        value={selectedOrder.total}
                        type="number"
                        fullWidth
                        onChange={handleChangeTotal}
                    />
                    </div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedOrder.status}
                        label="Status"
                        onChange={handleChangeStatus}
                    >
                        {dropdownList.map((data,index)=>{
                            return(
                            <MenuItem value={data.id}>{data.text}</MenuItem>
                            )
                        })}

                    </Select>
                </div>
                {/* Add more order details as needed */}
              </div>
            )}
            <div className={classes.buttonContainer}>
                <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
                >
                Close
                </Button>

                <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{marginLeft:'10px'}}
                >
                Save
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default CustomerManagement;