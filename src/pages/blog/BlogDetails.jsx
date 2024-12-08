import { Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import { ArrowBackIosNew } from '@mui/icons-material'

export default function BlogDetails() {
    const [list, setList] = useState()
    const { id } = useParams()
    //console.log(id)

    const fetchData = async (data) => {

        try {
            const { data } = await axiosInstance.get(endPoints.blog.blogDetails + id)
            console.log(data)
            setList(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])


    return (
        <Box bgcolor={'#f5f5f5'} padding={4}>
            <Typography variant="h1" color="initial" fontSize={40}>
                {list?.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: list?.postText }}>

            </Typography>
            <Link to="/blogs">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIosNew />}

                >
                    Back to Blogs Page
                </Button>
            </Link>


        </Box>
    )
}
