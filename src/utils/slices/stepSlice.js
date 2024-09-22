import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
    name : 'step',
    initialState:{step:0},
    reducers:{
        changeStep(state, action){
            state.step = action.payload
        }
    }

})

export const stepActions = stepSlice.actions;
export default stepSlice;