import { Button, TextField, Typography, Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axiosInstance from '../../../api/axios'
import { endPoints } from '../../../api/endPoints'
import { Key } from '@mui/icons-material'

export default function Registration() {
    const [image, setImage] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()


    const ClickFuntion = async (data) => {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("mobile", data.mobile)
        formData.append("password", data.password)
        formData.append("photo", image)
        try {
            const { data } = await axiosInstance.post(endPoints.auth.register, formData)
            if (data.status === 200) {
                toast.success(data.message)
                navigate("/")

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box width={600} marginX={'auto'} marginTop={4} bgcolor={'#f5f5f5'} display={'flex'} flexDirection={'column'} gap={2} padding={4}>
                <form autoComplete="off" >

                    <Typography color="text.primary"
                        fontSize={40}
                        fontWeight="semiBold"
                        sx={{
                            p: 2,
                            mb: 2,
                            width: { xs: '100%', sm: 'auto' },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: 2,
                        }}>
                        Registration Form
                    </Typography>


                    <TextField
                        {...register("name", {
                            required: "Name is required"
                        })}
                        label="name"
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="text"
                        error={errors.name}
                        helperText={errors.name && errors.name.message}
                    />


                    <TextField
                        {...register("email", {
                            required: "email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format"

                            }
                        })}
                        label="email"
                        required
                        sx={{ mb: 2 }}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="email"
                        error={errors.email}
                        helperText={errors.email && errors.email.message}
                    />


                    <TextField
                        {...register("mobile", {
                            required: "mobile is required"
                        })}
                        label="mobile"
                        required
                        sx={{ mb: 2 }}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        fullWidth
                        error={errors.mobile}
                        helperText={errors.mobile && errors.mobile.message}
                    />

                   

                    <TextField
                        {...register("password", {
                            required: "password is required"
                        })}
                        label="password"
                        required
                        sx={{ mb: 2 }}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="password"
                        error={errors.password}
                        helperText={errors.password && errors.password.message}

                    />

                    <TextField
                        {...register("photo", {
                            required: "photo is required",
                        })}
                        type="file"
                        variant='outlined'
                        inputProps={{ accept: 'image/*' }}
                        color='secondary'
                        onChange={(e) => setImage(e.target.files[0])}
                        error={!!errors.photo}
                        helperText={errors.photo && errors.photo.message}
                        fullWidth
                        sx={{ backgroundColor: 'white', borderRadius: '5px', mb: 4 }}

                        slotProps={{
                            inputLabel: {
                                sx: {
                                    color: "#000",
                                }
                            },
                            input: {
                                sx: {
                                    backgroundColor: "white",
                                    color: "#000",
                                },
                            }
                        }}
                    />

                    <Stack direction={{ xs: "column-reverse", sm: "row" }} style={{ display: `${image ? 'flex' : 'none'}`, justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                        <img src={image && URL.createObjectURL(image)} height={100} width={"auto"} style={{ borderRadius: '10px' }} />
                        {image && (
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Selected file: {image.name}
                            </Typography>
                        )}
                    </Stack>

                    <Button
                        type="submit"
                        variant="outlined"
                        color="info"
                        size="small"
                        disableElevation
                        fullWidth
                        sx={{ mb: 2, py: 1 }}
                        onClick={handleSubmit(ClickFuntion)}
                    >
                        Registration
                    </Button>

                    <Link to="/">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<Key />}

                        >
                            Already have an account? Login
                        </Button>
                    </Link>


                </form>
            </Box>
        </>
    )
}