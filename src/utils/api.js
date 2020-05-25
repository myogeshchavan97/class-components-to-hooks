const profile = {
  first_name: 'Tim',
  last_name: 'Lindholm'
};

export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(profile);
    }, 1000);
  });
};

export const updateUserProfile = (updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...profile,
        ...updates
      });
    }, 1000);
  });
};
