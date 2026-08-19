/**
 * @TODO: Define all the actions (creator) for the talkDetail state
 */
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  VOTE_TALK_DETAIL: 'VOTE_TALK_DETAIL',
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

export {
  ActionType,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  voteTalkDetailActionCreator,
  asyncVoteTalkDetail,
  asyncReceiveTalkDetail,
};
