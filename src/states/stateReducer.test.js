import { describe, expect, it, vi } from 'vitest';
import authUserReducer from './authUser/reducer';
import talksReducer from './talks/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import {
  asyncAddTalk,
  asyncVoteTalk,
  ActionType as TalksActionType,
} from './talks/action';
import { ActionType as LeaderboardsActionType } from './leaderboards/action';
import { ActionType as AuthUserActionType } from './authUser/action';
import api from '../utils/api';

describe('talksReducer function', () => {
  const talks = [
    { id: 'thread-1', text: 'Hello' },
    { id: 'thread-2', text: 'World' },
  ];
  it('should RECEIVE_TALKS', () => {
    const action = {
      type: TalksActionType.RECEIVE_TALKS,
      payload: { talks },
    };

    expect(talksReducer([], action)).toEqual(talks);
  });

  it('should ADD_TALK', () => {
    const newTalk = { id: 'thread-3', text: 'World' };

    const action = {
      type: TalksActionType.ADD_TALK,
      payload: { talk: newTalk },
    };

    expect(talksReducer(talks, action)).toEqual([newTalk, ...talks]);
  });

  /**
   * TESTING THUNK FUNCTION
   */
  it('should alert error message when create talk fails', async () => {
    const dispatch = vi.fn();

    const error = new Error('Failed to create talk');

    vi.spyOn(api, 'createTalk').mockRejectedValue(error);

    globalThis.alert = vi.fn();

    await asyncAddTalk({
      text: 'Hello',
      replyTo: '',
    })(dispatch);

    expect(alert).toHaveBeenCalledWith('Failed to create talk');
  });

  it('should dispatch vote action when vote succeeds', async () => {
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
      authUser: {
        id: 'users-1',
      },
      talks: [
        {
          id: 'thread-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    }));

    vi.spyOn(api, 'voteTalk').mockResolvedValue();

    await asyncVoteTalk('thread-1', 1)(dispatch, getState);

    expect(api.voteTalk).toHaveBeenCalledWith('thread-1', 1);

    expect(dispatch).toHaveBeenCalledWith({
      type: TalksActionType.VOTE_TALK,
      payload: {
        talkId: 'thread-1',
        userId: 'users-1',
        voteType: 1,
      },
    });
  });
  // =======================================
});

describe('leaderboardsReducer function', () => {
  const leaderboards = [
    {
      user: {
        id: 'users-1',
        name: 'user1',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'user2',
      },
      score: 5,
    },
  ];

  it('should RECEIVE_LEADERBOARDS', () => {
    const action = {
      type: LeaderboardsActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards,
      },
    };

    expect(leaderboardsReducer([], action)).toEqual(leaderboards);
  });
});

describe('authUserReducer function', () => {
  const authUser = {
    id: 'user-1',
    name: 'John',
    email: 'john@example.com',
  };

  it('should SET_AUTH_USER', () => {
    const action = {
      type: AuthUserActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    expect(authUserReducer(null, action)).toEqual(authUser);
  });
});
