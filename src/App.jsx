import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import Leaderboards from './pages/Leaderboards';
import CreateThread from './pages/CreateThread';
import Footer from './components/Footer';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const location = useLocation();
  const userAccessPage = ['/login', '/register'];

  const hideFooter = userAccessPage.includes(location?.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/discuss/:id" element={<DetailPage />} />
            </Routes>
          </main>
          {!hideFooter && (
            <footer>
              <Footer authUser={authUser} signOut={onSignOut} />
            </footer>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/create-thread" element={<CreateThread />} />
            <Route path="/create-thread" element={<CreateThread />} />
            <Route path="/discuss/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <footer>
          <Footer authUser={authUser} signOut={onSignOut} />
        </footer>
      </div>
    </>
  );
}

export default App;
