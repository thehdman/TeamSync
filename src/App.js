import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import TeamSync from './components/TeamSync';
import EmployeeCreation from './components/EmployeeCreation';
import EmployeeAttendance from './components/EmployeeAttendance';
import EmployeeLeaves from './components/EmployeeLeaves';
import SalaryAdvance from './components/SalaryAdvance';
import SalaryVouchers from './components/SalaryVouchers';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Header></Header>

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
