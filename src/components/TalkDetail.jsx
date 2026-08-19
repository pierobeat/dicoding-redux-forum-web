import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import VoteButtons from './VoteButtons';

function TalkDetail({
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onVote,
}) {
  return (
    <section className="talk-detail">
      <span className="talk-detail__category">#{category}</span>
      <header style={{ display: 'flex', marginTop: '20px' }}>
        <div className="talk-item__user-info">
          <div className="talk-item__user-photo">
            <img src={owner.avatar} alt={owner.name} />
          </div>
          <p className="talk-item__user-name">{owner.name}</p>
        </div>

        <p className="talk-item__created-at">{postedAt(createdAt)}</p>
      </header>
      <h1 className="talk-detail__title">{title}</h1>
      <p className="talk-detail__body">{body}</p>
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        onVote={onVote}
      />
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

TalkDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default TalkDetail;
