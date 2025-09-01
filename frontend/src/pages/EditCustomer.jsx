import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, updateCustomer } from "../api/customerApi";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await getCustomer(id);
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load customer");
        navigate("/");
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, form);
      alert("Customer updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {key}
            </label>
            <input
              id={key}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
