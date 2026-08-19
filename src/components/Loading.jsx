import LoadingBar from '@dimasmds/react-redux-loading-bar';
import React from 'react';
import { useSelector } from 'react-redux';

function Loading() {
  const loading = useSelector((states) => states.loadingBar);

  console.log('loading state:', loading);

  return (
    <div className="loading">
      <LoadingBar />
    </div>
  );
}

export default Loading;
