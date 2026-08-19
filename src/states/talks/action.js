/**
 * @TODO: Define all the actions (creator) for the talks state
 */
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  VOTE_TALK: 'VOTE_TALK',
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function voteTalkActionCreator({ talkId, userId, voteType }) {
  return {
    type: ActionType.VOTE_TALK,
    payload: {
      talkId,
      userId,
      voteType,
    },
  };
}

function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addTalkActionCreator(thread));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncVoteTalk(talkId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const talk = getState().talks.find((item) => item.id === talkId);
    const previousVoteType = talk.upVotesBy.includes(authUser.id)
      ? 1
      : talk.downVotesBy.includes(authUser.id)
        ? -1
        : 0;
    const nextVoteType = previousVoteType === voteType ? 0 : voteType;

    dispatch(showLoading());
    try {
      dispatch(
        voteTalkActionCreator({
          talkId,
          userId: authUser.id,
          voteType: nextVoteType,
        }),
      );

      await api.voteTalk(talkId, nextVoteType);
    } catch (error) {
      alert(error.message);
      dispatch(
        voteTalkActionCreator({
          talkId,
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
  receiveTalksActionCreator,
  addTalkActionCreator,
  voteTalkActionCreator,
  asyncAddTalk,
  asyncCreateThread,
  asyncVoteTalk,
};
