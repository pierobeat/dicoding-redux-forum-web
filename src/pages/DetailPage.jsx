import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TalkDetail from '../components/TalkDetail';
import TalkItem from '../components/TalkItem';
import TalkReplyInput from '../components/TalkReplyInput';
import {
  asyncReceiveTalkDetail,
  asyncVoteTalkDetail,
  asyncAddComment,
  asyncVoteComment,
} from '../states/talkDetail/action';
import { asyncVoteTalk } from '../states/talks/action';
import CommentItem from '../components/CommentItem';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { talkDetail = null, authUser } = useSelector((states) => states); // @TODO: get talkDetail and authUser state from store
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  useEffect(() => {
    // @TODO: dispatch async action to get talk detail by id
    dispatch(asyncReceiveTalkDetail(id));
  }, [id, dispatch]);

  const onVoteTalk = (voteType) => {
    dispatch(asyncVoteTalkDetail(id, voteType));
  };

  const onReplyTalk = (content) => {
    return dispatch(asyncAddComment(id, content));
  };

  const onVoteComment = (commentId, voteType) => {
    dispatch(asyncVoteComment(id, commentId, voteType));
  };

  if (!talkDetail) {
    return null;
  }

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
      <TalkDetail {...talkDetail} onVote={onVoteTalk} />
      <TalkReplyInput replyTalk={onReplyTalk} />
      <section className="comments-section">
        <h2>Komentar ({talkDetail.comments.length})</h2>
        {talkDetail.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onVote={onVoteComment}
          />
        ))}
      </section>
    </section>
  );
}

export default DetailPage;
