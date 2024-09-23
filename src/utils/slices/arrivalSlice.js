import { createSlice } from "@reduxjs/toolkit";

const arrivalSlices = createSlice({
    name : 'arrivalDate',
    initialState:{arrivalDate:null},
    reducers:{
        changeArrivalDate(state, action){
            state.arrivalDate = action.payload
        }
    }

})

export const arrivalActions = arrivalSlices.actions;
export default arrivalSlices;