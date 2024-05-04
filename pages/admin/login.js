import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

const login = () => {
    let router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            try {
                let res = await axios.post(`${process.env.BASE_URL}admin/login`,values)
                localStorage.setItem("Admin_Token",res.data.token);
                
                router.push('/admin')
            } catch (error) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        let Admin_Token = localStorage.getItem("Admin_Token")
        if(Admin_Token && Admin_Token.length){
            router.push('/admin')
        }
    },[])
    return (
        <>
            <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: {xs : "90%" , sm : "60%", md : "30%"}, borderRadius: "25px", padding: {xs :"10px" , sm : "20px" , md : "25px"}, border: "2px solid #1976d2", boxShadow : "0 0 5px #1976d2"}}>
                    <Typography variant='h4' component={'h1'} align='center' sx={{marginBottom : "20px", fontWeight : "bold", color : "#1976d2"}}>Admin Panel</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField sx={{ width: "100%", marginBottom: "20px" }} id="email" name='email' type='text' label="Email" variant="outlined" onChange={formik.handleChange} value={formik.values.email} />
                        <TextField sx={{ width: "100%", marginBottom: "20px" }} id="password" name='password' type='password' label="Password" variant="outlined" onChange={formik.handleChange} value={formik.values.password} />
                        <Box sx={{ width: "100%", display: "flex", justifyContent: 'center' }}><Button type='submit' variant="contained">Submit</Button></Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default login