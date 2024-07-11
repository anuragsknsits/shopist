import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest } from '../redux/actions/profileActions'
import { Button, Container } from 'react-bootstrap';

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const loading = useSelector(state => state.profile.loading);
  const error = useSelector(state => state.profile.error);

  const handleFetchProfile = () => {
    dispatch(fetchProfileRequest());
  };

  return (
    <Container>
      <h1>Profile</h1>
      <Button onClick={handleFetchProfile} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Profile'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          {/* Render other profile details */}
        </div>
      )}
    </Container>
  );
};

