import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import VoteButtons from './VoteButtons';

function CommentItem({ comment, onVote }) {
  return (
    <article className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner">
          <img src={comment.owner.avatar} alt={comment.owner.name} />
          <strong>{comment.owner.name}</strong>
        </div>
        <time>{postedAt(comment.createdAt)}</time>
      </header>
      <p className="comment-item__content">{comment.content}</p>
      <VoteButtons
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        onVote={(voteType) => onVote(comment.id, voteType)}
      />
    </article>
  );
}

CommentItem.propTypes = {
  onVote: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CommentItem;
