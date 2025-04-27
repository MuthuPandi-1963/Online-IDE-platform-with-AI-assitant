import { createSlice } from "@reduxjs/toolkit";
import ProgrammingThunk from "../Thunks/ProgrammingThunk"; 

const boilerplateCode = {
    python: `print("Hello, Python!")`,
    c: `#include <stdio.h>
int main() {
    printf("Hello, C!");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
    java: `public class Temp {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
};

const initialState = {
    input: boilerplateCode.python,
    language: "python",
    output: "",
    success: true,
    error: false,
    loading: false,
    errorMessage: "",
    boilerplate: boilerplateCode,
};

const ProgrammingSlice = createSlice({
    name: "programming",
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.input = state.boilerplate[action.payload] || "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ProgrammingThunk.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.output = "";
                state.errorMessage = "";
            })
            .addCase(ProgrammingThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.output = action.payload.output;
            })
            .addCase(ProgrammingThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.output = "";
                state.errorMessage = action.payload || "Failed to run code.";
            });
    },
});

export const { setInput, setLanguage } = ProgrammingSlice.actions;
export default ProgrammingSlice.reducer;
