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
    { id: 1, text: 'Pending' },
    { id: 2, text: 'Shipped' },
    // Add more orders as needed
  ];

const OrderManagementPage = () => {

  const classes = useStyles();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [render, setRender] = useState(false);
  const [ordersData, setOrdersData] = useState([
    { id: 1, item: 'Chicken', total: 50.0, status: 1 },
    { id: 2, item: 'Banana', total: 75.0, status: 2 },
    { id: 3, item: 'Sausage', total: 50.0, status: 1 },
    { id: 4, item: 'Chicken', total: 75.0, status: 2 },
    { id: 5, item: 'Chicken', total: 50.0, status: 1 },
    { id: 6, item: 'Sausage', total: 75.0, status: 2 },
    { id: 7, item: 'Banana', total: 50.0, status: 1 },
    { id: 8, item: 'Banana', total: 75.0, status: 2 },
    { id: 9, item: 'Sausage', total: 50.0, status: 1 },
    { id: 10, item: 'Banana', total: 75.0, status: 2 },
    // Add more orders as needed
]);



  useEffect(() => {
    setDataOnRender();
  }, [ordersData])
  
  const setDataOnRender = () =>{
    setDataFiltered(ordersData.slice(page*rowsPerPage,rowsPerPage))
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
  const handleChangeitem = (event) =>{
    var tempData = selectedOrder
    tempData.item = event.target.value
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
    .post(`https://dummy.com/ordermanagement/getData`, { 
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
    .post(`https://dummy.com/ordermanagement/updateOrder`, { 
        id:selectedOrder.id,
        status:selectedOrder.status,
        item:selectedOrder.item,
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
                <TableCell>Item</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFiltered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.item}</TableCell>
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
                        label="item"
                        defaultValue="item"
                        value={selectedOrder.item}
                        onChange={handleChangeitem}
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
                        label="Age"
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

export default OrderManagementPage;