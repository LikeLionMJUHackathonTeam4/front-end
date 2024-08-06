// src/components/MockUsers.jsx
import React, { useState, useEffect } from 'react';
import { mockUserData } from '../util/mockUserData'; // Mock 데이터 임포트

const MockUsers = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call with mock data
    setTimeout(() => {
      try {
        // Simulate success response with mock data
        setUserInfo(mockUserData);
        setLoading(false);
      } catch (error) {
        // Simulate error handling
        setError(new Error('Failed to load user data'));
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <ul>
        {userInfo.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MockUsers;
