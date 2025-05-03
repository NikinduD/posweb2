import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Important for PDF tables
import '../assets/styles/SupplyManagement.css';

const SupplyManagement = () => {
  const [supplies, setSupplies] = useState([]);
  const [currentSupply, setCurrentSupply] = useState(null);
  const [supplierID, setSupplierID] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [contact, setContact] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    const initialSupplies = [
      { id: 1, supplier_id: 'S001', supplier_name: 'Supplier A', contact: '1234567890', company_name: 'Company A', email: 'supplierA@example.com' },
      { id: 2, supplier_id: 'S002', supplier_name: 'Supplier B', contact: '9876543210', company_name: 'Company B', email: 'supplierB@example.com' },
      { id: 3, supplier_id: 'S003', supplier_name: 'Supplier C', contact: '1112223333', company_name: 'Company A', email: 'supplierC@example.com' },
    ];
    setSupplies(initialSupplies);
  }, []);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!supplierID.trim()) {
      formErrors.supplierID = "Supplier ID is required";
      isValid = false;
    }

    if (!supplierName.trim()) {
      formErrors.supplierName = "Supplier Name is required";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!contact.trim()) {
      formErrors.contact = "Contact is required";
      isValid = false;
    } else if (!phoneRegex.test(contact)) {
      formErrors.contact = "Contact must be 10 digits";
      isValid = false;
    }

    if (!companyName.trim()) {
      formErrors.companyName = "Company Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Email must be in a valid format (example@example.com)";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newSupply = {
      id: currentSupply ? currentSupply.id : Date.now(),
      supplier_id: supplierID,
      supplier_name: supplierName,
      contact,
      company_name: companyName,
      email,
    };

    if (currentSupply) {
      setSupplies(supplies.map(supply => (supply.id === currentSupply.id ? newSupply : supply)));
    } else {
      setSupplies([...supplies, newSupply]);
    }

    setSupplierID('');
    setSupplierName('');
    setContact('');
    setCompanyName('');
    setEmail('');
    setCurrentSupply(null);
    setErrors({});
  };

  const handleDelete = (id) => {
    setSupplies(supplies.filter(supply => supply.id !== id));
  };

  const handleEdit = (supply) => {
    setCurrentSupply(supply);
    setSupplierID(supply.supplier_id);
    setSupplierName(supply.supplier_name);
    setContact(supply.contact);
    setCompanyName(supply.company_name);
    setEmail(supply.email);
    setErrors({});
  };

  const filteredSupplies = supplies.filter(supply =>
      supply.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCompany === '' || supply.company_name === selectedCompany)
  );

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Supplier Report', 14, 10);

    const tableColumn = ["Supplier ID", "Supplier Name", "Contact", "Company", "Email"];
    const tableRows = [];

    filteredSupplies.forEach(supply => {
      const rowData = [
        supply.supplier_id,
        supply.supplier_name,
        supply.contact,
        supply.company_name,
        supply.email
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('supplier_report.pdf');
  };

  return (
      <div className="supply-management">
        <h2>Supply Management</h2>

        {/* Search & Filter Inputs */}
        <div className="filter-section">
          <input
              type="text"
              placeholder="Search by Supplier Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">All Companies</option>
            {[...new Set(supplies.map(supply => supply.company_name))].map(company => (
                <option key={company} value={company}>{company}</option>
            ))}
          </select>
          <button onClick={handleGeneratePDF}>Generate PDF Report</button>
        </div>

        {/* Form */}
        <div className='supply-management-form'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Supplier ID:</label>
              <input type="text" value={supplierID} onChange={(e) => setSupplierID(e.target.value)} />
              {errors.supplierID && <p className="error">{errors.supplierID}</p>}
            </div>
            <div>
              <label>Supplier Name:</label>
              <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
              {errors.supplierName && <p className="error">{errors.supplierName}</p>}
            </div>
            <div>
              <label>Contact:</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
              {errors.contact && <p className="error">{errors.contact}</p>}
            </div>
            <div>
              <label>Company Name:</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              {errors.companyName && <p className="error">{errors.companyName}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <button type="submit">{currentSupply ? 'Update' : 'Add'} Supply</button>
          </form>
        </div>

        <div className='supply-management-table'>
          <div className="supply-table">
            <h3>List of Supplies</h3>
            <table>
              <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Supplier Name</th>
                <th>Contact</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredSupplies.map(supply => (
                  <tr key={supply.id}>
                    <td>{supply.supplier_id}</td>
                    <td>{supply.supplier_name}</td>
                    <td>{supply.contact}</td>
                    <td>{supply.company_name}</td>
                    <td>{supply.email}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(supply)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(supply.id)}>Delete</button>
                    </td>
                  </tr>
              ))}
              {filteredSupplies.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'red' }}>No suppliers found</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default SupplyManagement;
