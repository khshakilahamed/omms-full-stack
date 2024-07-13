import { authKey } from '@/constants/storageKey';
import { getUserInfo, removeUserInfo } from '@/service/auth.service';
import { getFromLocalStorage } from '@/utils/local-storage';
import { createSlice } from '@reduxjs/toolkit';

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
            }
      }
}

const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
            setUser: (state, action) => {
                  state.user = action.payload.user;
                  state.accessToken = action.payload.accessToken;
            },
            logout: (state) => {
                  // console.log("logout called")
                  removeUserInfo(authKey)
                  state.user = null;
                  state.token = null;
            },
      },
});

export const { setUser, logout } = authSlice.actions;


export default authSlice.reducer;
