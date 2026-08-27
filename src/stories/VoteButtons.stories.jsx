import VoteButtons from '../components/VoteButtons';

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  args: {
    onVote: () => {},
  },
};

export const Default = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
  },
};

export const WithVotes = {
  args: {
    upVotesBy: ['users-1', 'users-2', 'users-3'],
    downVotesBy: ['users-4'],
  },
};

export const HighVotes = {
  args: {
    upVotesBy: [
      'users-1',
      'users-2',
      'users-3',
      'users-4',
      'users-5',
      'users-6',
    ],
    downVotesBy: ['users-7', 'users-8', 'users-9'],
  },
};
