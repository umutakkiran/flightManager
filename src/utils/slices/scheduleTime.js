import { createSlice } from "@reduxjs/toolkit";

const scheduleTimeSlice = createSlice({
    name : 'scheduleTime',
    initialState:{scheduleTime:null},
    reducers:{
        changeStep(state, action){
            state.scheduleTime = action.payload
        }
    }

})

export const scheduleTimeActions = scheduleTimeSlice.actions;
export default scheduleTimeSlice;