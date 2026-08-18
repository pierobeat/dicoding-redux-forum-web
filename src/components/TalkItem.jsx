import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { truncateHtml, postedAt } from '../utils';
import { useSelector } from 'react-redux';

function TalkItem({
  id,
  title,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
}) {
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();

  const isUserLogin = authUser !== null;

  const onTalkClick = () => {
    navigate(isUserLogin ? `/discuss/${id}` : '/login');
  };

  const onTalkPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(isUserLogin ? `/discuss/${id}` : '/login');
    }
  };

  return (
    <div className="talk-item">
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <div className="talk-item__user-photo">
              <img src={user.avatar} alt={user.name} />
            </div>
            <p className="talk-item__user-name">{user.name}</p>
          </div>

          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>

        <article
          className="talk-item__content"
          onClick={onTalkClick}
          onKeyDown={onTalkPress}
          role="button"
          tabIndex={0}
        >
          <h2 className="talk-item__text">{title}</h2>
          <p className="talk-item__description">{truncateHtml(body, 300)}</p>
        </article>

        <div className="talk-item__actions">
          <button type="button" aria-label="upvote">
            <FaRegThumbsUp />
            <span>{upVotesBy.length}</span>
          </button>

          <button type="button" aria-label="downvote">
            <FaRegThumbsDown />
            <span>{downVotesBy.length}</span>
          </button>

          <button type="button" aria-label="comments">
            <FaRegComment />
            <span>{totalComments}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const talkItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

TalkItem.propTypes = talkItemShape;

export { talkItemShape };

export default TalkItem;
