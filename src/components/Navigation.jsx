import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

function Navigation({ authUser }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />
      <p style={{ fontWeight: 600 }}>{name}</p>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}
      {/* <button type="button" onClick={signOut}>Sign out</button> */}
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
};

export default Navigation;
