import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrInfo: [
    {
      maSv: "1",
      hoTen: "Truong Giang",
      sdt: "098765526",
      email: "abc@gmai.com",
    },
    {
      maSv: "2",
      hoTen: "Thuy Lien",
      sdt: "098765526",
      email: "qq@gmai.com",
    },
    {
      maSv: "3",
      hoTen: "Truong Vu",
      sdt: "098765526",
      email: "cc@gmai.com",
    },
    {
      maSv: "4",
      hoTen: "Truong Huy",
      sdt: "098765526",
      email: "xyz@gmai.com",
    },
  ],
  errors: {
    maSv: "(*)",
    hoTen: "(*)",
    sdt: "(*)",
    email: "(*)",
  },
  SvEdit: {
    maSv: "",
    hoTen: "",
    sdt: "",
    email: "",
  },
  isEdit: false,
};

const QuanLySvReducer = createSlice({
  name: "QuanLySvReducer",
  initialState,
  reducers: {
    changeInfo: (state, action) => {
      state.SvEdit[action.payload.id] = action.payload.value;
    },
    themSinhVien: (state, action) => {
      state.arrInfo.push(action.payload);
    },
    deleteInfo: (state, action) => {
      let maSv = action.payload;

      let indexDel = state.arrInfo.findIndex((sv) => sv.maSv === maSv);
      console.log(maSv);
      if (indexDel !== -1) {
        state.arrInfo.splice(indexDel, 1);
      }
    },
    editInfo: (state, action) => {
      state.isEdit = true;
      state.SvEdit = action.payload;
      console.log(state.SvEdit);
    },
    updateInfo: (state, action) => {
      const { id, value, isUpdate } = action.payload;
      const index = state.arrInfo.findIndex((sv) => sv.maSv === id);
      if (index !== -1) {
        state.arrInfo[index] = { ...state.arrInfo[index], ...value };
      }
      state.isEdit = isUpdate;
      console.log(state.isEdit);
      return;
    },
    changeInfoError: (state, action) => {
      state.errors[action.payload.id] = action.payload.value;
    },
    searchInfo: (state, action) => {
      const search = state.arrInfo.find((sv) => sv.maSv === action.payload);
      if (search) {
        state.arrInfo = state.arrInfo.filter(
          (sv) => sv.maSv === action.payload
        );
        return;
      } else {
        return;
      }
    },
  },
});

export const {
  changeInfo,
  changeInfoError,
  themSinhVien,
  deleteInfo,
  editInfo,
  updateInfo,
  searchInfo,
} = QuanLySvReducer.actions;

export default QuanLySvReducer.reducer;
