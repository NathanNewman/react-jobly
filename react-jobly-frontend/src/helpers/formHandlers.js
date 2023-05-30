import JoblyApi from "./api";
import { login } from "./auth"

async function handleLogin(formData, login, history) {
  const { username, password } = formData;
  const token = await login(username, password);
  
  history.push("/");
  return token;
}

async function handleSignup(formData, history) {
  const { username, password, firstName, lastName, email } = formData;
  const newUser = {
    username,
    password,
    firstName,
    lastName,
    email,
  };

  // Make the API call to create a new user
  await JoblyApi.createUser(newUser);
  login(username, password)
  history.push("/");
}

export async function handleSubmit(formData, formType, login, history) {
  if (formType === "login") {
    const token = await handleLogin(formData, login, history);
    return token;
  } else if (formType === "sign-up") {
    await handleSignup(formData, history);
  }
}
