import React, { useState, useEffect } from "react";
import axios from "axios";

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => setRoles(res.data));
  }, []);

  const handlePermissionChange = (permission) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((p) => p !== permission)
      : [...selectedRole.permissions, permission];

    axios
      .put(`http://localhost:5000/roles/${selectedRole.id}`, {
        ...selectedRole,
        permissions: updatedPermissions,
      })
      .then((res) => {
        setRoles(
          roles.map((role) => (role.id === res.data.id ? res.data : role))
        );
        setSelectedRole(res.data);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            const role = roles.find((r) => r.id === parseInt(e.target.value));
            setSelectedRole(role);
            setPermissions(role ? role.permissions : []);
          }}
          value={selectedRole ? selectedRole.id : ""}
        >
          <option value="" disabled>
            Select a Role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      {selectedRole && (
        <div>
          <h3 className="text-lg font-bold mb-2">
            Permissions for {selectedRole.name}
          </h3>
          <div className="flex gap-4">
            {["Read", "Write", "Delete"].map((permission) => (
              <label key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                <span className="ml-2">{permission}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManagement;
