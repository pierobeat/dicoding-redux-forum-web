import { LoadingBar } from '@dimasmds/react-redux-loading-bar';
import React from 'react';

function Loading() {
  return (
    <div className='loading'>
      {/* @TODO: use react-redux-loading-bar to show loading bar */}
      <LoadingBar />
    </div>
  );
}

export default Loading;
