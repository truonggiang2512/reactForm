import React, { Component } from "react";
import { connect } from "react-redux";
import QuanLySvReducer, {
  deleteInfo,
  editInfo,
} from "../redux/reducers/QuanLySvReducer";
import Form from "./Form";

class Table extends Component {
  render() {
    console.log(this.props.arrInfo.arrInfo);
    const renderTable = () => {
      return this.props.arrInfo.arrInfo.map((sv) => {
        return (
          <tr key={sv.maSv}>
            <td>{sv.maSv}</td>
            <td>{sv.hoTen}</td>
            <td>{sv.sdt}</td>
            <td>{sv.email}</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  const action = deleteInfo(sv.maSv);
                  this.props.dispatch(action);
                }}
                className="btn btn-danger mx-3"
              >
                Delele
              </button>{" "}
              <button
                onClick={() => {
                  const action = editInfo(sv);
                  this.props.dispatch(action);
                }}
                type=""
                className="btn btn-success"
              >
                Edit
              </button>
            </td>
          </tr>
        );
      });
    };
    return (
      <div>
        <Form />
        <table className="table container">
          <thead>
            <tr className="bg-dark text-light">
              <th>Ma Sv</th>
              <th>Ho ten</th>
              <th>So dien thoai</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrInfo: state.QuanLySvReducer,
});
export default connect(mapStateToProps)(Table);
