import { useEntries } from '../../context/PlannerContext';
import { useForm } from '../../hooks/useForm';
import styles from './AddEntry.css';

export default function EditEntry({ entry, setEditing }) {
  console.log(entry);
  const { updateEntry } = useEntries();
  const { formState, formError, handleFormChange, setFormError } = useForm({
    title: entry.title,
    content: entry.content,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');
    if (!formState.title) return setFormError('Title is required');
    if (!formState.date) return setFormError('Date is required');
    updateEntry(formState);
    setEditing(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleFormChange}
          className={styles.input}
        />
        <input
          type="date"
          name="date"
          aria-label="Due date"
          value={formState.date || ''}
          onChange={handleFormChange}
          className={styles.input}
        />
        <textarea
          name="content"
          value={formState.content}
          onChange={handleFormChange}
          className={styles.content}
        />
        <button type="submit">Update Entry</button>
      </form>
      <p className={styles.error}>{formError || ' '}</p>
    </section>
  );
}
