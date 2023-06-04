import {createSlice} from "@reduxjs/toolkit"

const Auth = createSlice({
  name: "Auth",
  initialState: {
    UserAuthData: [],
  },
  reducers: {
    AuthSetter: (state, action) => {
      state.UserAuthData = action.payload;
    },
  },
});

export const {AuthSetter}=Auth.actions;
export default Auth.reducer;