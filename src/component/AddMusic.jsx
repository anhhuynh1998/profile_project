import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import noAvatar from '../assets/no-avatar.jpg'
import { changeImage, changeSong, createNewSong, resetFormSongCreate } from '../redux/musicSlice';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddMusic = () => {
    const cloudName = 'dekggnmc5';
    const unsignedUploadPrefix = 'upload';
    const API_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isImageUploaded, setisImageUploaded] = useState(false)

    const song = useSelector((state) => state.music.song);

    const handleChange = (e) => {
        const obj = {
            [e.target.name]: e.target.value,
        };
        const action = changeSong(obj);
        dispatch(action);
    };

    const handleChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleUploadImage = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', unsignedUploadPrefix);

        return await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            setImage(response.data.url);
            return response.data.url
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleClickAddSong = async () => {
        try {
            // Bắt đầu tải lên ảnh
            const image = await handleUploadImage();
            dispatch(changeImage({ key: 'image', value: image }));
            setisImageUploaded(true);
            if (isImageUploaded) {
                const obj = {
                    ...song,
                    image: image,
                    singer: {
                        fullName: song.singerFullName,
                    },
                };

                dispatch(resetFormSongCreate());
                const action = createNewSong(obj);
                dispatch(action);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm Mới Thành Công !',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/');
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
        }
    };


    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <h4 className="text-success">Create Music Song</h4>
                    <p className="fst-italic">Commodo non elit magna consequat et adipisicing. Veniam elit mollit ex duis aute culpa eiusmod incididunt exercitation mollit occaecat nisi minim exercitation. Ullamco adipisicing quis eu do. Incididunt amet dolor reprehenderit do id ad ullamco quis eu. Ipsum ut mollit eu non deserunt ex nisi Lorem aliqua veniam velit ipsum velit fugiat. Veniam anim fugiat commodo magna proident ad tempor anim et culpa qui fugiat dolor. Amet id Lorem mollit qui sunt aliquip et elit.</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row mt-3 mb-2">
                        <div className="col-lg-6">
                            <div className="col-lg-12 mb-2">
                                <label className="fw-bold" htmlFor="">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={song.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label className="fw-bold" htmlFor="">
                                    Youtube ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="youtubeId"
                                    value={song.youtubeId}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label className="fw-bold" htmlFor="">
                                    Singer Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="singerFullName"
                                    value={song.singerFullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label className="fw-bold" htmlFor="">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    value={song.author}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="col-lg-12 mb-2">
                                <label className="fw-bold" htmlFor="">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"

                                    onChange={handleChangeImage}
                                />
                            </div>
                            <div className="col-lg-12">
                                <label className="fw-bold" htmlFor="">
                                    Preview
                                </label>
                                <img src={image || noAvatar} alt="" width="75%" height="250px" />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2 d-flex" style={{ justifyContent: 'center' }}>
                        <div className="col-lg-3">
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={handleClickAddSong}
                            >
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>


    );
};

export default AddMusic;
