import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest } from '../redux/actions/profileActions';

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const loading = useSelector(state => state.profile.loading);
  const error = useSelector(state => state.profile.error);

  const handleFetchProfile = async (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(fetchProfileRequest());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      
      <button
        onClick={handleFetchProfile}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Loading...' : 'Fetch Profile'}
      </button>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {profile && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-lg">
          <h2 className="text-2xl font-semibold">Product ID: {profile[0].productId}</h2>
          <p className="text-lg">Category ID: {profile[0].categoryId}</p>
          {/* Render other profile details */}
        </div>
      )}
    </div>
  );
};
