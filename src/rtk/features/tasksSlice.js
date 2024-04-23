import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const token = sessionStorage.getItem("token");
export const fetchUserTasks = createAsyncThunk(
  "tasksSlice/fetchUserTasks",
  async () => {
    try {
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://127.0.0.1:5000/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const handleDeleteTask = createAsyncThunk(
  "tasksSlice/deleteTask",
  async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "DELETE",
    });
    try {
      const data = await response.json();
      if (data.success) {
        console.log("Task Deleted successfully ");
        return id;
      }
    } catch (error) {
      console.log("Error while Deleting: ", error);
    }
  }
);

export const handleAddTask = createAsyncThunk("tasksSlice/handleAddTask" ,async(taskBody)=>{
   if (!token) alert("Please Log in first!");
   try {
     const response = await fetch("http://127.0.0.1:5000/tasks", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({ addTask: taskBody }),
     });
     if (!response.ok) {
       throw new Error("Failed to add task");
     }
     const data = await response.json();
     if (data.success) {
       const newTask = {
         id: data.id, // Use the actual ID from the backend
         body: data.task,
         isCompleted: false,
       };
       console.log(data);
       return newTask;
     }
   } catch (error) {
     console.error("Error Adding Task : ", error);
   }
})

export const handleModifyTask = createAsyncThunk("tasksSlice/handleModifyTask", async({id,editedTask})=>{
 try {
   const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ new_body: editedTask }),
   });
   const data = await response.json();
   if (data.success) {
 const modifiedTask = { ...data.task, body: editedTask };    //  onModify(modifiedTask);
     alert("Task Updated successfully ");
     return modifiedTask;
    //  setIsEditing(false);
   }
 } catch (error) {
   console.error("Error While modifying task: ", error);
 }
    
})

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [], 
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) =>
      state.filter((task) => task.id !== action.payload.id),
    modifyTask: (state, action) => {
      state.map((t) => {
        if (t.id === action.payload.id) {
          return action.payload;
        } else {
          return t;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserTasks.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(handleDeleteTask.fulfilled, (state, action) => {  
      const deletedTaskId = action.payload;
      return state.filter((task) => task.id !== deletedTaskId);
    });
    builder.addCase(handleAddTask.fulfilled,(state,action)=>{
       state.push(action.payload);
       return state;  
    })
    builder.addCase(handleModifyTask.fulfilled , (state,action)=>{
        state.map((t) => {
          if (t.id === action.payload.id) {
            return state;
          } else {
            return t;
          }
        });
    })
  },
});

export const { addTask, deleteTask, modifyTask, clearTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
