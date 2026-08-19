import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TalksList from '../components/TalksList';
import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncVoteTalk } from '../states/talks/action';
import Navigation from '../components/Navigation';

function HomePage() {
  const { talks = [], users = [], authUser } = useSelector((states) => states); // @TODO: get talks, users, and authUser state from store

  console.log({ authUser });

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const allTalks = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.ownerId),
    authUser: authUser?.id,
  }));
  const topics = [...new Set(allTalks?.map((dt) => dt.category))];

  const [selectedTopic, setSelectedTopic] = useState('');

  const talkList = selectedTopic
    ? allTalks.filter((talk) => talk.category === selectedTopic)
    : allTalks;

  useEffect(() => {
    // @TODO: dispatch async action to populate talks and users data
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  // const onAddTalk = (text) => {
  //   // @TODO: dispatch async action to add talk
  //   dispatch(asyncAddTalk({ text }));
  // };

  const onVote = (id, voteType) => {
    dispatch(asyncVoteTalk(id, voteType));
  };

  const onFilterTopic = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic('');
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
    <section className="home-page">
      {authUser && (
        <header>
          <Navigation authUser={authUser} />
        </header>
      )}
      <div className="threads-area">
        <div style={{ width: '75%' }}>
          <TalksList talks={talkList} onVote={onVote} />
        </div>
        <div className="popular-topics">
          <h2>Kategori Populer</h2>
          <ul>
            {topics.map((topic) => (
              <li
                className={`topic ${selectedTopic === topic ? 'selected' : ''}`}
                key={topic}
                onClick={() => onFilterTopic(topic)}
              >
                #{topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
