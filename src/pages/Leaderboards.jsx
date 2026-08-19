import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function Leaderboards() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboards-page">
      <div className="leaderboards-container">
        <h1>Klasmen Pengguna Aktif</h1>

        <div className="leaderboards-table">
          <div className="leaderboards-header">
            <div className="leaderboards-header__user">Pengguna</div>
            <div className="leaderboards-header__score">Skor</div>
          </div>

          <div className="leaderboards-list">
            {leaderboards.map((item, index) => (
              <div key={item.user.id} className="leaderboards-item">
                <div className="leaderboards-item__rank">{index + 1}</div>
                <div className="leaderboards-item__user">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="leaderboards-item__avatar"
                  />
                  <div className="leaderboards-item__info">
                    <div className="leaderboards-item__name">
                      {item.user.name}
                    </div>
                    <div className="leaderboards-item__id">@{item.user.id}</div>
                  </div>
                </div>
                <div className="leaderboards-item__score">{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboards;
