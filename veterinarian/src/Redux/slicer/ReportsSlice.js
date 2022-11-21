import { createSlice } from "@reduxjs/toolkit";

export const ReportSlice = createSlice({
    name: "reports",
    initialState: {
        reportsData:[]
    }, 
    reducers: {
        updateReportData: (state, values) => {
            state.reportsData =  values.payload;
        }
    }
})

export const { updateReportData } = ReportSlice.actions
export const selectReport = (state) => state.reports.reportsData

export default ReportSlice.reducer