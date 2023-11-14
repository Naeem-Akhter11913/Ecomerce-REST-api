import React, { useEffect, useRef, useState } from 'react'
import './profile.scss'
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card/Card'
import { getUser, updatePhoto, updateUser } from '../../redux/feature/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import axios from 'axios'


// const cloud_name = process.env.REACT_APP_CLOUD_NAME
// console.log(cloud_name)
let cloudName = "myCloide";
let uploadPreset = "abcddfs";
const uploadUrl = 'https://api.cloudinary.com/v1_1/naeemakhter/image/upload';
const Profile = () => {
    const { isLoading, user } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const [photo, setPhoto] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()
    const [role, setRole] = useState()
    const [address, setAddress] = useState()
    const [country, setCountry] = useState()
    const [profileImage, setProfileImage] = useState(null)
    let [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null);


    const saveProfile = async (e) => {
        e.preventDefault()


        const userData = {
            name: name,
            email: email,
            phone: number,
            address: address,
            country: country,
            role: role,
            photo: photo
        }
        // console.log(userData)
        await dispatch(updateUser(userData))
    }

    // const handleImageChange = (e) => {

    // }
    useEffect(() => {
        if (user === null) dispatch(getUser())
    }, [dispatch, user]);


    // console.log(user?.photo)
    useEffect(() => {
        if (user) {
            // setName(user.name)
            setEmail(user.email)
            setNumber(user.phone)
            setAddress(user.address)
            setCountry(user.country)
            setRole(user.role)
        }
    }, [dispatch, user]);


    const savePhoto = async (e) => {
        e.preventDefault()

        let imageURL;

        // imgage hosting
        try {
            if (
                profileImage !== null &&
                (profileImage.type === 'image/jpeg' || profileImage.type === 'image/jpg' || profileImage.type === 'image/png')
            ) {
                const image = new FormData()
                image.append('file', profileImage)
                image.append('upload_preset', "naeemakhter")
                image.append('cloud_name', "cloudName")

                // save image to clodinary
                const response = await fetch(uploadUrl, {
                    method: 'post',
                    body: image
                })
                
                let url = await response.json()
                imageURL = url.url.toString();
            }

            // save image to mongoBD
            let userData = {
                photo: profileImage ? imageURL : user?.photo
            }

            await dispatch(updatePhoto(userData))
            imagePreview = null
        } catch (error) {
            // toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <>
            <section>
                {isLoading && (<Loader />)}
                <div className="container">
                    <PageMenu />
                    <h2>{user?.name}</h2>
                    <div className="--flex-start profile">
                        <Card cardClass={'card'}>
                            {!isLoading && (
                                <>
                                    <div className="profile-photo">
                                        {/* <img src={user?.photo} alt="" /> */}
                                        <div>
                                            <img src={imagePreview === null ? user?.photo : imagePreview} alt="profile-image" />
                                            <h3>Role: {user?.role}</h3>
                                            {imagePreview !== null && (
                                                <div className="--center-all">
                                                    <button
                                                        className="--btn --btn-secondary"
                                                        onClick={savePhoto}
                                                    >
                                                        <AiOutlineCloudUpload size={20} /> Upload Photo

                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <form method='put' onSubmit={saveProfile}>
                                        <div>
                                            <label htmlFor="">Upload Image</label>
                                            <input
                                                type="file"
                                                name=""
                                                id=""
                                                accept='image/*'
                                                onChange={e => {
                                                    setProfileImage(e.target.files[0])
                                                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="">Name:</label>
                                            <input
                                                type="text"
                                                name='name'
                                                placeholder='name'
                                                value={name}
                                                required
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Email:</label>
                                            <input
                                                type="email"
                                                name='email'
                                                placeholder='Email'
                                                value={email}
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Phone:</label>
                                            <input
                                                type="number"
                                                name='number'
                                                placeholder='Phone Number'
                                                value={number}
                                                required
                                                onChange={e => setNumber(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Address:</label>
                                            <input
                                                type="text"
                                                name='addredd'
                                                placeholder='Address'
                                                value={address}
                                                required
                                                onChange={e => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Country:</label>
                                            <input
                                                type="text"
                                                name='country'
                                                placeholder='Country'
                                                value={country}
                                                required
                                                onChange={e => setCountry(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Role:</label>
                                            <input
                                                type="text"
                                                name='country'
                                                placeholder='Country'
                                                value={role}
                                                required
                                                onChange={e => setRole(e.target.value)}
                                            />
                                        </div>

                                        <button className='--btn --btn-primary --btn-block'>Update Profile</button>
                                    </form>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
                {/* <img src={user?.photo} alt="" /> */}
            </section>
        </>
    )
}

export default Profile
// import React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// export default function Profile() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Tabs value={value} onChange={handleChange} aria-label=" tabs example">
//       <Tab label="Active" />
//       <Tab label="Disabled"  />
//       <Tab label="Active" />
//     </Tabs>
//   );
// }
