import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [editItemId, setEditItemId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!formData.itemId || !formData.itemName) return;

    const newItem = {
      id: Date.now(),
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellPrice: parseFloat(formData.sellPrice)
    };

    setItems([...items, newItem]);
    toast.success("Item added successfully!");

    setFormData({
      itemId: "",
      itemName: "",
      category: "Desktop",
      costPrice: "",
      sellPrice: ""
    });
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    setFormData({
      itemId: item.itemId,
      itemName: item.itemName,
      category: item.category,
      costPrice: item.costPrice,
      sellPrice: item.sellPrice
    });
  };

  const handleUpdateItem = () => {
    setItems(items.map(item =>
      item.id === editItemId
        ? {
            ...item,
            ...formData,
            costPrice: parseFloat(formData.costPrice),
            sellPrice: parseFloat(formData.sellPrice)
          }
        : item
    ));

    toast.success("Item updated successfully!");

    setEditItemId(null);
    setFormData({
      itemId: "",
      itemName: "",
      category: "Desktop",
      costPrice: "",
      sellPrice: ""
    });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item deleted successfully!");
  };

  return (
    <div className="items-page">
      <h2>Manage Items</h2>

      {/* Item Form Container */}
      <div className="form-container">
        <h3>{editItemId ? "Edit Item" : "Add New Item"}</h3>
        <label>
          Item ID:
          <input
            type="text"
            name="itemId"
            value={formData.itemId}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
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
        </label>
        <label>
          Cost Price:
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sell Price:
          <input
            type="number"
            name="sellPrice"
            value={formData.sellPrice}
            onChange={handleInputChange}
          />
        </label>

        {editItemId ? (
          <button className="edit-btn" onClick={handleUpdateItem}>
            Update Item
          </button>
        ) : (
          <button className="add-btn" onClick={handleAddItem}>
            Add Item
          </button>
        )}
      </div>

      {/* Items Table Container */}
      <div className="table-container">
        <h3>Item List</h3>
        <table>
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Sell Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>${item.costPrice}</td>
                <td>${item.sellPrice}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Items;
