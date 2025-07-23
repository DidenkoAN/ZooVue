export default function (instance) {
  return {
    signIn(data) {
      return instance.post("auth/sign_in", data);
    },

    signUp(data) {
      return instance.post("auth/sign_up", data);
    },
  };
}
