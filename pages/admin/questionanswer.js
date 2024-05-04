import React, { useEffect, useState } from 'react'
import DashTheme from './Component/DashTheme'
import { Box, FormControl, Grid, Button, TextField, Dialog, DialogTitle, IconButton, DialogActions, DialogContent, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, InputLabel, Select, MenuItem, Badge } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic'; // Importing dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Making ReactQuill dynamic to prevent server-side rendering

import 'react-quill/dist/quill.snow.css'; // Import styles

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const MyEditor = () => <></>;

MyEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image' ],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

MyEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];





import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const questionanswer = () => {
  let router = useRouter()



  const [allQAData, setAllQAData] = useState([])
  const [allSubCategoryData, setAllSubCategoryData] = useState([])
  const [opencategory, setOpencategory] = React.useState(false);
  const [uid, setUid] = useState(null)




  const handleClickOpenQA = () => {
    setOpencategory(true);
  };
  const handleClose = () => {
    setOpencategory(false);
  };

  const formik = useFormik({
    initialValues: {
      questions: '',
      answer: '',
      subcatagoryID: ''
    },
    onSubmit: async values => {
      console.log(values);
      try {
        if (uid && uid.length) {
          let res = await axios.patch(`${process.env.BASE_URL}questions/${uid}`, values, {
            headers: {
              Authorization: localStorage.getItem("Admin_Token")
            }
          })
          setUid(null)
        } else {

          let res = await axios.post(`${process.env.BASE_URL}questions/create`, values, {
            headers: {
              Authorization: localStorage.getItem("Admin_Token")
            }
          })
          console.log(res);
        }
        handleClose()
        allQADataCallApi()
        formik.resetForm()
      } catch (error) {
        console.log(error);
      }

    },
  });

  let allQADataCallApi = async () => {
    try {
      let res = await axios.get(`${process.env.BASE_URL}questions/`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })
      console.log(res.data.data);
      setAllQAData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let allSubCategoryDataCallApi = async () => {
    try {
      let res = await axios.get(`${process.env.BASE_URL}subcatagory`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })

      setAllSubCategoryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let DeleteQA = async (id) => {
    try {
      let res = await axios.delete(`${process.env.BASE_URL}questions/${id}`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })
      allQADataCallApi()
    } catch (error) {
      console.log(error);
    }
  }

  let UpdateQA = (id) => {
    handleClickOpenQA()
    let findData = allQAData.find((el) => el._id === id)
    console.log(findData);
    formik.setFieldValue('questions', findData?.questions)
    formik.setFieldValue('answer', findData?.answer)
    formik.setFieldValue('subcatagoryID', findData?.subcatagoryID?._id)
    setUid(id)
  }
  useEffect(() => {
    let Admin_Token = localStorage.getItem("Admin_Token")
    if (!Admin_Token) {
      router.push("/admin/login")
    }
    allQADataCallApi()
    allSubCategoryDataCallApi()
  }, [])



  return (
    <DashTheme>
      <Box >
        <Box sx={{ marginBottom: "15px" }}>
          <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} columns={{ xs: 4, lg: 12 }}>
              <Grid item xs={6} md={10}>
                {/* this is empty for search bar */}
              </Grid>
              <Grid item xs={6} md={2}>
                <Button variant="contained" sx={{ width: "100%", padding: "15px 20px" }} onClick={handleClickOpenQA}>Add Q & A</Button>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={opencategory}
                >
                  <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                      Add Q & A
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <TextField id="questions" name='questions' type='text' label="Question" variant="outlined" onChange={formik.handleChange} value={formik.values.questions} sx={{ width: "100%", marginBottom: "15px" }} />
                      {/* <TextField id="answer" name='answer' type='text' label="Answer" variant="outlined" onChange={formik.handleChange} value={formik.values.answer} sx={{ width: "100%", marginBottom: "15px" }} /> */}
                      <Box sx={{ width: "100%", marginBottom: "15px", zIndex: 999 }}>
                        <ReactQuill
                          id='answer'
                          value={formik.values.answer} // Remove this line
                          onChange={(value) => formik.setFieldValue('answer', value)} // Add this line
                          modules={MyEditor.modules}
                          formats={MyEditor.formats}
                        />
                      </Box>
                      <FormControl fullWidth>
                        <InputLabel id="subcatagoryID">Sub-Category Name</InputLabel>
                        <Select
                          labelId="subcatagoryID"
                          id="subcatagoryID"
                          name="subcatagoryID"
                          value={formik.values.subcatagoryID}
                          label="Sub-Category Name"
                          onChange={formik.handleChange}
                          sx={{ width: "100%" }}
                        >
                          {
                            allSubCategoryData.map((el) => {
                              if (el.status === 'on') {
                                return (
                                  <MenuItem key={el?._id} value={el?._id}>{el?.subCatagoryname}</MenuItem>
                                )
                              }
                            })
                          }
                        </Select>

                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button variant='contained' type='submit'>
                        Submit
                      </Button>
                    </DialogActions>
                  </form>
                </BootstrapDialog>
              </Grid>
            </Grid>

          </Box>
        </Box>
        <Box >
          <TableContainer sx={{ borderRadius: "3px", border: '1px solid #ccc' }}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell>Questions</StyledTableCell>
                  <StyledTableCell>Answer</StyledTableCell>
                  <StyledTableCell>Sub-Catagory</StyledTableCell>
                  <StyledTableCell>Catagory</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                  <StyledTableCell align="right">Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allQAData.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell >{row?.questions}</StyledTableCell>
                    <StyledTableCell >{row?.answer}</StyledTableCell>
                    <StyledTableCell >
                      <Badge color={row?.subcatagoryID?.status === "on" ? "success" : "secondary"} variant="dot">
                        {row?.subcatagoryID?.subCatagoryname}
                      </Badge>
                    </StyledTableCell>
                    <StyledTableCell >
                      <Badge color={row?.subcatagoryID?.catagoryID?.status === "on" ? "success" : "secondary"} variant="dot">
                        {row?.subcatagoryID?.catagoryID.catagoryName}
                      </Badge>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton aria-label="delete" onClick={() => DeleteQA(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => UpdateQA(row._id)}>
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

    </DashTheme >
  )
}

export default questionanswer 