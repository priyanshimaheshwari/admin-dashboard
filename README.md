# *Admin Dashboard*

A feature-rich *Admin Dashboard* built with *React, **Node.js, and **Tailwind CSS* to manage users, roles, and permissions efficiently.

---


![Screenshot (786)](https://github.com/user-attachments/assets/ca68cef0-f94a-431f-90f6-3bcc3e9b724f)

![Screenshot (788)](https://github.com/user-attachments/assets/4f580dd4-397f-4671-973a-1ed144a501fb)

![Screenshot (789)](https://github.com/user-attachments/assets/074a52ec-863a-4197-9500-14b27ecee068)



## *Features*

### *Core Functionality*
1. *User Management*
   - Add, edit, and delete users.
   - Assign roles to users.
   - Manage user status (Active/Inactive).

2. *Role Management*
   - Create, edit, and delete roles.
   - Assign permissions to roles.

3. *Permissions Management* (Future Enhancement)
   - Define dynamic permissions for roles and users.

---

## *Technologies Used*

### *Frontend*
- *React*: UI Development
- *React Router*: Navigation and routing
- *Axios*: API requests
- *Tailwind CSS*: Styling

### *Backend*
- *Node.js*: Server-side logic
- *Express.js*: API development
- *Cors*: Cross-Origin Resource Sharing
- *Body-Parser*: JSON handling

---

## *Setup Instructions*

### *Step 1: Clone the Repository*
```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
Step 2: Install Dependencies
Backend
bash
Copy code
cd server
npm install
Frontend
bash
Copy code
cd client
npm install
Step 3: Configure Tailwind CSS
Ensure Tailwind CSS is configured in the React project.

Install Tailwind dependencies:

bash
Copy code
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
Add Tailwind directives to client/src/index.css:

css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
Step 4: Run the Application
Start the Backend
bash
Copy code
cd server
node index.js
Server runs on http://localhost:5000.

Start the Frontend
bash
Copy code
cd client
npm start
React app runs on http://localhost:3000.




