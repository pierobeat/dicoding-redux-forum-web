/**
 * @TODO: Define all the actions (creator) for the talkDetail state
 */
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  VOTE_TALK_DETAIL: 'VOTE_TALK_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  VOTE_COMMENT: 'VOTE_COMMENT',
};

function receiveTalkDetailActionCreator(talkDetail) {
  return {
    type: ActionType.RECEIVE_TALK_DETAIL,
    payload: {
      talkDetail,
    },
  };
}

function clearTalkDetailActionCreator() {
  return {
    type: ActionType.CLEAR_TALK_DETAIL,
  };
}

function voteTalkDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.VOTE_TALK_DETAIL,
    payload: {
      userId,
      voteType,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function voteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.VOTE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

function asyncReceiveTalkDetail(talkId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      dispatch(clearTalkDetailActionCreator());

      const talkDetail = await api.getThreadDetail(talkId);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncVoteTalkDetail(talkId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, talkDetail } = getState();
    const previousVoteType = talkDetail.upVotesBy.includes(authUser.id)
      ? 1
      : talkDetail.downVotesBy.includes(authUser.id)
        ? -1
        : 0;
    const nextVoteType = previousVoteType === voteType ? 0 : voteType;

    dispatch(showLoading());
    try {
      dispatch(
        voteTalkDetailActionCreator({
          userId: authUser.id,
          voteType: nextVoteType,
        }),
      );

      await api.voteTalk(talkId, nextVoteType);
    } catch (error) {
      alert(error.message);
      dispatch(
        voteTalkDetailActionCreator({
          userId: authUser.id,
          voteType: previousVoteType,
        }),
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncVoteComment(threadId, commentId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, talkDetail } = getState();
    const comment = talkDetail.comments.find((item) => item.id === commentId);
    const previousVoteType = comment.upVotesBy.includes(authUser.id)
      ? 1
      : comment.downVotesBy.includes(authUser.id)
        ? -1
        : 0;
    const nextVoteType = previousVoteType === voteType ? 0 : voteType;

    dispatch(showLoading());
    try {
      dispatch(
        voteCommentActionCreator({
          commentId,
          userId: authUser.id,
          voteType: nextVoteType,
        }),
      );
      await api.voteComment(threadId, commentId, nextVoteType);
    } catch (error) {
      alert(error.message);
      dispatch(
        voteCommentActionCreator({
          commentId,
          userId: authUser.id,
          voteType: previousVoteType,
        }),
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  voteTalkDetailActionCreator,
  addCommentActionCreator,
  voteCommentActionCreator,
  asyncVoteTalkDetail,
  asyncReceiveTalkDetail,
  asyncAddComment,
  asyncVoteComment,
};
