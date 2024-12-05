import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import Categories from './Categories'

export default function CategoryPost() {
    const [list, setList] = useState()
    const { id } = useParams()

    const fetchData = async (data) => {
        try {
            const data = await axiosInstance.get(endPoints.blog.categoryPost + id)
            console.log(data)
            setList(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <Container>

            <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    <Categories />
                </Grid2>
                <Grid2 size={8}>

                    <Box marginX={'auto'}  padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"row"} flexWrap={'wrap'} gap={2} textAlign={'left'} justifyContent={'left'}>

                        {list?.map((blog) => {
                            //console.log(product._id)
                            return (

                                <Card style={{ width: '45%' }}  key={blog._id}>
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
                    <Link to="/blogs">
                        <Button variant="contained" color="secondary" fullWidth>
                            Check all blogs
                        </Button>
                    </Link>
                </Grid2>
            </Grid2>

        </Container>
    )
}
