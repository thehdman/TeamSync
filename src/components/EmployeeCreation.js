import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeCreation = () => {

    const addEmpDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee";
    const showEmpDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee";
    const showEmpDataByIdApi = "https://onlinetestapi.gerasim.in/api/TeamSync/GetEmployeeByEmpId?empid=";
    const updateEmpDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/UpdateEmployee";
    const deleteEmpDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/DeleteEmployeeByEmpId?empid="

    let [empData, setEmpData] = useState([]);
    let [empObj, setEmpObj] = useState(
        {
            "empId": 0,
            "empName": "",
            "empContactNo": "",
            "empAltContactNo": "",
            "empEmail": "",
            "addressLine1": "",
            "addressLine2": "",
            "pincode": "",
            "city": "",
            "state": "",
            "bankName": "",
            "ifsc": "",
            "accountNo": "",
            "bankBranch": "",
            "salary": 0
          }
    );

    useEffect(() => {
        showEmpData();
    }, []);

    const getEmpData = (event, key) => {
        setEmpObj(prevObj => ({...prevObj, [key]: event.target.value}))
    }

    const addEmpData = async () => {
        const responce = await axios.post(addEmpDataApi, empObj);
        if(responce.data.result){
            alert("Employee Data Added Successfully");
            showEmpData();
        }
        else{
            alert(responce.data.message)
        }
    }

    const showEmpData = async () => {
        const result = await axios.get(showEmpDataApi);
        setEmpData(result.data.data)
    }

    const showEmpDataById = async (id) => {
        const result = await axios.get(showEmpDataByIdApi + id);
        if(result.data.result){
            setEmpObj(result.data.data)
        }
        else{
            alert(result.data.message)
        }
    }

    const updateEmpData = async () => {
        const result = await axios.post(updateEmpDataApi, empObj);
        if(result.data.result){
            alert("Employee Data Updated Successfully");
            showEmpData();
        }
        else{
            alert(result.data.message)
        }
    }

    const deleteEmpData = async (id) => {
        const result = await axios.get(deleteEmpDataApi + id);
        if(result.data.result){
            alert("Employee Data Deleted Successfully");
            showEmpData();
        }
        else{
            alert(result.data.message)
        }
    }

    const resetEmpData = () => {
        setEmpObj({
            "empId": 0,
            "empName": "",
            "empContactNo": "",
            "empAltContactNo": "",
            "empEmail": "",
            "addressLine1": "",
            "addressLine2": "",
            "pincode": "",
            "city": "",
            "state": "",
            "bankName": "",
            "ifsc": "",
            "accountNo": "",
            "bankBranch": "",
            "salary": 0
          })
    }


    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <br></br>
                    <div className='col-5'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                            <div className='row'>
                                    <div className='col-12 text-center'>
                                    <strong className='text-white'>Create New Employee</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Name</label>
                                        <input type='text' className='form-control' value={empObj.empName} onChange={(event) => getEmpData(event, 'empName')}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Contact No</label>
                                        <input type='number' className='form-control' value={empObj.empContactNo} onChange={(event) => getEmpData(event, 'empContactNo')}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Alt Contact</label>
                                        <input type='number' className='form-control' value={empObj.empAltContactNo} onChange={(event) => getEmpData(event, 'empAltContactNo')}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Email</label>
                                        <input type='email' className='form-control' value={empObj.empEmail} onChange={(event) => getEmpData(event, 'empEmail')}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>
                                        <label>City</label>
                                        <input type='text' className='form-control' value={empObj.city} onChange={(event) => getEmpData(event, 'city')}></input>
                                    </div>
                                    <div className='col-4'>
                                        <label>State</label>
                                        <input type='text' className='form-control' value={empObj.state} onChange={(event) => getEmpData(event, 'state')}></input>
                                    </div>
                                    <div className='col-4'>
                                        <label>Pin Code</label>
                                        <input type='number' className='form-control' value={empObj.pincode} onChange={(event) => getEmpData(event, 'pincode')}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Address Line1</label>
                                        <input type='text' className='form-control' value={empObj.addressLine1} onChange={(event) => getEmpData(event, 'addressLine1')}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Address Line2</label>
                                        <input type='text' className='form-control' value={empObj.addressLine2} onChange={(event) => getEmpData(event, 'addressLine2')}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Bank Name</label>
                                        <input type='text' className='form-control' value={empObj.bankName} onChange={(event) => getEmpData(event, 'bankName')}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Acc No</label>
                                        <input type='number' className='form-control' value={empObj.accountNo} onChange={(event) => getEmpData(event, 'accountNo')}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>
                                        <label>IFSC Code</label>
                                        <input type='text' className='form-control' value={empObj.ifsc} onChange={(event) => getEmpData(event, 'ifsc')}></input>
                                    </div>
                                    <div className='col-4'>
                                        <label>Branch</label>
                                        <input type='text' className='form-control' value={empObj.bankBranch} onChange={(event) => getEmpData(event, 'bankBranch')}></input>
                                    </div>
                                    <div className='col-4'>
                                        <label>Salary</label>
                                        <input type='number' className='form-control' value={empObj.salary} onChange={(event) => getEmpData(event, 'salary')}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                <div className='col-6 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetEmpData}>Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {
                                            empObj.empId == 0  && <button className='btn btn-danger btn-sm' onClick={addEmpData}>Save Data</button>
                                        }
                                         {
                                            empObj.empId !== 0  && <button className='btn btn-warning btn-sm' onClick={updateEmpData}>Save Data</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-7'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                            <div className='row'>
                                    <div className='col-12 text-center'>
                                    <strong className='text-white'>Employee List</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            empData.map((item, index) => {
                                                return (<tr>
                                                    <td>{index +1}</td>
                                                    <td>{item.empName}</td>
                                                    <td>{item.empContactNo}</td>
                                                    <td>{item.empEmail}</td>
                                                    <td>{item.city}</td>
                                                    <td><button className='btn btn-success btn-sm' onClick={() => {showEmpDataById(item.empId)}}>Edit</button></td>
                                                    <td><button className='btn btn-warning btn-sm' onClick={() =>{deleteEmpData(item.empId)}}>Delete</button></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCreation;