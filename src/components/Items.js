import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../assets/styles/Items.css";

const Items = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      itemId: "ITM001",
      itemName: "Laptop Pro",
      category: "Laptop",
      costPrice: 1000,
      sellPrice: 1200
    },
    {
      id: 2,
      itemId: "ITM002",
      itemName: "Gaming Mouse",
      category: "Accessories",
      costPrice: 30,
      sellPrice: 50
    }
  ]);

  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    category: "Desktop",
    costPrice: "",
    sellPrice: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.itemId.trim()) newErrors.itemId = "Item ID is required";
    if (!formData.itemName.trim()) newErrors.itemName = "Item Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.costPrice) {
      newErrors.costPrice = "Cost Price is required";
    } else if (formData.costPrice <= 0) {
      newErrors.costPrice = "Cost Price must be positive";
    }
    if (!formData.sellPrice) {
      newErrors.sellPrice = "Sell Price is required";
    } else if (formData.sellPrice <= 0) {
      newErrors.sellPrice = "Sell Price must be positive";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newItem = {
      ...formData,
      id: Date.now(),
      costPrice: parseFloat(formData.costPrice),
      sellPrice: parseFloat(formData.sellPrice)
    };
    setItems((prev) => [...prev, newItem]);
    setFormData({
      itemId: "",
      itemName: "",
      category: "Desktop",
      costPrice: "",
      sellPrice: ""
    });
    setErrors({});
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Items Report", 14, 15);
    const tableColumn = ["Item ID", "Item Name", "Category", "Cost Price", "Sell Price"];
    const tableRows = items.map(item => [
      item.itemId,
      item.itemName,
      item.category,
      item.costPrice,
      item.sellPrice
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save("items_report.pdf");
  };

  return (
      <div className="items-page">
        <h2>Manage Items</h2>

        <div className="form-container">
          <h3>Add New Item</h3>
          <label>
            Item ID:
            <input
                type="text"
                name="itemId"
                value={formData.itemId}
                onChange={handleInputChange}
            />
            {errors.itemId && <span className="error">{errors.itemId}</span>}
          </label>
          <label>
            Item Name:
            <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
            />
            {errors.itemName && <span className="error">{errors.itemName}</span>}
          </label>
          <label>
            Item Category:
            <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
            >
              <option value="Desktop">Desktop</option>
              <option value="Laptop">Laptop</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <span className="error">{errors.category}</span>}
          </label>
          <label>
            Cost Price:
            <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
            />
            {errors.costPrice && <span className="error">{errors.costPrice}</span>}
          </label>
          <label>
            Sell Price:
            <input
                type="number"
                name="sellPrice"
                value={formData.sellPrice}
                onChange={handleInputChange}
            />
            {errors.sellPrice && <span className="error">{errors.sellPrice}</span>}
          </label>
          <button className="add-btn" onClick={handleAddItem}>Add Item</button>
        </div>

        <div className="table-container">
          <h3>Item List</h3>
          <button className="report-btn" onClick={generatePDF}>
            Download PDF Report
          </button>
          <table>
            <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Cost Price(Rs.)</th>
              <th>Sell Price(Rs.)</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.itemId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.costPrice}</td>
                  <td>{item.sellPrice}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Items;
