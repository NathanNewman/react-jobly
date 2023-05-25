import JoblyApi from './api';



const login = async (username, password) => {
  try {
    const token = await JoblyApi.login(username, password);
    console.log('Token:', token); // Check the value of the token
    localStorage.setItem("authenticated", token);
    localStorage.setItem("isAdmin", "false");
    
    JoblyApi.token = token;
    return token;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

const logout = () => {
  console.log(localStorage.getItem("authenticated"));
  localStorage.removeItem("authenticated");
  localStorage.removeItem("isAdmin");
  console.log(localStorage.getItem("authenticated"));
};

export {
  login,
  logout,
};