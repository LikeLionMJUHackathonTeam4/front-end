import axios from 'axios';

const endpoint = import.meta.env.VITE_BE_ENDPOINT;
const baseUrl = endpoint+'/oauth';

export const getKakaoLoginUrl = async () => {
  const response = await axios.get(`${baseUrl}/login`);
  return response.data.data;
};

export const kakaoLoginCallback = async (code) => {
  const response = await axios.get(`${baseUrl}/callback`, {
    params: { code }
  });
  return response.data.data;
};

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get('/api/user', { 
        headers: { Authorization: `Bearer ${token}` } 
    });
    return response.data;  // 정상 응답일 경우 사용자 데이터 반환
} catch (error) {
    console.error('Error fetching user info:', error.response?.data || error.message);
    throw error;  // 에러 발생 시 호출한 쪽에서 처리할 수 있도록 에러 전달
}
};

export const logout = async (token) => {
  await axios.post(`${baseUrl}/logout`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
