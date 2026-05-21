import { useState, useEffect } from "react";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/1e2f5230-ad0c-4c1d-bd1a-b078b34dc33d";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
  status: string;
  created_at: string;
}

const emptyForm = { name: "", phone: "", email: "", company: "", notes: "", status: "active" };

export default function Crm() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchClients = async (q = "") => {
    setLoading(true);
    try {
      const url = q ? `${API_URL}?search=${encodeURIComponent(q)}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      setClients(data.clients || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchClients(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const openAdd = () => {
    setEditClient(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c: Client) => {
    setEditClient(c);
    setForm({ name: c.name, phone: c.phone, email: c.email, company: c.company, notes: c.notes, status: c.status });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditClient(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Введите имя клиента");
      return;
    }
    setSaving(true);
    try {
      const url = editClient ? `${API_URL}/${editClient.id}` : API_URL;
      const method = editClient ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editClient ? "Клиент обновлён" : "Клиент добавлен");
      closeForm();
      fetchClients(search);
    } catch {
      toast.error("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Клиент удалён");
      setDeleteId(null);
      fetchClients(search);
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  const statusLabel: Record<string, { label: string; color: string }> = {
    active: { label: "Активен", color: "bg-green-100 text-green-700" },
    inactive: { label: "Неактивен", color: "bg-gray-100 text-gray-500" },
    vip: { label: "VIP", color: "bg-yellow-100 text-yellow-700" },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display uppercase tracking-wide text-foreground">CRM</h1>
            <p className="text-muted-foreground mt-1 text-sm">Управление клиентами и контактами</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[hsl(var(--gold))] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition"
          >
            <Icon name="Plus" size={16} />
            Добавить клиента
          </button>
        </div>

        <div className="relative mb-6">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по имени, телефону, email, компании..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded bg-card text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground text-sm">Загрузка...</div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <Icon name="Users" size={48} className="mb-4 opacity-30" />
            <p className="text-sm">{search ? "Ничего не найдено" : "Клиентов пока нет"}</p>
            {!search && (
              <button onClick={openAdd} className="mt-4 text-[hsl(var(--gold))] text-sm underline underline-offset-2">
                Добавить первого клиента
              </button>
            )}
          </div>
        ) : (
          <div className="bg-card border border-border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Имя</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Компания</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Телефон</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Статус</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr key={c.id} className={`border-b border-border last:border-0 hover:bg-muted/20 transition ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{c.name}</div>
                      {c.notes && <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">{c.notes}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.company || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.phone || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{c.email || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusLabel[c.status]?.color || "bg-gray-100 text-gray-500"}`}>
                        {statusLabel[c.status]?.label || c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(c)} className="text-muted-foreground hover:text-foreground transition">
                          <Icon name="Pencil" size={15} />
                        </button>
                        <button onClick={() => setDeleteId(c.id)} className="text-muted-foreground hover:text-red-500 transition">
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
              Всего: {clients.length} клиент{clients.length === 1 ? "" : clients.length < 5 ? "а" : "ов"}
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={closeForm}>
          <div className="bg-card border border-border rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-display text-lg uppercase tracking-wide">{editClient ? "Редактировать" : "Новый клиент"}</h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Имя *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background"
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Телефон</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background"
                    placeholder="+7 900 000 00 00"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background"
                    placeholder="ivan@mail.ru"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Компания</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background"
                  placeholder="ООО Название"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Статус</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Заметки</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background resize-none"
                  placeholder="Любые заметки по клиенту..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button onClick={closeForm} className="px-4 py-2 text-sm border border-border rounded hover:bg-muted/40 transition">
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-[hsl(var(--gold))] text-white rounded hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Сохранение..." : editClient ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setDeleteId(null)}>
          <div className="bg-card border border-border rounded-lg w-full max-w-sm shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg uppercase mb-2">Удалить клиента?</h3>
            <p className="text-sm text-muted-foreground mb-5">Это действие нельзя отменить.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border border-border rounded hover:bg-muted/40 transition">
                Отмена
              </button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
