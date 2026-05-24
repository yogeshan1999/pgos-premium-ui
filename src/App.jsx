import { useMemo, useState } from 'react';
import { Building2, LogOut, Plus, Search, Trash2, Pencil, Eye, CheckCircle2 } from 'lucide-react';
import { companyMenu, demoUsers, initialData, ownerMenu, tenantMenu } from './data/mockData';
import { isSupabaseConfigured } from './services/supabaseService';

const ENTITY_FIELDS = {
  properties: ['name', 'city', 'status'], rooms: ['property', 'room', 'beds', 'occupied', 'status'], tenants: ['name', 'room', 'phone', 'status'],
  payments: ['tenant', 'amount', 'status', 'month'], expenses: ['title', 'amount', 'category', 'status'], food: ['day', 'meal', 'status'],
  complaints: ['title', 'by', 'status'], notices: ['title', 'date', 'status'], visitors: ['name', 'tenant', 'status'], checkout: ['tenant', 'date', 'status'],
  documents: ['tenant', 'type', 'status'], agreements: ['tenant', 'duration', 'status'], staff: ['name', 'role', 'status'], websites: ['domain', 'status'],
};
const PAGE_TO_ENTITY = {'Properties':'properties','Rooms & Beds':'rooms','Tenants':'tenants','Payments':'payments','Expenses':'expenses','Food':'food','Complaints':'complaints','Notices':'notices','Visitor Details':'visitors','Checkout':'checkout','Documents':'documents','Agreement':'agreements','Staff':'staff','PG Website':'websites'};

