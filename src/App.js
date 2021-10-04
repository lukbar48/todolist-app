import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Form from './components/Form';
import List from './components/List';

const getLocalStorageItems = () => {
  let list = localStorage.getItem('listStorage')
  if (list) {
    const storage = JSON.parse(list)
    return storage
  } else {
    return []
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorageItems());
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const x= localStorage.getItem('listStorage')
    console.log({x})

    if (name && !editing) {
      const newListItem = {
        title: name,
        id: new Date().getTime().toString(),
        category: 'uncompleted',
      };
      setList([...list, newListItem]);
      setName('');
    } else if (!name) {
      alert('Please enter value!');
    } else if (name && editing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        }),
      );
      setEditing(false);
      setEditID('');
    }
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editingItem = list.find((item) => item.id === id);
    setName(editingItem.title);
    setEditing(true);
    setEditID(id);
  };

  const finishItem = (id, e) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, category: 'completed' };
        }
        return item;
      }),
    );
  };

  const filterCategory = () => {
    switch (category) {
      case 'uncompleted':
        setFilteredTodos(list.filter((item) => item.category === 'uncompleted'));
        break;
      case 'completed':
        setFilteredTodos(list.filter((item) => item.category === 'completed'));
        break;
      default:
        setFilteredTodos(list);
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem('listStorage', JSON.stringify(list));
    filterCategory();
  }, [list]);

  useEffect(() => {
    filterCategory();
  }, [category]);

  return (
    <section className={styles.app}>
      <h1>Todo List</h1>
      <Form setName={setName} handleSubmit={handleSubmit} name={name} setCategory={setCategory} />
      {list.length ? (
        <>
          <List
            itemsList={filteredTodos}
            deleteItem={deleteItem}
            editItem={editItem}
            finishItem={finishItem}
          />
          <button className={styles.clearButton} type="submit" onClick={() => setList([])}>
            Clear list
          </button>
        </>
      ) : (
        <h4>The list is empty, please add new item</h4>
      )}
    </section>
  );
}

export default App;
