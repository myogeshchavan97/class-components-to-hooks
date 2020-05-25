import { getUserProfile, updateUserProfile } from '../utils/api';

export const updateProfile = (profile) => ({
  type: 'UPDATE_PROFILE',
  profile
});

export const initiateUpdateProfile = (updates) => {
  return async (dispatch) => {
    try {
      const profile = await updateUserProfile(updates);
      dispatch(updateProfile(profile));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateGetProfile = () => {
  return async (dispatch) => {
    try {
      const profile = await getUserProfile();
      dispatch(updateProfile(profile));
    } catch (error) {
      console.log('error', error);
    }
  };
};
