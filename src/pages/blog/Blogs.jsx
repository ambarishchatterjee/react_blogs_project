import React, { useEffect, useState } from 'react'
import { endPoints } from '../../api/endPoints'
import axiosInstance from '../../api/axios'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid2, Typography, List, ListItem, IconButton, ListItemAvatar, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
//import Categories from './Categories'
import { FolderCopy, LinkRounded } from '@mui/icons-material'
import { imagefrombuffer } from "imagefrombuffer";

export default function Blogs() {
    const [list, setList] = useState()
    const [cat, setCat] = useState()
    const [blank, setBlank] = useState(false)





    const fetchData = async (data) => {

        try {
            const { data } = await axiosInstance.get(endPoints.blog.blogList)
            console.log(data.data)
            setBlank(false)
            setList(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategoriesData = async (data) => {
        try {
            const data = await axiosInstance.get(endPoints.blog.showAllCategory)
            //console.log(data.data.data)
            setCat(data.data.data)

        } catch (error) {
            console.log(error)
        }

    }
    const handleClick = async (id) => {
        try {
            const data = await axiosInstance.get(endPoints.blog.categoryPost + id)
            console.log(data.data.data)
            data.data.data.length < 1 ? setBlank(true) : setBlank(false)
            setList(data.data.data)
            //setcategoryName(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchCategoriesData()
    }, [])


    return (
        <Container>
            <Grid2 container spacing={2}>
                <Grid2 size={4}>

                    {/* Categorylist */}

                    <Box bgcolor={'#f5f5f5'} padding={4} marginX={'auto'} justifyContent={'left'}>
                        <Typography variant="h1" color="initial" fontSize={30} marginTop={2} textAlign={'left'}>
                            All Categories
                        </Typography>
                        <List>
                            {!cat && (
                                "No data"
                            )}
                            {cat && (
                                cat.map((category) => {
                                    return (
                                        <ListItem key={category._id} secondaryAction={
                                            // <Link to={`/category/${category._id}`}>
                                            <IconButton edge="end" onClick={() => handleClick(category._id)}>
                                                <LinkRounded />
                                            </IconButton>
                                            //</Link>

                                        }>

                                            <ListItemAvatar>
                                                <FolderCopy />
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {category.category}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })
                            )}


                        </List>
                    </Box>

                </Grid2>
                <Grid2 size={8}>

                    <Box marginX={'auto'} padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"row"} flexWrap={'wrap'} gap={2} textAlign={'left'} justifyContent={'left'}>
                        {blank && "No blogs available for this category"}
                        {list?.map((blog) => {


                            return (

                                <Card style={{ width: '45%' }} key={blog._id}>
                                   

                                    <CardMedia
                                        component="img"
                                        alt={blog.title}
                                        height="140"
                                         image={`https://swarupapp.in/api/blog/image/${blog._id}`}
                                        //image={`data:${blog?.photo?.contentType};base64,${blog?.photo?.data}`}
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

                    <Button variant="contained" color="secondary" fullWidth onClick={fetchData}>
                        Check all blogs
                    </Button>


                </Grid2>

            </Grid2>


        </Container>
    )
}
