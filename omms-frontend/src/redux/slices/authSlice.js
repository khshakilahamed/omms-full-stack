import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, removeUserInfo } from '@/service/auth.service';
import { getFromLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/constants/storageKey';

const initialState = () => {
  const accessToken = getFromLocalStorage(authKey) || null;
  const user = getUserInfo() || null;

  return {
    accessToken: accessToken,
    user: {
      userId: user?.userId,
      email: user?.email,
      name: user?.name,
      role: user?.role,
    },
    isLoading: false, // Add isLoading to the initial state
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false; // Set isLoading to false after user is set
    },
    logout: (state) => {
      removeUserInfo(authKey);
      state.user = null;
      state.token = null;
    },
    setLoading: (state, action) => { // Add a reducer for setting loading state
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
