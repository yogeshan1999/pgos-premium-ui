export const ownerMenu = [
  'Dashboard','Properties','Rooms & Beds','Tenants','Payments','Expenses','Food','Complaints','Notices','Visitor Details','Checkout','Documents','Agreement','Staff','PG Website','Reports','PG Settings',
];

export const tenantMenu = ['Home', 'Rent', 'Food', 'Issues', 'Notices', 'Profile'];
export const companyMenu = ['Company Overview', 'PG Owners', 'Active PGs', 'SaaS Revenue', 'Support', 'Onboardings', 'Plans', 'Payments', 'Employees', 'Settings'];

export const initialData = {
  properties: [{ id: 1, name: 'Sunrise PG', city: 'Bengaluru', status: 'Active' }],
  rooms: [{ id: 1, property: 'Sunrise PG', room: 'A-101', beds: 4, occupied: 3, status: 'Available' }],
  tenants: [{ id: 1, name: 'Arjun Verma', room: 'A-101', phone: '***-***-2211', status: 'Active' }],
  payments: [{ id: 1, tenant: 'Arjun Verma', amount: 9500, status: 'Paid', month: 'May 2026' }],
  expenses: [{ id: 1, title: 'Groceries', amount: 4200, category: 'Food', status: 'Approved' }],
  food: [{ id: 1, day: 'Monday', meal: 'Paneer + Roti + Rice', status: 'Published' }],
  complaints: [{ id: 1, title: 'AC not cooling', by: 'Arjun Verma', status: 'Open' }],
  notices: [{ id: 1, title: 'Water maintenance', date: '2026-05-28', status: 'Published' }],
  visitors: [{ id: 1, name: 'Rahul', tenant: 'Arjun Verma', status: 'Checked In' }],
  checkout: [{ id: 1, tenant: 'Sahil', date: '2026-05-30', status: 'Pending' }],
  documents: [{ id: 1, tenant: 'Arjun Verma', type: 'ID Proof', status: 'Verified' }],
  agreements: [{ id: 1, tenant: 'Arjun Verma', duration: '11 months', status: 'Generated' }],
  staff: [{ id: 1, name: 'Kavita', role: 'Caretaker', status: 'Active' }],
  websites: [{ id: 1, domain: 'sunrisepg.demo', status: 'Draft' }],
};

export const demoUsers = {
  owner: { username: 'owner@demo.com', password: 'owner123' },
  tenant: { username: 'tenant@demo.com', password: 'tenant123' },
  admin: { username: 'admin@demo.com', password: 'admin123' },
};
