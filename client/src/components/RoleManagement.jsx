import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ name: "", permissions: [] });
  const availablePermissions = ["Read", "Write", "Delete"];

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => setRoles(res.data));
  }, []);

  const handleSubmit = () => {
    if (form.id) {
      axios.put(`http://localhost:5000/roles/${form.id}`, form).then((res) => {
        setRoles(roles.map((r) => (r.id === res.data.id ? res.data : r)));
      });
    } else {
      axios.post("http://localhost:5000/roles", form).then((res) => {
        setRoles([...roles, res.data]);
      });
    }
    setForm({ name: "", permissions: [] });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/roles/${id}`).then(() => {
      setRoles(roles.filter((r) => r.id !== id));
    });
  };

  const togglePermission = (permission) => {
    const permissions = form.permissions.includes(permission)
      ? form.permissions.filter((p) => p !== permission)
      : [...form.permissions, permission];
    setForm({ ...form, permissions });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Role Management
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            <input
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Role Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="flex flex-wrap items-center gap-4">
              {availablePermissions.map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              {form.id ? "Update Role" : "Add Role"}
            </button>
          </div>
        </form>
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="p-4 text-left">Role Name</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-t hover:bg-blue-50 transition"
              >
                <td className="p-4">{role.name}</td>
                <td className="p-4">{role.permissions.join(", ")}</td>
                <td className="p-4 flex justify-center gap-4">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => setForm(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
