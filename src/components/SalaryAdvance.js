import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SalaryAdvance = () => {

    const API = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const updateAdvanceDataApi = "https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance";


    let [empData, setEmpData] = useState([]);
    let [advanceData, setAdvanceData] = useState([]);
    let [advanceObj, setAdvanceObj] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": ""
    });
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showAdvanceData();
        showEmpData();
    }, []);

    const showAdvanceData = async () => {
        const result = await axios.get(API + 'GetAllAdvance');
        setIsLoader(false);
        setAdvanceData(result.data.data);
    }

    const getAdvanceData = (event, key) => {
        setAdvanceObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const showEmpData = async () => {
        const result = await axios.get(API + 'GetAllEmployee');
        setEmpData(result.data.data)
    }

    const addAdvance = async () => {
        const result = await axios.post(API + 'AddAdvance', advanceObj);
        if (result.data.result) {
            alert('Attendance Data Added Successfully');
            showAdvanceData();
        }
        else {
            alert(result.data.message);
        }
    }

    const editAdvanceData = async (item) => {
        setAdvanceObj(prevObj => ({...prevObj, 
            advanceId:item.advanceId,
            employeeId:item.employeeId,
            advanceDate:item.advanceDate,
            advanceAmount:item.advanceAmount,
            reason:item.reason
        }))
    }

    const updateAdvance = async () => { }

    const deleteAdvanceData = async (id) => {
        const result = await axios.get(API + 'DeleteAdvanceById?advanceId=' + id);
        if (result.data.result) {
            alert('Attendance Data Deleted Successfully');
            showAdvanceData();
        }
        else {
            alert(result.data.message)
        }
    }

    const resetAdvanceData = () => {
        setAdvanceObj({
            "advanceId": 0,
            "employeeId": 0,
            "advanceDate": "",
            "advanceAmount": 0,
            "reason": ""
        })
    }


    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="card">
                            <div class="card-header bg-success" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Add Advance</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee</label>
                                        <select className='form-select' value={advanceObj.employeeId} onChange={(event) => { getAdvanceData(event, 'employeeId') }}>
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
                                        <input type='date' className='form-control' value={advanceObj.advanceDate} onChange={(event) => { getAdvanceData(event, 'advanceDate') }}></input>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Advance Amount</label>
                                        <input type='number' className='form-control' value={advanceObj.advanceAmount} onChange={(event) => { getAdvanceData(event, 'advanceAmount') }}></input>
                                    </div>
                                    <div className='col-6'>
                                        <label>Reason</label>
                                        <input type='text' className='form-control' value={advanceObj.reason} onChange={(event) => { getAdvanceData(event, 'reason') }}></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetAdvanceData}>Reset</button>
                                    </div>
                                    <div className='col-6 mt-3 text-center'>
                                        {
                                            advanceObj.advanceId == 0 && <button className='btn btn-warning btn-sm' onClick={addAdvance}>Save Data</button>
                                        }
                                        {
                                            advanceObj.advanceId !== 0 && <button className='btn btn-danger btn-sm' onClick={updateAdvance}>Save Data</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-success" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Advance List</strong>
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
                                            <th>Advance Amount</th>
                                            <th>Reason</th>
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
                                                 advanceData.map((item, index) => {
                                                     return (<tr>
                                                         <td>{index + 1}</td>
                                                         <td>{item.empName}</td>
                                                         <td>{item.empContactNo}</td>
                                                         <td>{item.advanceDate}</td>
                                                         <td>{item.advanceAmount}</td>
                                                         <td>{item.reason}</td>
                                                         <td><button className='btn btn-primary btn-sm' onClick={() => { editAdvanceData(item) }}>Edit</button></td>
                                                         <td><button className='btn btn-danger btn-sm' onClick={() => { deleteAdvanceData(item.advanceId) }}>Delete</button></td>
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

export default SalaryAdvance;