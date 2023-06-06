import JoblyApi from './api';



const login = async (username, password) => {
  try {
    const token = await JoblyApi.login(username, password);
    if (token) {
    localStorage.setItem("authenticated", token);
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("username", username);
    }
    
    JoblyApi.token = token;
    return token;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("isAdmin");
};

export {
  login,
  logout,
};