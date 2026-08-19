import React from 'react';
import PropTypes from 'prop-types';
import TalkItem, { talkItemShape } from './TalkItem';

function TalksList({ talks, onVote }) {
  return (
    <div className="talks-list">
      {talks.map((talk) => (
        <TalkItem key={talk.id} {...talk} onVote={onVote} />
      ))}
    </div>
  );
}

TalksList.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.shape(talkItemShape)).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default TalksList;
