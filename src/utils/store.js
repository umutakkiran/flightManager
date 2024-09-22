import { configureStore } from "@reduxjs/toolkit"
import stepSlice from "./slices/stepSlice";
import bookedFlightsSlice from "./slices/bookedFlightsSlice";


const store = configureStore({
    reducer:{
        step: stepSlice.reducer,
        bookedFlights: bookedFlightsSlice.reducer,

    }
})

export default store;