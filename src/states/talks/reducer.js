/**
 * @TODO: Define the reducer for the talks state
 */
import { ActionType } from './action';

function talksReducer(talks = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_TALKS:
      return action.payload.talks;
    case ActionType.ADD_TALK:
      return [action.payload.talk, ...talks];
    case ActionType.VOTE_TALK:
      return talks.map((talk) => {
        if (talk.id === action.payload.talkId) {
          const { userId, voteType } = action.payload;
          return {
            ...talk,
            upVotesBy: talk.upVotesBy.filter((id) => id !== userId),
            downVotesBy: talk.downVotesBy.filter((id) => id !== userId),
            ...(voteType === 1 && {
              upVotesBy: talk.upVotesBy.concat([userId]),
            }),
            ...(voteType === -1 && {
              downVotesBy: talk.downVotesBy.concat([userId]),
            }),
          };
        }
        return talk;
      });
    default:
      return talks;
  }
}

export default talksReducer;
