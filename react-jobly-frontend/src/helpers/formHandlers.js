import JoblyApi from "./api";
import { login } from "./auth";

async function handleLogin(formData) {
  try {
    const { username, password } = formData;
    const token = await login(username, password);
    return token;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

async function handleSignup(formData) {
  try {
  const { username, password } = formData;
  const token = await JoblyApi.createUser(formData);
  await login(username, password);
  return token;
  } catch (error) {
    throw error;
  }
}

async function handleEditUser(formData) {
  await JoblyApi.patchUser(formData);
  const token = await handleLogin(formData);
  return token;
}

export async function handleSubmit(formData, formType) {
  try {
    if (formType === "login") {
      const token = await handleLogin(formData);
      return token;
    } else if (formType === "sign-up") {
      const token = await handleSignup(formData);
      return token;
    } else if (formType === "profile") {
      const token = await handleEditUser(formData);
      return token;
    }
  } catch (error) {
    throw error;
  }
}
