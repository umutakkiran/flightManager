import { createSlice } from "@reduxjs/toolkit";

const departureSlices = createSlice({
    name : 'departureDate',
    initialState:{departureDate:null},
    reducers:{
        changeDepartureDate(state, action){
            state.departureDate = action.payload
        }
    }

})

export const departureActions = departureSlices.actions;
export default departureSlices;