import { createSlice } from '@reduxjs/toolkit';

type TabState = {
  activeTab: 'posts' | 'photos';
};

const initialState: TabState = {
  activeTab: 'posts'
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    }
  }
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;