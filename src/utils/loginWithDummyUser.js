export const loginWithDummyUser = (role) => {
  const persistRoot =
    JSON.parse(localStorage.getItem("persist:root")) || {};

  persistRoot.auth = JSON.stringify({
    token: "dummy-token-123456",
    user: {
      id: 1,
      firstName: "Dummy",
      lastName: "User",
      email: "dummy@example.com",
      role: role,
    },
  });

  localStorage.setItem("persist:root", JSON.stringify(persistRoot));
};