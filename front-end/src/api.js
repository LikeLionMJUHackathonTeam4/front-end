import axios from 'axios';

const baseUrl = 'http://ec2-52-79-61-245.ap-northeast-2.compute.amazonaws.com:8080/oauth';

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
  const response = await axios.get(`${baseUrl}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data;
};

export const logout = async (token) => {
  await axios.post(`${baseUrl}/logout`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
