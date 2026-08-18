import React from 'react';
import PropTypes from 'prop-types';
import TalkItem, { talkItemShape } from './TalkItem';

function TalksList({ talks, onLike }) {
  return (
    <div className="talks-list">
      {talks.map((talk) => (
        <TalkItem key={talk.id} {...talk} onLike={onLike} />
      ))}
    </div>
  );
}

TalksList.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.shape(talkItemShape)).isRequired,
  onLike: PropTypes.func.isRequired,
};

export default TalksList;
