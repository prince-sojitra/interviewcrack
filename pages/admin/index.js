import React, { useEffect, useState } from 'react'
import DashTheme from './Component/DashTheme'
import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'

const index = () => {
  let router = useRouter()
  let [categoryCount, setCategoryCount] = useState("")
  let [subCategoryCount, setSubCategoryCount] = useState("")
  let [questionsCount, setQuestionsCount] = useState("")
  let countCategoryAPiCall = async () => {
    try {
      let res = await axios.get(`${process.env.BASE_URL}catagory/count`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })
      setCategoryCount(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  let countsubCategoryAPiCall = async () => {
    try {
      let res = await axios.get(`${process.env.BASE_URL}subcatagory/count`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })
      console.log(res.data.data);
      setSubCategoryCount(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  let countquestionsAPiCall = async () => {
    try {
      let res = await axios.get(`${process.env.BASE_URL}questions/count`, {
        headers: {
          Authorization: localStorage.getItem("Admin_Token")
        }
      })
      setQuestionsCount(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let Admin_Token = localStorage.getItem("Admin_Token")
    if (!Admin_Token) {
      router.push("/admin/login")
    }
    countCategoryAPiCall()
    countsubCategoryAPiCall()
    countquestionsAPiCall()
  }, [])
  return (
    <div>
      <DashTheme>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4}>
            <Box sx={{ boxShadow: "0px 0px 5px #ccc", padding: "20px", borderRadius: '5px' }}>
              <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: 'center', marginBottom: "20px" }}>Total Category</Typography>
              <Typography variant='h3' sx={{ fontWeight: "bold", textAlign: 'center' }}>{categoryCount ? categoryCount : 0}</Typography>

            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ boxShadow: "0px 0px 5px #ccc", padding: "20px", borderRadius: '5px' }}>
              <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: 'center', marginBottom: "20px" }}>Total Sub Category</Typography>
              <Typography variant='h3' sx={{ fontWeight: "bold", textAlign: 'center' }}>{subCategoryCount ? subCategoryCount : 0}</Typography>

            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ boxShadow: "0px 0px 5px #ccc", padding: "20px", borderRadius: '5px' }}>
              <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: 'center', marginBottom: "20px" }}>Total Q / A</Typography>
              <Typography variant='h3' sx={{ fontWeight: "bold", textAlign: 'center' }}>{questionsCount ? questionsCount : 0}</Typography>

            </Box>
          </Grid>
        </Grid>
      </DashTheme>
    </div>
  )
}

export default index