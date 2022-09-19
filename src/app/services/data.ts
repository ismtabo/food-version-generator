import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async () => {
  try {
    const res = await fetch(process.env.PUBLIC_URL + "/static/json/data.json");
    const data = await res.json();
    return { status: "ok", data };
  } catch {
    return { status: "ko", error: true };
  }
});
