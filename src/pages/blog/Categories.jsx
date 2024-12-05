import React, { useEffect, useState } from 'react'
import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import axiosInstance from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import { FolderCopy, LinkRounded } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Categories() {
    const [list, setList] = useState()

    const handleClick = () =>{

    }
    const fetchData = async (data) => {
        try {
            const data = await axiosInstance.get(endPoints.blog.showAllCategory)
            //console.log(data.data.data)
            setList(data.data.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <Box bgcolor={'#f5f5f5'} padding={4}  marginX={'auto'} justifyContent={'left'}>
                <Typography variant="h1" color="initial" fontSize={30} marginTop={2} textAlign={'left'}>
                    All Categories
                </Typography>
                <List>
                    {list && (
                        list.map((category) => {
                            return (
                                <ListItem key={category._id} secondaryAction={
                                    <Link to={`/category/${category._id}`}>
                                        <IconButton edge="end"  onClick={()=>handleClick(category._id)}>
                                            <LinkRounded />
                                        </IconButton>
                                    </Link>

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

        </>
    )
}
