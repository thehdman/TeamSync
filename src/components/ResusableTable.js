import React from 'react';

const ResusableTable = (props) => {
    return (
        <div>
            <tr>
                {
                    props.resusableData.map((item, index) => {
                        return (<tr>
                            <td>{index +1}</td>
                            <td>{item.empName}</td>
                            <td>{item.empContactNo}</td>
                            <td>{item.empEmail}</td>
                            <td>{item.city}</td>
                        </tr>)
                    })
                }
            </tr>
        </div>
    );
};

export default ResusableTable;