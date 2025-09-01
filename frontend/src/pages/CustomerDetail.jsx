import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer, addAddress } from "../api/customerApi";

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load customer + addresses
  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const { data } = await getCustomer(id);
      setCustomer(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load customer");
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await addAddress(id, newAddress);
      alert("Address added successfully!");
      setNewAddress({ address: "", city: "", state: "", pincode: "" });
      fetchCustomer(); // reload updated addresses
    } catch (err) {
      console.error(err);
      alert("Failed to add address");
    }
  };

  if (!customer) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      {/* Customer Info */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {customer.firstName} {customer.lastName}
      </h2>
      <p className="text-gray-700"><strong>Phone:</strong> {customer.phone}</p>
      <p className="text-gray-700"><strong>City:</strong> {customer.city}</p>
      <p className="text-gray-700"><strong>State:</strong> {customer.state}</p>
      <p className="text-gray-700"><strong>Pincode:</strong> {customer.pincode}</p>

      {/* Address Section */}
      <h3 className="text-xl font-semibold mt-6 mb-4">Addresses</h3>
      {customer.addresses?.length > 0 ? (
        <div
          className={`grid gap-4 ${
            customer.addresses.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {customer.addresses.map((a) => (
            <div
              key={a.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="font-medium text-gray-800">{a.address}</p>
              <p className="text-gray-600">{a.city}</p>
              <p className="text-gray-600">{a.state}</p>
              <p className="text-gray-600">{a.pincode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No addresses yet</p>
      )}

      {/* Add Address Form */}
      <h3 className="text-xl font-semibold mt-8 mb-3">Add New Address</h3>
      <form onSubmit={handleAddAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="address"
          placeholder="Address"
          value={newAddress.address}
          onChange={handleAddressChange}
          required
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleAddressChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleAddressChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={newAddress.pincode}
          onChange={handleAddressChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerDetail;