export default function App() {
  const [portal, setPortal] = useState('landing');
  const [page, setPage] = useState('Dashboard');
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState('');
  const [auth, setAuth] = useState({ username: '', password: '' });
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);

  const menu = portal === 'owner' ? ownerMenu : portal === 'tenant' ? tenantMenu : companyMenu;
  const entity = PAGE_TO_ENTITY[page];
  const rows = useMemo(() => entity ? (data[entity] || []).filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())) : [], [entity, data, q]);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2200); };
  const login = (role) => {
    const valid = demoUsers[role];
    if (auth.username === valid.username && auth.password === valid.password) {
      setPortal(role); setPage(role === 'owner' ? 'Dashboard' : role === 'tenant' ? 'Home' : 'Company Overview');
      notify(`${role} login success`);
    } else notify('Invalid demo credentials');
  };

  const upsert = (payload) => {
    const key = entity;
    if (!key) return;
    setData((prev) => {
      const list = [...prev[key]];
      if (payload.id) {
        const i = list.findIndex((x) => x.id === payload.id); list[i] = payload;
      } else list.push({ ...payload, id: Date.now() });
      return { ...prev, [key]: list };
    });
    setModal(null); notify(payload.id ? 'Updated' : 'Created');
  };

  const remove = (id) => { setData((p) => ({ ...p, [entity]: p[entity].filter((x) => x.id !== id) })); notify('Deleted'); };

  if (portal === 'landing') return <Landing auth={auth} setAuth={setAuth} login={login} />;

  return <div className='min-h-screen flex'>
    <aside className='w-72 bg-slate-900 text-white p-4 hidden md:block'>
      <div className='flex items-center gap-2 font-bold text-lg mb-5'><Building2 /> PGOS Premium</div>
      {menu.map((m) => <button key={m} onClick={() => setPage(m)} className={`w-full text-left px-3 py-2 rounded mb-1 ${page === m ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>{m}</button>)}
      <button onClick={() => setPortal('landing')} className='mt-4 w-full bg-rose-600 px-3 py-2 rounded flex items-center justify-center gap-2'><LogOut size={16} />Logout</button>
    </aside>
    <main className='flex-1 p-4 md:p-6'>
      <header className='bg-white p-4 rounded-xl shadow-sm flex gap-3 items-center mb-4'>
        <Search className='text-slate-400' size={18} /><input placeholder='Search anything...' value={q} onChange={(e) => setQ(e.target.value)} className='outline-none flex-1' />
        <span className='text-xs rounded bg-slate-100 px-2 py-1'>{isSupabaseConfigured ? 'Supabase Ready' : 'Mock Mode'}</span>
      </header>
      <section className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-4'>{['Total Tenants','Occupancy','Monthly Revenue','Open Complaints'].map((k, i) => <button key={k} onClick={() => notify(`${k} details opened`)} className='bg-white p-4 rounded-xl text-left shadow-sm'><div className='text-xs text-slate-500'>{k}</div><div className='text-xl font-semibold'>{[128,'84%', '₹12.4L', 6][i]}</div></button>)}</section>
      <Card page={page} entity={entity} rows={rows} onCreate={() => setModal({})} onEdit={(r) => setModal(r)} onDelete={remove} notify={notify} />
      {modal && entity && <EntityModal fields={ENTITY_FIELDS[entity]} initial={modal} onClose={() => setModal(null)} onSave={upsert} />}
      {toast && <div className='fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg flex gap-2 items-center'><CheckCircle2 size={16} />{toast}</div>}
    </main>
  </div>;
}

function Landing({ auth, setAuth, login }) {
  return <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 p-4'>
    <div className='bg-white max-w-2xl w-full rounded-2xl p-6'>
      <h1 className='text-3xl font-bold'>PGOS Premium SaaS</h1><p className='text-slate-500 mb-4'>Login to your portal</p>
      <div className='grid md:grid-cols-2 gap-3 mb-4'>
        <input className='border p-2 rounded' placeholder='username' value={auth.username} onChange={(e) => setAuth({ ...auth, username: e.target.value })} />
        <input className='border p-2 rounded' type='password' placeholder='password' value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} />
      </div>
      <div className='flex flex-wrap gap-2'>
        <button className='bg-indigo-600 text-white px-4 py-2 rounded' onClick={() => login('owner')}>Owner / Manager / Staff Login</button>
        <button className='bg-emerald-600 text-white px-4 py-2 rounded' onClick={() => login('tenant')}>Tenant Login</button>
        <button className='bg-slate-800 text-white px-4 py-2 rounded' onClick={() => login('admin')}>Company Admin Login</button>
      </div>
      <div className='text-sm mt-4 bg-slate-50 p-3 rounded'>Demo creds: owner@demo.com / owner123 | tenant@demo.com / tenant123 | admin@demo.com / admin123</div>
    </div>
  </div>;
}

function Card({ page, entity, rows, onCreate, onEdit, onDelete, notify }) {
  if (!entity) return <div className='bg-white rounded-xl p-5 shadow-sm'>
    <h2 className='font-semibold mb-2'>{page}</h2>
    <p className='text-slate-600'>Interactive dashboard area for {page}. All cards and menu options are clickable.</p>
    <button onClick={() => notify('Action executed')} className='mt-3 bg-indigo-600 text-white px-4 py-2 rounded'>Run Action</button>
  </div>;
  return <div className='bg-white rounded-xl p-4 shadow-sm'>
    <div className='flex justify-between items-center mb-3'><h2 className='font-semibold'>{page}</h2><button onClick={onCreate} className='bg-indigo-600 text-white px-3 py-2 rounded flex gap-2'><Plus size={16} />Add</button></div>
    {rows.length === 0 ? <div className='text-slate-500 text-center p-8 border rounded-lg'>No records found.</div> :
      <div className='overflow-auto'><table className='w-full text-sm'><thead><tr>{Object.keys(rows[0]).map((k) => <th key={k} className='text-left p-2 border-b'>{k}</th>)}<th className='p-2'>Actions</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.id}>{Object.entries(r).map(([k, v]) => <td key={k} className='p-2 border-b'>{v}</td>)}<td className='p-2 border-b'><div className='flex gap-2'>
          <button onClick={() => onEdit(r)}><Pencil size={16} /></button><button onClick={() => onDelete(r.id)}><Trash2 size={16} /></button><button onClick={() => alert(JSON.stringify(r, null, 2))}><Eye size={16} /></button>
        </div></td></tr>)}</tbody></table></div>}
  </div>;
}

function EntityModal({ fields, initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  return <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
    <div className='bg-white rounded-xl p-4 w-full max-w-xl'>
      <h3 className='font-semibold mb-3'>{initial.id ? 'Edit' : 'Create'} Record</h3>
      <div className='grid md:grid-cols-2 gap-3'>{fields.map((f) => <input key={f} className='border p-2 rounded' placeholder={f} value={form[f] ?? ''} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />)}</div>
      <div className='mt-4 flex justify-end gap-2'><button onClick={onClose} className='px-3 py-2 border rounded'>Cancel</button><button onClick={() => onSave(form)} className='px-3 py-2 bg-indigo-600 text-white rounded'>Save</button></div>
    </div>
  </div>;
}
