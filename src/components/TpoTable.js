import React, { useState } from 'react';
import { utils, writeFile } from 'xlsx';
import './TpoTable.css';

const TpoTable = () => {
  const [columns, setColumns] = useState([
    'TPO_ID', 'College_ID', 'First_Name', 'Middle_Name', 'Last_Name', 'Branch',
    'Contact_Number', 'College_Mail_ID', 'SSC_Percentage', 'HSC_Percentage',
    'Diploma_Aggregate_Percentage', 'Degree_Aggregate_Percentage', 'Degree_Aggregate_CGPA'
  ]);

  const [data, setData] = useState([
    {
      TPO_ID: 1,
      College_ID: 'C001',
      First_Name: 'John',
      Middle_Name: 'A',
      Last_Name: 'Doe',
      Branch: 'CSE',
      Contact_Number: '1234567890',
      College_Mail_ID: 'john@example.com',
      SSC_Percentage: 85,
      HSC_Percentage: 88,
      Diploma_Aggregate_Percentage: 100,
      Degree_Aggregate_Percentage: 75,
      Degree_Aggregate_CGPA: 7.5,
    },
    {
      TPO_ID: 2,
      College_ID: 'C002',
      First_Name: 'Jane',
      Middle_Name: 'B',
      Last_Name: 'Smith',
      Branch: 'ECE',
      Contact_Number: '0987654321',
      College_Mail_ID: 'jane@example.com',
      SSC_Percentage: 90,
      HSC_Percentage: 92,
      Diploma_Aggregate_Percentage: 78,
      Degree_Aggregate_Percentage: 80,
      Degree_Aggregate_CGPA: 8.0,
    },
    {
      TPO_ID: 3,
      College_ID: 'C003',
      First_Name: 'Alice',
      Middle_Name: 'C',
      Last_Name: 'Johnson',
      Branch: 'MECH',
      Contact_Number: '1122334455',
      College_Mail_ID: 'alice@example.com',
      SSC_Percentage: 88,
      HSC_Percentage: 89,
      Diploma_Aggregate_Percentage: 76,
      Degree_Aggregate_Percentage: 78,
      Degree_Aggregate_CGPA: 7.8,
    },
    {
      TPO_ID: 4,
      College_ID: 'C004',
      First_Name: 'Bob',
      Middle_Name: 'D',
      Last_Name: 'Brown',
      Branch: 'CIVIL',
      Contact_Number: '2233445566',
      College_Mail_ID: 'bob@example.com',
      SSC_Percentage: 82,
      HSC_Percentage: 85,
      Diploma_Aggregate_Percentage: 90,
      Degree_Aggregate_Percentage: 70,
      Degree_Aggregate_CGPA: 7.0,
    },
    {
      TPO_ID: 5,
      College_ID: 'C005',
      First_Name: 'Charlie',
      Middle_Name: 'E',
      Last_Name: 'Davis',
      Branch: 'IT',
      Contact_Number: '3344556677',
      College_Mail_ID: 'charlie@example.com',
      SSC_Percentage: 95,
      HSC_Percentage: 93,
      Diploma_Aggregate_Percentage: 98,
      Degree_Aggregate_Percentage: 85,
      Degree_Aggregate_CGPA: 8.5,
    },
  ]);

  const [showAllColumns, setShowAllColumns] = useState(true);

  const toggleColumns = () => {
    setShowAllColumns(!showAllColumns);
  };

  const addCompanyColumn = () => {
    const companyName = prompt("Enter Company Name:");
    if (companyName && !columns.includes(companyName)) {
      setColumns([...columns, companyName]);
      setData(data.map(row => ({
        ...row,
        [companyName]: {
          Eligibility: '',
          Registered: '',
          Placed: ''
        }
      })));
    }
  };

  const exportToExcel = () => {
    const exportData = data.map(row => {
      const exportRow = { ...row };
      columns.forEach(column => {
        if (typeof exportRow[column] === 'object') {
          exportRow[`${column}_Eligibility`] = exportRow[column].Eligibility;
          exportRow[`${column}_Registered`] = exportRow[column].Registered;
          exportRow[`${column}_Placed`] = exportRow[column].Placed;
          delete exportRow[column];
        }
      });
      return exportRow;
    });

    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'TPO Data');

    writeFile(wb, 'tpo_data.xlsx');
  };

  return (
    <div className="table-container">
      <div className="action-button">
      <button onClick={toggleColumns}>
        {showAllColumns ? 'Hide Columns' : 'Show All Columns'}
      </button>
      <button onClick={addCompanyColumn}>Add Company Column</button>
      <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              (showAllColumns || column === 'TPO_ID' || column.includes('Name') || typeof data[0][column] === 'object') && (
                <th key={column}>{column}</th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                (showAllColumns || column === 'TPO_ID' || column.includes('Name') || typeof row[column] === 'object') && (
                  <td key={column}>
                    {typeof row[column] === 'object' ? (
                      <div>
                        <div>Eligibility: {row[column]?.Eligibility || ''}</div>
                        <div>Registered: {row[column]?.Registered || ''}</div>
                        <div>Placed: {row[column]?.Placed || ''}</div>
                      </div>
                    ) : (
                      row[column]
                    )}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TpoTable;
