import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SalaryLeave = () => {

    const API = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const updateLeaveDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeaves";


    let [empData, setEmpData] = useState([]);
    let [salaryData, setSalaryData] = useState([]);
    let [salaryObj, setSalaryObj] = useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": "",
        "totalAdvance": 0,
        "presentDays": 0,
        "salaryAmount": 0
    });
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showSalaryData();
        showEmpData();
    }, []);

    const showSalaryData = async () => {
        const result = await axios.get(API + 'GetAllSalary');
        setIsLoader(false);
        setSalaryData(result.data.data);
    }

    const getSalaryObj = (event, key) => {
        setSalaryObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const showEmpData = async () => {
        const result = await axios.get(API + 'GetAllEmployee');
        setEmpData(result.data.data)
    }

    const addSalaryData = async () => {
        debugger;
        const result = await axios.post(API + 'AddSalary', salaryObj);
        if (result.data.result) {
            alert('Salary Data Added Successfully');
            showSalaryData();
        }
        else {
            alert(result.data.message);
        }
    }

    const editSalaryData = async (item) => {
        setSalaryObj(prevObj => ({
            ...prevObj,
            salaryId: item.salaryId,
            employeeId: item.employeeId,
            salaryDate: item.salaryDate,
            totalAdvance: item.totalAdvance,
            presentDays: item.presentDays,
            salaryAmount: item.salaryAmount
        }))
    }

    const updatesalaryData = async () => { }

    const deleteSalaryData = async (id) => {
        const result = await axios.get(API + 'DeleteSalaryById?salaryId=' + id);
        if (result.data.result) {
            alert('Salary Data Deleted Successfully');
            showSalaryData();
        }
        else {
            alert(result.data.message)
        }
    }

    const resetSalaryData = () => {
        setSalaryObj({
            "salaryId": 0,
            "employeeId": 0,
            "salaryDate": "",
            "totalAdvance": 0,
            "presentDays": 0,
            "salaryAmount": 0
        })
    }


    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="card">
                            <div class="card-header bg-info" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong>Add Salary</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee</label>
                                        <select className='form-select' value={salaryObj.employeeId} onChange={(event) => { getSalaryObj(event, 'employeeId') }}>
                                            <option>Select Employee</option>
                                            {
                                                empData.map((item) => {
                                                    return (<option value={item.empId}>{item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Date</label>
                                        <input type='date' className='form-control' value={salaryObj.salaryDate} onChange={(event) => { getSalaryObj(event, 'salaryDate') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Total Advance</label>
                                        <input type='number' className='form-control' value={salaryObj.totalAdvance} onChange={(event) => { getSalaryObj(event, 'totalAdvance') }}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Present Days</label>
                                        <input type='number' className='form-control' value={salaryObj.presentDays} onChange={(event) => { getSalaryObj(event, 'presentDays') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Salary Amount</label>
                                        <input type='number' className='form-control' value={salaryObj.salaryAmount} onChange={(event) => { getSalaryObj(event, 'salaryAmount') }}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetSalaryData}>Reset</button>
                                    </div>
                                    <div className='col-6 mt-3 text-center'>
                                        {
                                            salaryObj.salaryId == 0 && <button className='btn btn-success btn-sm' onClick={addSalaryData}>Save Data</button>
                                        }
                                        {
                                            salaryObj.salaryId !== 0 && <button className='btn btn-warning btn-sm' >Save Data</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-info" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong>Salary List</strong>
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
                                            <th>Salary Date</th>
                                            <th>Present Days</th>
                                            <th>Salary Amount</th>
                                            <th>totalAdvance</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {
                                        isLoader && <tbody>
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    <div class="spinner-border text-muted"></div>
                                                    <div class="spinner-border text-primary"></div>
                                                    <div class="spinner-border text-success"></div>
                                                    <div class="spinner-border text-info"></div>
                                                    <div class="spinner-border text-warning"></div>
                                                    <div class="spinner-border text-danger"></div>
                                                    <div class="spinner-border text-secondary"></div>
                                                    <div class="spinner-border text-dark"></div>
                                                    <div class="spinner-border text-light"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                    {
                                        !isLoader && <tbody>
                                            {
                                                salaryData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.empContactNo}</td>
                                                        <td>{item.salaryDate}</td>
                                                        <td>{item.presentDays}</td>
                                                        <td>{item.salaryAmount}</td>
                                                        <td>{item.totalAdvance}</td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => { editSalaryData(item) }}>Edit</button></td>
                                                        <td><button className='btn btn-danger btn-sm' onClick={() => { deleteSalaryData(item.salaryId) }}>Delete</button></td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryLeave;