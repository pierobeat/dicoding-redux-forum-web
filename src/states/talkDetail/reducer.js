/**
 * @TODO: Define reducer for the talkDetail state
 */
import { ActionType } from './action';

function talkDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_TALK_DETAIL:
      return action.payload.talkDetail;
    case ActionType.CLEAR_TALK_DETAIL:
      return null;
    case ActionType.VOTE_TALK_DETAIL: {
      const { userId, voteType } = action.payload;

      return {
        ...talkDetail,
        upVotesBy: talkDetail.upVotesBy.filter((id) => id !== userId),
        downVotesBy: talkDetail.downVotesBy.filter((id) => id !== userId),
        ...(voteType === 1 && {
          upVotesBy: talkDetail.upVotesBy.concat([userId]),
        }),
        ...(voteType === -1 && {
          downVotesBy: talkDetail.downVotesBy.concat([userId]),
        }),
      };
    }
    default:
      return talkDetail;
  }
}

export default talkDetailReducer;
