import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/1e2f5230-ad0c-4c1d-bd1a-b078b34dc33d";
const UPLOAD_URL = "https://functions.poehali.dev/48ee7e45-2c83-4b5f-a8bb-294219db08cf";

interface FileItem {
  url: string;
  name: string;
}

interface Client {
  id: number;
  full_name: string;
  phone: string;
  company: string;
  age: number | null;
  conviction: string;
  chronic_diseases: string;
  dispensary_record: string;
  notes: string;
  status: string;
  docs_photos: FileItem[];
  relations_files: FileItem[];
  tickets_files: FileItem[];
  contract_files: FileItem[];
  created_at: string;
}

const emptyForm = {
  full_name: "",
  phone: "",
  company: "",
  age: "",
  conviction: "",
  chronic_diseases: "",
  dispensary_record: "",
  notes: "",
  status: "active",
  docs_photos: [] as FileItem[],
  relations_files: [] as FileItem[],
  tickets_files: [] as FileItem[],
  contract_files: [] as FileItem[],
};

type FormState = typeof emptyForm;

function FileUploader({
  label,
  files,
  onChange,
  accept = "image/*,.pdf",
}: {
  label: string;
  files: FileItem[];
  onChange: (files: FileItem[]) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    const newFiles: FileItem[] = [];
    for (const file of Array.from(fileList)) {
      try {
        const base64 = await toBase64(file);
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64, name: file.name, content_type: file.type }),
        });
        const data = await res.json();
        if (data.url) newFiles.push({ url: data.url, name: file.name });
      } catch {
        toast.error(`Ошибка загрузки ${file.name}`);
      }
    }
    onChange([...files, ...newFiles]);
    setUploading(false);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const remove = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  const isPdf = (name: string) => name.toLowerCase().endsWith(".pdf");

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {files.map((f, i) => (
          <div key={i} className="relative group">
            {isPdf(f.name) ? (
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-muted border border-border rounded px-2.5 py-1.5 text-xs hover:bg-muted/80 transition"
              >
                <Icon name="FileText" size={14} />
                <span className="max-w-[100px] truncate">{f.name}</span>
              </a>
            ) : (
              <a href={f.url} target="_blank" rel="noopener noreferrer">
                <img src={f.url} alt={f.name} className="w-16 h-16 object-cover rounded border border-border" />
              </a>
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <Icon name="X" size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-16 h-16 border-2 border-dashed border-border rounded flex flex-col items-center justify-center text-muted-foreground hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition disabled:opacity-50"
        >
          {uploading ? <Icon name="Loader" size={16} className="animate-spin" /> : <Icon name="Plus" size={16} />}
        </button>
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}

export default function Crm() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewClient, setViewClient] = useState<Client | null>(null);

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

  useEffect(() => { fetchClients(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchClients(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const openAdd = () => {
    setEditClient(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c: Client) => {
    setEditClient(c);
    setForm({
      full_name: c.full_name || "",
      phone: c.phone || "",
      company: c.company || "",
      age: c.age != null ? String(c.age) : "",
      conviction: c.conviction || "",
      chronic_diseases: c.chronic_diseases || "",
      dispensary_record: c.dispensary_record || "",
      notes: c.notes || "",
      status: c.status || "active",
      docs_photos: c.docs_photos || [],
      relations_files: c.relations_files || [],
      tickets_files: c.tickets_files || [],
      contract_files: c.contract_files || [],
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditClient(null); };

  const handleSave = async () => {
    if (!form.full_name.trim()) { toast.error("Введите ФИО"); return; }
    setSaving(true);
    try {
      const url = editClient ? `${API_URL}/${editClient.id}` : API_URL;
      const method = editClient ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: form.age ? parseInt(form.age) : null }),
      });
      if (!res.ok) throw new Error();
      toast.success(editClient ? "Сохранено" : "Клиент добавлен");
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
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      toast.success("Удалено");
      setDeleteId(null);
      setViewClient(null);
      fetchClients(search);
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  const isPdf = (name: string) => name.toLowerCase().endsWith(".pdf");

  const FilesPreview = ({ files, label }: { files: FileItem[]; label: string }) => {
    if (!files || files.length === 0) return null;
    return (
      <div>
        <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
        <div className="flex flex-wrap gap-2">
          {files.map((f, i) =>
            isPdf(f.name) ? (
              <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-muted border border-border rounded px-2 py-1 text-xs hover:underline">
                <Icon name="FileText" size={13} />{f.name}
              </a>
            ) : (
              <a key={i} href={f.url} target="_blank" rel="noopener noreferrer">
                <img src={f.url} alt={f.name} className="w-14 h-14 object-cover rounded border border-border hover:opacity-80 transition" />
              </a>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display uppercase tracking-wide">CRM</h1>
            <p className="text-muted-foreground mt-1 text-sm">База клиентов и контактов</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-[hsl(var(--gold))] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition">
            <Icon name="Plus" size={16} />Добавить
          </button>
        </div>

        <div className="relative mb-6">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Поиск по ФИО, телефону, компании..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded bg-card text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))]" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground text-sm">Загрузка...</div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <Icon name="Users" size={48} className="mb-4 opacity-30" />
            <p className="text-sm">{search ? "Ничего не найдено" : "Клиентов пока нет"}</p>
            {!search && <button onClick={openAdd} className="mt-4 text-[hsl(var(--gold))] text-sm underline underline-offset-2">Добавить первого</button>}
          </div>
        ) : (
          <div className="bg-card border border-border rounded overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ФИО</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Лет</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Судимость</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Хр. заболевания</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Учёт</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">Файлы</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => {
                  const totalFiles = (c.docs_photos?.length || 0) + (c.relations_files?.length || 0) +
                    (c.tickets_files?.length || 0) + (c.contract_files?.length || 0);
                  return (
                    <tr key={c.id}
                      className={`border-b border-border last:border-0 hover:bg-muted/20 transition cursor-pointer ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                      onClick={() => setViewClient(c)}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{c.full_name || c.company || "—"}</div>
                        {c.phone && <div className="text-xs text-muted-foreground">{c.phone}</div>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.age ?? "—"}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {c.conviction ? (
                          <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs">{c.conviction}</span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell max-w-[150px] truncate">
                        {c.chronic_diseases || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell max-w-[150px] truncate">
                        {c.dispensary_record || "—"}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        {totalFiles > 0 ? (
                          <span className="flex items-center gap-1 text-xs text-[hsl(var(--gold))]">
                            <Icon name="Paperclip" size={13} />{totalFiles}
                          </span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
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
                  );
                })}
              </tbody>
            </table>
            <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
              Всего: {clients.length}
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewClient(null)}>
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
              <h2 className="font-display text-lg uppercase tracking-wide truncate">{viewClient.full_name}</h2>
              <div className="flex gap-2 ml-2 shrink-0">
                <button onClick={() => { setViewClient(null); openEdit(viewClient); }}
                  className="text-muted-foreground hover:text-foreground transition"><Icon name="Pencil" size={16} /></button>
                <button onClick={() => setViewClient(null)} className="text-muted-foreground hover:text-foreground transition">
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Телефон" value={viewClient.phone} />
                <InfoRow label="Возраст" value={viewClient.age != null ? `${viewClient.age} лет` : null} />
                <InfoRow label="Компания" value={viewClient.company} />
              </div>
              <InfoRow label="Судимость / статья" value={viewClient.conviction} />
              <InfoRow label="Хронические заболевания" value={viewClient.chronic_diseases} />
              <InfoRow label="Учёт в ПНД и НД" value={viewClient.dispensary_record} />
              <InfoRow label="Заметки" value={viewClient.notes} />
              <FilesPreview files={viewClient.docs_photos} label="Фото документов" />
              <FilesPreview files={viewClient.relations_files} label="Фото отношений" />
              <FilesPreview files={viewClient.tickets_files} label="Билеты" />
              <FilesPreview files={viewClient.contract_files} label="Фото контракта" />
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeForm}>
          <div className="bg-card border border-border rounded-lg w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
              <h2 className="font-display text-lg uppercase tracking-wide">{editClient ? "Редактировать" : "Новый клиент"}</h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <Field label="ФИО *">
                <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className={inputCls} placeholder="Иванов Иван Иванович" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Телефон">
                  <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputCls} placeholder="+7 900 000 00 00" />
                </Field>
                <Field label="Полных лет">
                  <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={inputCls} placeholder="30" min={0} max={120} />
                </Field>
              </div>
              <Field label="Судимость / статья">
                <input type="text" value={form.conviction} onChange={(e) => setForm({ ...form, conviction: e.target.value })}
                  className={inputCls} placeholder="Нет / ст. 158 УК РФ" />
              </Field>
              <Field label="Хронические заболевания">
                <textarea value={form.chronic_diseases} onChange={(e) => setForm({ ...form, chronic_diseases: e.target.value })}
                  className={inputCls + " resize-none"} rows={2} placeholder="Нет / перечислить" />
              </Field>
              <Field label="Учёт в ПНД и НД">
                <textarea value={form.dispensary_record} onChange={(e) => setForm({ ...form, dispensary_record: e.target.value })}
                  className={inputCls + " resize-none"} rows={2} placeholder="Нет / состоит (указать)" />
              </Field>
              <Field label="Заметки">
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className={inputCls + " resize-none"} rows={2} placeholder="Дополнительная информация" />
              </Field>
              <hr className="border-border" />
              <FileUploader label="Фото документов" files={form.docs_photos} accept="image/*"
                onChange={(f) => setForm({ ...form, docs_photos: f })} />
              <FileUploader label="Фото отношений (фото или PDF)" files={form.relations_files}
                onChange={(f) => setForm({ ...form, relations_files: f })} />
              <FileUploader label="Билеты (фото или PDF)" files={form.tickets_files}
                onChange={(f) => setForm({ ...form, tickets_files: f })} />
              <FileUploader label="Фото контракта (фото или PDF)" files={form.contract_files}
                onChange={(f) => setForm({ ...form, contract_files: f })} />
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border sticky bottom-0 bg-card">
              <button onClick={closeForm} className="px-4 py-2 text-sm border border-border rounded hover:bg-muted/40 transition">
                Отмена
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-4 py-2 text-sm bg-[hsl(var(--gold))] text-white rounded hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Сохранение..." : editClient ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDeleteId(null)}>
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

const inputCls = "w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] bg-background";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground mb-0.5">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}
