import React, { useEffect, useState } from 'react';
import axios from 'axios';
const SalaryAdvance = () => {

    //select employee from dropdown 
    let [employeeAdvance, setEmployeeAdvance] = useState([]);


    //employee list data store
    let [employeeList, SetEmployeeList] = useState([]);

    useEffect(() => {
        getEmployee();
        getSalaryAdvance();
    }, []);
    const getSalaryAdvance = async () => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance");
        SetEmployeeList(result.data.data);
    }






    const getEmployee = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
        setEmployeeAdvance(result.data.data);
    }


    //Add Salary Advance
    //create obj
    let [addAdvanceobj, setAddAdvanceObj] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": ""
    })
    const addAdvance = async () => {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance", addAdvanceobj);
        debugger;
        if (result.data.result) {
            debugger;
            alert('Advance Added');
            getSalaryAdvance();
        } else {
            alert(result.data.message)
        }

    }
    //Read Input Value
    const changeValue = (event, key) => {
        setAddAdvanceObj(prevobj => ({ ...prevobj, [key]: event.target.value }));
    }
    //edit
    const editSalaryAdvance = async (id) => {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?advanceId" + id);
        debugger;
        if (result.data.result) { //result.data mdhe purn object bhetla
            setAddAdvanceObj(result.data.data)
            debugger;

        } else {
            alert(result.data.message)
        }
    }
    //update 
    const updateSalary = async () => {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance",addAdvanceobj);
        debugger;
        if (result.data.result) {
            debugger;
            alert("Salary Update Successfull");
            // getSalaryAdvance();

        } else {
            alert(result.data.massage)
        }
    }
    //delete 
    const deleteAdvance=async(id)=>{
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById" + id);
        debugger;
        if (result.data.result) {
            alert("Advance Delete Succefully")
            // getSalaryAdvance();
        } else {
            alert(result.data.message)
        }
    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                Salary Advance
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Employee</th>
                                            <th>Contact No </th>
                                            <th>AdvanceDate </th>
                                            <th>AdvanceAmount </th>
                                            <th>Reason</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employeeList.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.empName}</td>
                                                        <td>{item.empContactNo}</td>
                                                        <td>{item.advanceDate}</td>
                                                        <td>{item.advanceAmount}</td>
                                                        <td>{item.reason}</td>

                                                        <td><button className='btn btn-sm btn-primary' onClick={() => { editSalaryAdvance(item.advanceId) }}>Edit</button></td>

                                                    </tr>
                                                )
                                            })

                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                New Attendance
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Select Employee</label>
                                        <select className='form-select' onChange={(event) => { changeValue(event, 'employeeId') }} >
                                            <option value={addAdvanceobj.employeeId}>Select Employee</option>
                                            {
                                                employeeAdvance.map((item) => {
                                                    return (<option value={item.empId}> {item.empName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Advance Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeValue(event, 'advanceDate') }} value={addAdvanceobj.advanceDate} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 pt-1'>
                                        <label>Advance Amount</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeValue(event, 'advanceAmount') }} value={addAdvanceobj.advanceAmount} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Reason</label>
                                        <textarea className='form-control' onChange={(event) => { changeValue(event, 'reason') }} value={addAdvanceobj.reason}/>
                                    </div>
                                </div>

                                <div className='row pt-3'>
                                    <div className='col-12'>
                                        <button className='btn btn-secondary'>Reset</button>&nbsp;
                                        <button className='btn btn-success' onClick={addAdvance}>Add Advance</button>&nbsp;
                                        <button className='btn btn-success' onClick={updateSalary}>Update</button>&nbsp;
                                        <button className='btn btn-danger' onClick={deleteAdvance}>Delete</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryAdvance;