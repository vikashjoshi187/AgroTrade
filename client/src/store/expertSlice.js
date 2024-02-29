import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_REQUESTED_URL } from "../urls";

var newExpert = createAsyncThunk("expertSlice/newExpert", async (expert) => {
    try {
        var response = await axios.post(USER_REQUESTED_URL + "/newExpert", expert);
        console.log("inside newExpert thunk ", response)
        return response;
    } catch (err) {
        console.log("error in thunk", err);
        return err;
    }
});
var initialState = {
    expertStatus: false
}
var expertSlice = createSlice({
    name: "expertSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(newExpert.fulfilled, (state, action) => {
            console.log("new Expert reducer", action);
        })
    }
})
export async function getExpert() {
    try {
        const ExpertList = await axios.get(USER_REQUESTED_URL + "/getExpert");
        console.log("list of expert in expertSlice", ExpertList);
        return ExpertList.data


    } catch (err) {
        console.log("Error in getExpert in expertSlice");
    }


}
export { newExpert };
export default expertSlice.reducer;
// export const {}
