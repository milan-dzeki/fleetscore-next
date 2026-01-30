import { UserSliceIntialStateType } from '@/types/store/slices/userSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserSliceIntialStateType = {
  loading: false,
  error: null,
  data: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading (state) {
      state.loading = true;
    },
    setUser (state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    updateNames (state, action) {
      if (state.data) {
        state.data.firstName = action.payload.firstName;
        state.data.lastName = action.payload.lastName;
        state.data.profileCreated = true;
      }
    }
  }
});

export const { startLoading, setUser, updateNames } = userSlice.actions;

export default userSlice.reducer;