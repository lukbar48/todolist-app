import React from 'react';
import styles from './Form.module.scss';

const Form = ({ setName, handleSubmit, name, setCategory, editing }) => {
  const chooseCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} action="">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        type="text"
        placeholder="e.g. Reading a book"
        maxLength="25"
      />
      <button title='Add item' className={styles.button} type="submit">
        {editing ? (
          <i style={{ color: '#00e74d' }} className="fas fa-check-square"></i>
        ) : (
          <i style={{ color: '#51A9EE' }} className="fas fa-plus-square"></i>
        )}
      </button>
      <select onChange={(e) => chooseCategory(e)} className={styles.select} name="todos">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </form>
  );
};

export default Form;
