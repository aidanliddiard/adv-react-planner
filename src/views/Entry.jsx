import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEntries } from '../context/PlannerContext';

import styles from './Entry.css';

export default function Entry() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const { entries, getEntry, deleteEntry } = useEntries();
  const history = useHistory();

  useEffect(() => {
    setEntry(getEntry(id));
  }, [id, entries.length]);

  const handleDelete = (id) => {
    deleteEntry(id);
    history.push('/entries');
  };

  return (
    <>
      <Link to="/entries" className={styles.backButton}>
        &laquo; Back to Planner
      </Link>
      <article className={styles.entry}>
        <h1>{entry?.title}</h1>
        <p>Due: {entry?.date}</p>
        <p>{entry?.content}</p>
        <button>Edit</button>
        <button onClick={() => handleDelete(entry.id)}>Delete</button>
      </article>
    </>
  );
}
