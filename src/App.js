
import './App.css';
import React from 'react';
// import { Red } from './useContextComponent/Red';
import { createContext } from 'react';
import { useState } from 'react';
import TodoApp from './useReducerComponet/TodoApp';


export const AppContext = createContext();
function App() {
  const [state, setState] = useState({

    message: 'Bạn đã trúng thưởng với số tiền : ',
    money: 0,
    rewards: []
  })
  // tạo 1 input khi nhập tiền vào thì state thành giá tiền vừa nhập vào đó, khi thay đổi xong thì đưa message + money vào 1 rewards rồi hiện nó ra theo từng lần nhập
  return (
    <div>
      {/* <AppContext.Provider value={{ state, setState }}>
        <Red />
      </AppContext.Provider> */}
      <TodoApp />
    </div>
  );
}

export default App;