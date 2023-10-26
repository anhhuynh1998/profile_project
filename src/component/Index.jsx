import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import {
    fetchAllMusic,
    deleteSong,
    searchMusic,
    changeSearch,
} from '../redux/musicSlice';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Index = () => {
    const dispatch = useDispatch();

    const musicData = useSelector((state) => state.music.data);
    const loading = useSelector((state) => state.music.loading)
    const search = useSelector((state) => state.music.search)
    const handleDeleteMusic = (id) => {
        // Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'xóa Thành Công !',
        //     showConfirmButton: false,
        //     timer: 1500
        // })
        Swal.fire({
            title: 'Do you want to delete the song?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Delete!', '', 'success')
                dispatch(deleteSong(id))
            }
        })
    };

    const handleInput = (e) => {
        const value = e.target.value;
        dispatch(changeSearch(value))
    }
    useEffect(() => {
        const action = searchMusic(search);
        dispatch(action);
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">

            <section>
                <div>
                    <header>
                        <button className='btn-outline-success'>
                            <Link to="/music/add">
                                <i className="fa-solid fa-plus"></i>
                            </Link>
                        </button>
                        {/*  */}
                    </header>
                    <div className="d-flex align-items-center mb-2">
                        <input
                            type="search"
                            onChange={handleInput}
                            className="form-control w-25 me-2"
                            placeholder="Search Music name"
                        />
                        <button className="btn btn-outline-secondary btn-sm" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row'>
                        {loading && <Spinner />}
                        {
                            musicData.map((item) => {
                                return (
                                    <div key={item.id} className="col-3"

                                    >
                                        <div className='card mb-4'>
                                            <div >
                                                <img className='avatar-md m-auto' src={item.image} style={
                                                    {
                                                        width: '100%',
                                                    }
                                                } alt="" />
                                            </div>
                                            <div className='card-body'>
                                                <div className='row align-item-top'>

                                                    <div className='col-12'>
                                                        <span className="fw-bold"> {item.title}</span >
                                                    </div>
                                                    <div className='col-12'>
                                                        <span>{item.singer.fullName}</span>
                                                    </div>


                                                    <div className='col-12 mt-4'>
                                                        <Link to={`/music/edit/${item.id}`}>
                                                            <button className="btn btn-outline-secondary me-2">
                                                                <i className="fa-regular fa-pen-to-square"></i>
                                                            </button>
                                                        </Link>
                                                        <Link to={`/music/watch?v=${item.youtubeId}`}>
                                                            <button className="btn btn-outline-success ms-2">
                                                                <i className="fa-solid fa-play"></i>
                                                            </button>
                                                        </Link>
                                                        <button className="btn btn-outline-success ms-2" onClick={() => handleDeleteMusic(item.id)}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            )
                        }
                    </div>
                </div>
            </section>

        </div>



    );
};

export default Index;
