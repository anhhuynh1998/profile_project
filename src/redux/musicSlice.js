import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { musicService } from '../service/musicService';


export const searchMusic = createAsyncThunk(
  'music/searchMusic',
  async (search) => {
    const response = await musicService.getAll(search);
    return response.data;
  }
)

export const fetchAllMusic = createAsyncThunk(
  'music/fetchAllMusic',
  async () => {
    const response = await musicService.getAll();
    return response.data;
  }
);

export const fetchSongById = createAsyncThunk(
  'music/fetchSongById',
  async (id) => {
    const response = await musicService.getSongById(id);
    return response.data;
  }
);

export const createNewSong = createAsyncThunk(
  'music/createNewSong',
  async (data) => {
    const response = await musicService.create(data);
    return response.data;
  }
);

export const updateSong = createAsyncThunk('music/updateSong', async (data) => {
  const response = await musicService.update(data);
  return response.data;
});
export const deleteSong = createAsyncThunk('music/deleteSong', async (data) => {
  const response = await musicService.delete(data)
  return response.data;

})

export const musicSlice = createSlice({
  name: 'music',

  initialState: {

    loading: false,
    data: [],
    song: {
      title: '',
      image: '',
      singerFullName: '',
      youtubeId: '',
      author: '',
    },
  },
  reducers: {

    changeSong: (state, action) => {
      const obj = action.payload;
      const key = Object.keys(obj);
      const value = obj[key];

      state.song[key] = value;
    },
    resetFormSongCreate: (state) => {
      state.song = {
        title: '',
        image: '',
        singerFullName: '',
        youtubeId: '',
        author: '',
      };
    },
    changeSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // pending(dang cho) : khi api server dang trong trang thai cho thi no se thuc hien con khi no da chay xong thi se chay vao fulfilled or rejected
    // rejected(bị từ chối) :  
    builder.addCase(fetchAllMusic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMusic.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllMusic.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchSongById.fulfilled, (state, action) => {
      const obj = action.payload;
      obj.singerFullName = obj.singer.fullName;
      state.song = obj;
    });

    builder.addCase(createNewSong.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });


    builder.addCase(updateSong.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(deleteSong.fulfilled, (state, action) => {
      console.log(action.meta.arg);
      state.data = state.data.filter(item => item.id != action.meta.arg)

    })
    builder.addCase(searchMusic.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },

});


// Action creators are generated for each case reducer function
export const {
  changeSong,
  changeQuantity,
  increment,
  decrement,
  incrementByAmount,
  loadSong,
  changeSearch,
  resetFormSongCreate,
} = musicSlice.actions;

export default musicSlice.reducer;