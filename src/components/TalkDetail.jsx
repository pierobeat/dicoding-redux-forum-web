import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { postedAt } from '../utils';

function TalkDetail({ text, createdAt, upVotesBy, downVotesBy, user, onVote }) {
  return (
    <section className="talk-detail">
      <header>
        <img src={user.photo} alt={user} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{user.name}</p>
          <p className="talk-detail__user-id">@{user.id}</p>
        </div>
      </header>
      <article>
        <p className="talk-detail__text">{text}</p>
      </article>
      <footer>
        <div className="talk-detail__like">
          <button type="button" aria-label="upvote" onClick={() => onVote(1)}>
            <FaRegHeart />
          </button>
          <span>{upVotesBy.length} Upvotes</span>
          <button
            type="button"
            aria-label="downvote"
            onClick={() => onVote(-1)}
          >
            <FaHeart />
          </button>
          <span>{downVotesBy.length} Downvotes</span>
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

TalkDetail.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default TalkDetail;
