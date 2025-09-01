import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../api/customerApi";
import { Link } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer List</h2>

      {customers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {customers.map((c) => (
            <div
              key={c.id}
              className="p-5 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                <Link to={`/customers/${c.id}`} className="hover:underline">
                  {c.firstName} {c.lastName}
                </Link>
              </h3>
              <p className="text-gray-600">📍 {c.city}, {c.state}</p>
              <p className="text-gray-600">📞 {c.phone}</p>
              <p className="text-gray-600">🏷️ Pincode: {c.pincode}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <Link
                  to={`/edit/${c.id}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerList;
