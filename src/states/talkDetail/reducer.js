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
    case ActionType.ADD_COMMENT:
      return {
        ...talkDetail,
        comments: [...talkDetail.comments, action.payload.comment],
      };
    case ActionType.VOTE_COMMENT: {
      const { commentId, userId, voteType } = action.payload;

      return {
        ...talkDetail,
        comments: talkDetail.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            ...(voteType === 1 && {
              upVotesBy: comment.upVotesBy.concat([userId]),
            }),
            ...(voteType === -1 && {
              downVotesBy: comment.downVotesBy.concat([userId]),
            }),
          };
        }),
      };
    }
    default:
      return talkDetail;
  }
}

export default talkDetailReducer;
