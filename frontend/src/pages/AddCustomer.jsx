import { useState } from "react";
import { createCustomer } from "../api/customerApi";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer(form);
    alert("Customer created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Customer
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
