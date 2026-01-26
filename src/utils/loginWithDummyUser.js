export const loginWithDummyUser = () => {
  const persistRoot =
    JSON.parse(localStorage.getItem("persist:root")) || {};

  persistRoot.auth = JSON.stringify({
    token: "dummy-token-123456",
    user: {
      id: 1,
      firstName: "Dummy",
      lastName: "User",
      email: "dummy@example.com",
      role: "user",
    },
  });

  localStorage.setItem("persist:root", JSON.stringify(persistRoot));
};