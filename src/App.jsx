import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes } from 'react-router-dom';
import Index from './component/Index';
import AddMusic from './component/AddMusic';
import EditMusic from './component/EditMusic';
import PlayMusic from './component/PlayMusic';
import Navbar from './layout/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Provider store={store}>
        <Routes>
          <Route path="" element={<Index />}></Route>
          <Route path="music/add" element={<AddMusic />}></Route>
          <Route path="music/edit/:songId" element={<EditMusic />}></Route>
          <Route path="music/watch" element={<PlayMusic />}></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
