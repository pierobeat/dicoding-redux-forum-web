import PropTypes from 'prop-types';
import React from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

function VoteButtons({ upVotesBy, downVotesBy, onVote }) {
  return (
    <div className="talk-detail__votes">
      <button type="button" aria-label="upvote" onClick={() => onVote(1)}>
        <FaRegThumbsUp />
        <span>{upVotesBy.length}</span>
      </button>
      <button type="button" aria-label="downvote" onClick={() => onVote(-1)}>
        <FaRegThumbsDown />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default VoteButtons;
