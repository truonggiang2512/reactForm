import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeInfo,
  changeInfoError,
  editInfo,
  searchInfo,
  themSinhVien,
  updateInfo,
} from "../redux/reducers/QuanLySvReducer";
import Table from "./Table";

class Form extends Component {
  render() {
    let SvEdit = this.props.SvEdit;
    const handleSubmit = (e) => {
      e.preventDefault();
      for (let key in this.props.errors) {
        if (this.props.errors[key] !== "") {
          return;
        }
      }
      const action = themSinhVien(this.props.SvEdit);
      this.props.dispatch(action);
    };

    const handleValidation = (e) => {
      const dataType = e.target.getAttribute("data-type");
      const minLength = e.target.getAttribute("data-minlength");
      const maxLength = e.target.getAttribute("data-maxlength");
      const { value, id } = e.target;

      let newErrors = { ...this.props.errors };
      let errorMessage = "";

      if (value.trim() === "") {
        errorMessage = id + " không được bỏ trống !!!";
      } else {
        if (dataType) {
          switch (dataType) {
            case "number": {
              let regexNumber = /^-?\d*\.?\d+$/;
              if (!regexNumber.test(value)) {
                errorMessage = id + " phải là số !!!";
              }
              break;
            }
            case "string": {
              let regexString = /^[a-z A-Z0-9]+$/;
              if (!regexString.test(value)) {
                errorMessage = id + " không được chứa dấu và ký tự đặc biệt!!!";
              }
              break;
            }
            case "email": {
              let regexEmail =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              if (!regexEmail.test(value)) {
                errorMessage = id + " không hợp lệ !!!";
              }
              break;
            }
          }
        }
        if (minLength) {
          if (value.length < minLength) {
            errorMessage = "Số điện thoại phải đủ 10 số ";
          }
        }
        if (maxLength) {
          if (value.length > maxLength) {
            errorMessage = "Số điện thoại phải đủ 10 số ";
          }
        }
        if (id === "maSv") {
          let { arrInfo } = this.props;
          const maSVList = arrInfo.map((sv) => sv.maSv);
          if (maSVList.includes(value)) {
            errorMessage = "Mã SV đã tồn tại!!!";
          }
        }
        if (id === "email") {
          let { arrInfo } = this.props;
          const maSVList = arrInfo.map((sv) => sv.email);
          if (maSVList.includes(value)) {
            errorMessage = "email đã tồn tại!!!";
          }
        }
      }

      newErrors[id] = errorMessage;
      const action = changeInfoError({ id, value: errorMessage });

      this.props.dispatch(action);
    };
    const handleInput = (e) => {
      const action = changeInfo({ id: e.target.id, value: e.target.value });
      this.props.dispatch(action);
      console.log(action);
      handleValidation(e);
    };
    return (
      <div className="container my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            const action = searchInfo(e.target.value);
            this.props.dispatch(action);
          }}
        />

        <form action="">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Ma sinh vien</p>
                <input
                  onInput={handleInput}
                  id="maSv"
                  type="text"
                  data-type="number"
                  data-maxlength="32"
                  className="form-control"
                  name="maSv"
                  value={SvEdit.maSv}
                  disabled={this.props.isEdit}
                />
                <span className="text-danger"> {this.props.errors.maSv}</span>
              </div>
              <div className="form-group">
                <p>Ho ten</p>
                <input
                  onInput={handleInput}
                  id="hoTen"
                  name="hoTen"
                  data-type="string"
                  type="text"
                  className="form-control"
                  value={SvEdit.hoTen}
                />
                <span className="text-danger"> {this.props.errors.hoTen}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>So Dien Thoai</p>
                <input
                  onInput={handleInput}
                  id="sdt"
                  type="text"
                  name="sdt"
                  data-type="number"
                  data-minlength="10"
                  data-maxlength="10"
                  className="form-control"
                  value={SvEdit.sdt}
                />
                <span className="text-danger"> {this.props.errors.sdt}</span>
              </div>
              <div className="form-group">
                <p>Email</p>
                <input
                  name="email"
                  onInput={handleInput}
                  data-type="email"
                  id="email"
                  type="text"
                  className="form-control"
                  value={SvEdit.email}
                />
                <span className="text-danger"> {this.props.errors.email}</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-danger mt-2" type="submit">
              Them Sinh vien
            </button>
            <button
              onClick={() => {
                const action = updateInfo({
                  id: SvEdit.maSv,
                  value: SvEdit,
                  isUpdate: false,
                });
                this.props.dispatch(action);
              }}
              className="btn btn-primary mt-2 mx-2"
              type="button"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  // ({ arrInfo: state.QuanLySvReducer.arrInfo });
  ({
    arrInfo: state.QuanLySvReducer.arrInfo,
    SvEdit: state.QuanLySvReducer.SvEdit,
    errors: state.QuanLySvReducer.errors,
    isEdit: state.QuanLySvReducer.isEdit,
    updateSV: state.QuanLySvReducer.updateSV,
  });

export default connect(mapStateToProps)(Form);
