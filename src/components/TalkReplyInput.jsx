import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TalkReplyInput({ replyTalk }) {
  const [text, setText] = useState('');
  async function replyTalkHandler(event) {
    event.preventDefault();
    if (text.trim() && (await replyTalk(text.trim()))) {
      setText('');
    }
  }

  return (
    <form className="talk-reply-input" onSubmit={replyTalkHandler}>
      <h2>Beri komentar</h2>
      <textarea
        placeholder="Tulis komentar..."
        value={text}
        onChange={({ target }) => setText(target.value)}
        maxLength="320"
      />
      <p className="talk-reply-input__char-left">{text.length}/320</p>
      <button type="submit">Kirim</button>
    </form>
  );
}

TalkReplyInput.propTypes = {
  replyTalk: PropTypes.func.isRequired,
};

export default TalkReplyInput;
