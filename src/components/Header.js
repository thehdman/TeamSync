import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <div className='comtainer-fluid'>
                <div className='row'>
                    <div className='col-12'>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;