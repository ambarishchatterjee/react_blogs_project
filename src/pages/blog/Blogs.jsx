import React, { useEffect, useState } from 'react'
import { endPoints } from '../../api/endPoints'
import axiosInstance from '../../api/axios'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid2, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Categories from './Categories'

export default function Blogs() {
    const [list, setList] = useState()



    const fetchData = async (data) => {

        try {
            const { data } = await axiosInstance.get(endPoints.blog.blogList)
            console.log(data.data)
            setList(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Container>
            <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    <Categories />
                </Grid2>
                <Grid2 size={8}>
            
            <Box marginX={'auto'} padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"row"} flexWrap={'wrap'} gap={2} textAlign={'left'} justifyContent={'left'}>
                {list?.map((blog) => {
                    //console.log(product._id)
                    return (

                        <Card style={{ width: '45%' }}   >
                            <CardMedia
                                component="img"
                                alt={blog.title}
                                height="140"
                                image={`https://swarupapp.in/api/blog/image/${blog._id}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" dangerouslySetInnerHTML={{ __html: blog.title }}>

                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: blog.postText.length <= 18 ? blog.postText : (blog.postText.substr(0, 248) + "...") }}>

                                </Typography>


                            </CardContent>
                            <CardActions>
                                <Link to={`/blog/${blog._id}`}>
                                    <Button size="small" >Learn More</Button>
                                </Link>

                            </CardActions>
                        </Card>




                    )
                })}



            </Box>
            <Link to="/categories">
                <Button variant="contained" color="secondary" fullWidth>
                    Check all categories
                </Button>
            </Link>

            </Grid2>

</Grid2>


        </Container>
    )
}
