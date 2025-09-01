import { useState } from "react";
import { searchCustomers } from "../api/customerApi";

function SearchCustomers() {
  const [filters, setFilters] = useState({ city: "", state: "", pincode: "" });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await searchCustomers(filters);
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  const clearFilters = () => {
    setFilters({ city: "", state: "", pincode: "" });
    setResults([]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Customers</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
       
        <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Pincode"
          value={filters.pincode}
          onChange={(e) => setFilters({ ...filters, pincode: e.target.value })}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Clear
        </button>
      </div>

      <ul className="space-y-3">
        {results.length > 0 ? (
          results.map((c) => (
            <li
              key={c.id}
              className="p-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <p className="font-medium">
                {c.firstName} {c.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {c.city} — {c.phone}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
}

export default SearchCustomers;
