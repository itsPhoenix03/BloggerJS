export const startLogin = (userCredentials) => ({
  type: "Login_Process_Started",
});

export const successfulLogin = (user) => ({
  type: "Login_Successful",
  payload: user,
});

export const failedLogin = () => ({
  type: "Login_Failed",
});

export const logout = () => ({
  type: "Logout",
});
