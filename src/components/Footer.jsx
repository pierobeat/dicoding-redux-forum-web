import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMessageCircle,
  FiBarChart2,
  FiPlus,
  FiLogOut,
  FiLogIn,
} from 'react-icons/fi';

function Footer({ authUser, signOut }) {
  const navigate = useNavigate();

  const handleAddThread = () => {
    navigate('/create-thread');
  };

  return (
    <section className="footer">
      <nav className="footer__menu">
        <Link to="/" className="footer__link">
          <FiMessageCircle className="footer__icon" />
          <span>Threads</span>
        </Link>

        <Link to="/leaderboards" className="footer__link">
          <FiBarChart2 className="footer__icon" />
          <span>Leaderboards</span>
        </Link>

        {authUser && (
          <button
            type="button"
            className="footer__link footer__button"
            onClick={handleAddThread}
          >
            <FiPlus className="footer__icon" />
            <span>Add Thread</span>
          </button>
        )}

        {authUser ? (
          <button
            type="button"
            className="footer__link footer__button"
            onClick={signOut}
          >
            <FiLogOut className="footer__icon" />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="footer__link">
            <FiLogIn className="footer__icon" />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </section>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

Footer.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  authUser: null,
};

export default Footer;
