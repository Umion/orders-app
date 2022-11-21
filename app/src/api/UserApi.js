const UserApi = {
  login(email) {
    return new Promise((r) => {
      r({
        data: {
          id: 1,
          email: email,
          name: "Test User",
        },
      });
    });
  },

  fetch() {
    return new Promise((r) => {
      setTimeout(() => {
        r({
          data: {
            id: 1,
            email: "email@example.com",
            name: "Test User",
          },
        });
      }, 2000);
    });
  },
};

export default UserApi;
