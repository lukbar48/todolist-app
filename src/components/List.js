import React from 'react';
import styles from './List.module.scss';

const List = ({ itemsList, deleteItem, editItem, finishItem }) => {
  return (
    <section className="container">
      <ul>
        {itemsList.map((item) => {
          return (
            <li key={item.id}>
              {item.title}
              <div className={styles.buttons}>
                <button
                  onClick={() => editItem(item.id)}
                  aria-label="Edit"
                  className={styles.editButton}
                  type="button"
                >
                  <i className="far fa-edit"></i>
                </button>
                <button
                  onClick={(e) => finishItem(item.id, e)}
                  aria-label="Done"
                  className={styles.doneButton}
                  type="button"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete"
                  className={styles.deleteButton}
                  type="button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default List;
