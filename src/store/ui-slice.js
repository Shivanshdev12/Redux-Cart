import { createSlice } from "@reduxjs/toolkit";


const initialUIState = { isVisible: false };
const uiSlice = createSlice({
    name: "UI",
    initialState: initialUIState,
    reducers: {
        toggle(state) {
            state.isVisible = !state.isVisible;
        }
    }
})


export const uiActions = uiSlice.actions;

export default uiSlice;