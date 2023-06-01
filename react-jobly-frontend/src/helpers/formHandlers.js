import JoblyApi from "./api";
import { login } from "./auth";

async function handleLogin(formData, history) {
  const { username, password } = formData;
  const token = await login(username, password);

  history.push("/");
  return token;
}

async function handleSignup(formData, history) {
  const { username, password } = formData;
  const token = await JoblyApi.createUser(formData);
  await login(username, password);
  history.push("/");
  return token;
}

async function handleEditUser(formData, history) {
  const user = await JoblyApi.patchUser(formData);
  const token = await handleLogin(formData, history);
  return token;
}

export async function handleSubmit(formData, formType, history) {
  if (formType === "login") {
    const token = await handleLogin(formData, history);
    return token;
  } else if (formType === "sign-up") {
    const token = await handleSignup(formData, history);
    return token;
  } else if (formType === "profile") {
    const token = await handleEditUser(formData, history);
    return token;
  }
}
