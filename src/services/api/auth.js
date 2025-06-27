export const signUpUser = async ({ username, email, password, spiritAnimal }) => {
  // Mock API response (replace with Firebase or backend)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { username, email, spiritAnimal } });
    }, 500);
  });
};