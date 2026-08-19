import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TalkDetail from '../components/TalkDetail';
import TalkItem from '../components/TalkItem';
import TalkReplyInput from '../components/TalkReplyInput';
import {
  asyncReceiveTalkDetail,
  asyncVoteTalkDetail,
} from '../states/talkDetail/action';
import { asyncAddTalk, asyncVoteTalk } from '../states/talks/action';

function DetailPage() {
  const { id } = useParams();
  const { talkDetail = null, authUser } = useSelector((states) => states); // @TODO: get talkDetail and authUser state from store
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to get talk detail by id
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const onVoteTalk = (voteType) => {
    dispatch(asyncVoteTalkDetail(id, voteType));
  };

  const onReplyTalk = (text) => {
    // @TODO: dispatch async action to add reply talk
    dispatch(asyncAddTalk({ text, replyTo: id }));
  };

  if (!talkDetail) {
    return null;
  }

  console.log({ talkDetail });

  return (
    <section className="detail-page">
      {talkDetail.parent && (
        <div className="detail-page__parent">
          <h3>Replying To</h3>
          <TalkItem
            {...talkDetail.parent}
            onVote={(talkId, voteType) =>
              dispatch(asyncVoteTalk(talkId, voteType))
            }
          />
        </div>
      )}
      <TalkDetail {...talkDetail} authUser={authUser.id} onVote={onVoteTalk} />
      <TalkReplyInput replyTalk={onReplyTalk} />
    </section>
  );
}

export default DetailPage;
