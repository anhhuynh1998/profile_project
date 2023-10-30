import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { changeSong, fetchSongById, updateSong } from '../redux/musicSlice';

const EditMusic = () => {
    const cloudName = 'dekggnmc5';
    const unsignedUploadPrefix = 'upload';
    const API_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const [image, setImage] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isImageUploaded, setisImageUploaded] = useState(false)
    const { songId } = useParams();
    console.log(songId);

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

        return await axios.put(API_URL, formData, {
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

    const handleClickUpdateSong = () => {

        const obj = {
            ...song,
            image: image,
            singer: {
                fullName: song.singerFullName,
            },
        };

        const action = updateSong(obj);
        dispatch(action)
            .unwrap()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sửa Thành Công !',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/');
            });
    };

    useEffect(() => {
        const action = fetchSongById(songId);
        dispatch(action);
    }, []);

    return (
        <div className="container">
            <header>
                <Link to="/">List of music</Link>
            </header>
            <div className="row mb-3">
                <div className="col-lg-6">
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={song.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-lg-6">
                    <label htmlFor="">Youtube ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="youtubeId"
                        value={song.youtubeId}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-6">
                    <label htmlFor="">Singer Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="singerFullName"
                        value={song.singerFullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-lg-6">
                    <label htmlFor="">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={song.author}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mb-3 d-flex" style={{ justifyContent: 'center' }}>
                <div className="col-lg-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleClickUpdateSong}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMusic;
