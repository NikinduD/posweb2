import React, { useState } from "react";
import "../assets/styles/Customers.css"; // Ensure this is the correct path for your styles

const Customer = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Customer A", email: "customerA@example.com", address: "Address A", contactNo: "1234567890" },
    { id: 2, name: "Customer B", email: "customerB@example.com", address: "Address B", contactNo: "0987654321" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", address: "", contactNo: "" });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.address && newCustomer.contactNo) {
      setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
      setNewCustomer({ name: "", email: "", address: "", contactNo: "" });
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
      <div className="customer-container">
        <h2>Customer Management</h2>

        {/* Customer Form */}
        <div className="form-container">
          <h3>Add New Customer</h3>
          <label>Customer Name:</label>
          <input type="text" name="name" value={newCustomer.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={newCustomer.email} onChange={handleChange} />

          <label>Address:</label>
          <input type="text" name="address" value={newCustomer.address} onChange={handleChange} />

          <label>Contact No:</label>
          <input type="text" name="contactNo" value={newCustomer.contactNo} onChange={handleChange} />

          <button onClick={addCustomer} className="add-btn">Add Customer</button>
        </div>

        {/* Customer List Table */}
        <div className="table-container">
          <table>
            <thead>
            <tr>
              <th colSpan="6" className="table-title">List of Customers</th>
            </tr>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.contactNo}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default Customer;
