import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import TeamSync from './components/TeamSync';
import EmployeeCreation from './components/EmployeeCreation';
import EmployeeAttendance from './components/EmployeeAttendance';
import EmployeeLeaves from './components/EmployeeLeaves';
import SalaryAdvance from './components/SalaryAdvance';
import SalaryVouchers from './components/SalaryVouchers';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <div class="container-fluid">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/Employee">Employee</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Attendance">Attendance</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="Leaves">Leaves</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="SalaryAdvance">Salary Advance</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="SalaryVouchers">Salary Vouchers</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<TeamSync></TeamSync>}></Route>
          <Route path='Employee' element={<EmployeeCreation></EmployeeCreation>}></Route>
          <Route path='Attendance' element={<EmployeeAttendance></EmployeeAttendance>}></Route>
          <Route path='Leaves' element={<EmployeeLeaves></EmployeeLeaves>}></Route>
          <Route path='SalaryAdvance' element={<SalaryAdvance></SalaryAdvance>}></Route>
          <Route path='SalaryVouchers' element={<SalaryVouchers></SalaryVouchers>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
