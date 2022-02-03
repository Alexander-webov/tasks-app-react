import React, { useState, useEffect } from 'react';
import List from "./componets/List/List";
import Addlistbutton from "./componets/AddListButton/AddListButton";

import listSvg from './assets/img/list.svg'
import DB from './assets/db.json'
import Tasks from './componets/tasks/Tasks';

import axios from 'axios'







function App() {
  const [lists, setlists] = useState(null);
  const [colors, setcolors] = useState(null);

  const onAddList = (obj) => setlists(prev => [...prev, obj]);



  useEffect(() => {
    //дклвем деструктуризацию ({ data })
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setlists(data);

    })

    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setcolors(data);
    })
  }, []);








  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="list icon" />,
            name: "Все задачи",
            active: true,
          },
        ]} />

        {lists && <List items={lists}
          isRemovable
          onRemove={(id) => alert("Запись успешно удалена!")}
        />}




        <Addlistbutton onAdd={onAddList} colors={colors} />

      </div>
      <div className="todo__tasks">
        {lists && <Tasks list={lists[1]} />}
      </div>
    </div>
  );
}

export default App;
