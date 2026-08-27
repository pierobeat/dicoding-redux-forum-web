import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../states/talks/action';

function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim() || !category.trim()) {
      alert('all inputs are required');
      return;
    }

    const isSuccess = await dispatch(
      asyncCreateThread({
        title: title.trim(),
        body: body.trim(),
        category: category.trim() || 'General',
      }),
    );

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section className="create-discussion-page">
      <div className="create-discussion-page__main">
        <h1>Buat Diskusi</h1>
        <form className="create-discussion-form" onSubmit={onSubmit}>
          <label htmlFor="thread-title">Judul</label>
          <input
            id="thread-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="thread-category">Kategori</label>
          <div className="input-wrapper">
            <span className="input-adornment-start">#</span>
            <input
              id="thread-category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{ margin: 0 }}
            />
          </div>

          <label htmlFor="thread-body">Isi</label>
          <textarea
            id="thread-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows="8"
          />

          <div className="create-discussion-form__actions">
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit">Create Discussion</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateThread;
