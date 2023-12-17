import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeAttendance = () => {
    
    const API = "https://onlinetestapi.gerasim.in/api/TeamSync/";

    let [attendanceData, setAttendanceData] = useState([]);
    let [attendanceObj, setAttendanceObj] = useState({
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate": "",
        "inTime": "",
        "outTime": "",
        "isFullDay": false
    });
    let [empData, setEmpData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showAttendance();
        showEmpName();
    }, [])

    const showAttendance = async () => {
        const result = await axios.get(API + 'GetAllAttendance');
        setIsLoader(false)
        setAttendanceData(result.data.data);
    }

    const getAttendanceData = (event, key) => {
        setAttendanceObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const getAttendanceDataForFullDay = (event) => {
        setAttendanceObj(prevData => ({ ...prevData, isFullDay: event.target.checked }));
    }

    const showEmpName = async () => {
        const result = await axios.get(API + 'GetAllEmployee');
        setEmpData(result.data.data);
    }

    const addAttendance = async () => {
        debugger;
        const result = await axios.post(API + 'AddAttendance', attendanceObj);
        if (result.data.result) {
            alert('Attendance Data Added Successfully');
            showAttendance();
        }
        else {
            alert(result.data.message);
        }
    }

    const editAttendanceData = (item) => {
        setAttendanceObj(prevObj => ({
            ...prevObj, attendanceId: item.attendanceId,
            employeeId: item.employeeId,
            attendanceDate: item.attendanceDate,
            inTime: item.inTime,
            outTime: item.outTime,
            isFullDay: item.isFullDay
        }))
    }

    const updateAttendance = async () => { }

    const deleteAttendance = async (id) => {
        const result = await axios.get(API + 'DeleteAttendanceById?attendanceId=' + id);
        if (result.data.result) {
            alert('Attendance Data Deleted Successfully');
            showAttendance();
        }
        else {
            alert(result.data.message);
        }
    }

    const resetAttendanceData = () => {
        setAttendanceObj({
            "attendanceId": 0,
            "employeeId": 0,
            "attendanceDate": "",
            "inTime": "",
            "outTime": "",
            "isFullDay": false
        })
    }



    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="card">
                            <div class="card-header bg-danger" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Add Atendance</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee</label>
                                        <select className='form-select' value={attendanceObj.employeeId} onChange={(event) => { getAttendanceData(event, 'employeeId') }}>
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
                                        <input type='date' className='form-control' value={attendanceObj.attendanceDate} onChange={(event) => { getAttendanceData(event, 'attendanceDate') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>In Time</label>
                                        <input type='time' className='form-control' value={attendanceObj.inTime} onChange={(event) => { getAttendanceData(event, 'inTime') }}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Out Time</label>
                                        <input type='time' className='form-control' value={attendanceObj.outTime} onChange={(event) => { getAttendanceData(event, 'outTime') }}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-start'>
                                        <input type='checkbox' id='fillId' checked={attendanceObj.isFullDay} onChange={(event) => { getAttendanceDataForFullDay(event) }}></input>
                                        <label className='ms-2' for='fillId'>Full Day</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetAttendanceData}>Reset</button>
                                    </div>
                                    <div className='col-6 mt-3 text-center'>
                                        {
                                            attendanceObj.attendanceId == 0 && <button className='btn btn-primary btn-sm' onClick={addAttendance}>Save Data</button>
                                        }
                                        {
                                            attendanceObj.attendanceId !== 0 && <button className='btn btn-success btn-sm' onClick={updateAttendance}>Save Data</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-danger" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Attendance List</strong>
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
                                            <th>Attendance Date</th>
                                            <th>In Time</th>
                                            <th>Out Time</th>
                                            <th>Day</th>
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
                                        isLoader == false && <tbody>
                                            {
                                                attendanceData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.empContactNo}</td>
                                                        <td>{item.attendanceDate}</td>
                                                        <td>{item.inTime}</td>
                                                        <td>{item.outTime}</td>
                                                        <td>{item.isFullDay ? 'Full Day' : 'Half day'}</td>
                                                        <td><button className='btn btn-warning btn-sm' onClick={() => { editAttendanceData(item) }}>Edit</button></td>
                                                        <td><button className='btn btn-success btn-sm' onClick={() => { deleteAttendance(item.attendanceId) }}>Delete</button></td>
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

export default EmployeeAttendance;