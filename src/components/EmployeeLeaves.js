import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SalaryLeave = () => {
    
    const API = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const updateLeaveDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeaves";
   

    let [empData, setEmpData] = useState([]);
    let [leaveData, setLeaveData] = useState([]);
    let [leaveObj, setLeaveObj] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    });
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showLeaveData();
        showEmpData();
    }, []);

    const showLeaveData = async () => {
        const result = await axios.get(API + 'GetAllLeaves');
        setIsLoader(false);
        setLeaveData(result.data.data);
    }

    const getLeaveObj = (event, key) => {
        setLeaveObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const showEmpData = async () => {
        const result = await axios.get(API + 'GetAllEmployee');
        setEmpData(result.data.data)
    }

    const addLeaveData = async () => {
        debugger;
        const result = await axios.post(API + 'AddLeave', leaveObj);
        if (result.data.result) {
            alert('Leave Data Added Successfully');
            showLeaveData();
        }
        else {
            alert(result.data.message);
        }
    }

    const editLeaveData = async (item) => {
        setLeaveObj(prevObj => ({
            ...prevObj,
            leaveId: item.leaveId,
            employeeId: item.employeeId,
            leaveDate: item.leaveDate,
            leaveReason: item.leaveReason,
            noOfFullDayLeaves: item.noOfFullDayLeaves,
            noOfHalfDayLeaves: item.noOfHalfDayLeaves
        }))
    }

    const updateLeaveData = async () => { }

    const deleteLeaveData = async (id) => {
        const result = await axios.get(API + 'DeleteLeaveById?leaveId=' + id);
        if (result.data.result) {
            alert('Leave Data Deleted Successfully');
            showLeaveData();
        }
        else {
            alert(result.data.message)
        }
    }

    const resetLeaveData = () => {
        setLeaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
        })
    }


    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="card">
                            <div class="card-header bg-warning" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong>Add Leaves</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee</label>
                                        <select className='form-select' value={leaveObj.employeeId} onChange={(event) => { getLeaveObj(event, 'employeeId') }}>
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
                                        <input type='date' className='form-control' value={leaveObj.leaveDate} onChange={(event) => { getLeaveObj(event, 'leaveDate') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Reason</label>
                                        <input type='text' className='form-control' value={leaveObj.leaveReason} onChange={(event) => { getLeaveObj(event, 'leaveReason') }}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>No of Full Day Leaves</label>
                                        <input type='number' className='form-control' value={leaveObj.noOfFullDayLeaves} onChange={(event) => { getLeaveObj(event, 'noOfFullDayLeaves') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>No of Half Day Leaves</label>
                                        <input type='number' className='form-control' value={leaveObj.noOfHalfDayLeaves} onChange={(event) => { getLeaveObj(event, 'noOfHalfDayLeaves') }}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetLeaveData}>Reset</button>
                                    </div>
                                    <div className='col-6 mt-3 text-center'>
                                        {
                                           leaveObj.leaveId == 0 && <button className='btn btn-success btn-sm' onClick={addLeaveData}>Save Data</button>
                                        }
                                        {
                                           leaveObj.leaveId !== 0 && <button className='btn btn-primary btn-sm' >Save Data</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-warning" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong>Leaves List</strong>
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
                                            <th>Leave Date</th>
                                            <th>Reason</th>
                                            <th>Full Day Leaves</th>
                                            <th>Half Day Leaves</th>
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
                                                leaveData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.empContactNo}</td>
                                                        <td>{item.leaveDate}</td>
                                                        <td>{item.leaveReason}</td>
                                                        <td>{item.noOfFullDayLeaves}</td>
                                                        <td>{item.noOfHalfDayLeaves}</td>
                                                        <td><button className='btn btn-danger btn-sm' onClick={() => { editLeaveData(item) }}>Edit</button></td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => { deleteLeaveData(item.leaveId) }}>Delete</button></td>
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