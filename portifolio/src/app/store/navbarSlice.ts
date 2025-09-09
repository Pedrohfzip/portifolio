import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  activeSection: string;
}

const initialState: NavbarState = {
  activeSection: '',
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = navbarSlice.actions;
export default navbarSlice.reducer;
