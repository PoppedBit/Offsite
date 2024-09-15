import { createSlice } from '@reduxjs/toolkit';
import { BugReport, Navigation, Secret } from 'modules/admin/types';
import { TODO } from 'shared/types';

interface AdminState {
  users: undefined;
  blackListedEmails: undefined;
  navigation: Navigation[] | undefined;
  bugReports: BugReport[] | undefined;
  secrets: Secret[] | undefined;
}

const initialState: AdminState = {
  users: undefined,
  blackListedEmails: undefined,
  navigation: undefined,
  bugReports: undefined,
  secrets: undefined,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setBlackListedEmails: (state, action) => {
      state.blackListedEmails = action.payload;
    },
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    },
    setBugReports: (state, action) => {
      state.bugReports = action.payload;
    },
    addNavigation: (state, action) => {
      state.navigation = [...state.navigation as Navigation[], action.payload];
    },
    updateNavigation: (state, action) => {
      const { id, data } = action.payload;

      let newNavigation = [...state.navigation as Navigation[]];
      const index = newNavigation.findIndex((navigation: Navigation) => navigation.id === id);

      newNavigation[index] = {
        ...newNavigation[index],
        ...data
      };
      // @ts-ignore //TODO
      state.navigation = newNavigation;
    },
    removeNavigation: (state, action) => {
      const id = action.payload;
      let newNavigation = (state.navigation ?? []).filter((nav: TODO) => nav.id !== id);
      //@ts-ignore
      state.navigation = newNavigation;
    },
    updateBugReport: (state, action) => {
      const { id, data } = action.payload;

      let newBugReports = [...state.bugReports as BugReport[]];
      const index = newBugReports.findIndex((bugReport: BugReport) => bugReport.id === id);

      newBugReports[index] = {
        ...newBugReports[index],
        ...data
      };

      state.bugReports = newBugReports;
    },
    setSecrets: (state, action) => {
      state.secrets = action.payload;
    },
    addSecret: (state, action) => {
      state.secrets = [...state.secrets as Secret[], action.payload];
    },
    removeSecret: (state, action) => {
      const name = action.payload;
      const newSecrets = (state.secrets ?? []).filter((secret: Secret) => secret.name !== name);
      state.secrets = newSecrets;
    }
  }
});

export const {
  setUsers,
  setBlackListedEmails,
  setNavigation,
  updateNavigation,
  setBugReports,
  addNavigation,
  removeNavigation,
  updateBugReport,
  setSecrets,
  addSecret,
  removeSecret,
} = adminSlice.actions;

export default adminSlice.reducer;
