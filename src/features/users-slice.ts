import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import data from '../api/data.json'

export type UsersState = {
  entities: User[];
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>

const createUser = (draftUser: DraftUser): User => {
  return { id: nanoid(), tasks: [], ...draftUser }
}

const initialState: UsersState = {
  entities: data.users
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.entities.unshift(user);
    },
    removeUser: (state, action: PayloadAction<User['id']>) => {
      const index = state.entities.findIndex(user => user.id === action.payload);
      state.entities.splice(index, 1);
    }
  }
})

export const usersReducer = usersSlice.reducer;
export const { addUser, removeUser } = usersSlice.actions;

export default usersSlice;