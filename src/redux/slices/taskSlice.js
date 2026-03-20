import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const getLocalDateString = (date = new Date()) => {
  const offset = date.getTimezoneOffset();
  const adjusted = new Date(date.getTime() - (offset * 60 * 1000));
  return adjusted.toISOString().split('T')[0];
};

const initialState = {
  tasks: [],
  status: "idle", // idle, loading, success, failed
  error: "",
  filter: "all", // all, completed, active
  searchQuery: "",
  selectedDate: getLocalDateString(),
};

const getToken = () => localStorage.getItem("token");

export const getTask = createAsyncThunk("task/getTask", async (userId) => {
  const { data } = await axios.get(`${URL}/api/v1/tasks/${userId}`, {
    headers: { Authorization: getToken() },
  });
  return data;
});

export const createTask = createAsyncThunk(
  "task/createTask",
  async (payload) => {
    const { data } = await axios.post(`${URL}/api/v1/tasks`, payload, {
      headers: { Authorization: getToken() },
    });
    return data;
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (payload) => {
    const { data } = await axios.put(
      `${URL}/api/v1/tasks/${payload._id}`,
      payload,
      {
        headers: { Authorization: getToken() },
      }
    );
    return data;
  }
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const { data } = await axios.delete(`${URL}/api/v1/tasks/${id}`, {
    headers: { Authorization: getToken() },
  });
  return data;
});

export const deleteManyTask = createAsyncThunk(
  "task/deleteManyTask",
  async (payload) => {
    const { data } = await axios.delete(`${URL}/api/v1/tasks/batch`, {
      headers: { Authorization: getToken() },
      data: payload,
    });
    return data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSatusToIdle: (state) => {
      state.status = "idle";
    },
    initState: (state) => {
      state.tasks = [];
      state.status = "idle";
      state.error = null;
      state.filter = "all";
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = [...action.payload];
      })
      .addCase(getTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteManyTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteManyTask.fulfilled, (state, action) => {
        const { deletedCount, ids } = action.payload;
        state.status = "success";
        if (deletedCount > 0) {
          state.tasks = state.tasks.filter(
            (value) => ids.indexOf(value._id) == -1
          );
        }
      })
      .addCase(deleteManyTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks.push(action.payload);
        state.error = "";
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = state.tasks.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
        state.error = "";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = state.tasks.filter(
          (todo) => todo._id !== action.payload._id
        );
        state.error = "";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllTasks = (state) => state.taskReducer.tasks;
export const getTaskStatus = (state) => state.taskReducer.status;
export const getTaskError = (state) => state.taskReducer.error;
export const getFilter = (state) => state.taskReducer.filter;
export const getSearchQuery = (state) => state.taskReducer.searchQuery;
export const getSelectedDate = (state) => state.taskReducer.selectedDate;
export const getCompleted = (state) =>
  state.taskReducer.tasks.filter((task) => task.isCompleted === true);

export const { initState, setSatusToIdle, changeFilter, setSearchQuery, setSelectedDate } = taskSlice.actions;

export default taskSlice.reducer;
