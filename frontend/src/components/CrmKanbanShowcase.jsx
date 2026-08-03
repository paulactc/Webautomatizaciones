import { Phone, Calendar, Users, Sun, LayoutDashboard } from "lucide-react";
import { cn } from "../lib/utils";

const hoy = new Date().toISOString().split("T")[0];

const columnColors = {
  informados: { top: "border-t-blue-500", count: "bg-blue-500", tint: "bg-blue-50", text: "text-blue-700" },
  programados: { top: "border-t-amber-500", count: "bg-amber-500", tint: "bg-amber-50", text: "text-amber-700" },
  ia_respondidas: { top: "border-t-violet-500", count: "bg-violet-500", tint: "bg-violet-50", text: "text-violet-700" },
  equipo_humano: { top: "border-t-orange-500", count: "bg-orange-500", tint: "bg-orange-50", text: "text-orange-700" },
};

const statusLabels = {
  informados: "Huéspedes informados",
  programados: "Programados para informar",
  ia_respondidas: "Respondidas automáticamente",
  equipo_humano: "Pendientes equipo humano",
};

function calcDias(checkIn, checkOut) {
  if (!checkIn || !checkOut) return null;
  const inicio = new Date(checkIn);
  const fin = new Date(checkOut);
  return Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24));
}

function formatFecha(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function toISO(diaOffset) {
  const dt = new Date();
  dt.setDate(dt.getDate() + diaOffset);
  return dt.toISOString().split("T")[0];
}

const CONTACTS = [
  {
    id: "ct1",
    name: "Carlos Demo Uno",
    phone: "600 000 011",
    status: "programados",
    checkIn: toISO(-2),
    checkOut: toISO(3),
    adultos: 2,
    ninos: 2,
  },
  {
    id: "ct2",
    name: "María Demo Dos",
    phone: "600 000 012",
    status: "programados",
    checkIn: toISO(5),
    checkOut: toISO(10),
    adultos: 2,
    ninos: 0,
  },
  {
    id: "ct3",
    name: "Juan Demo Tres",
    phone: "600 000 013",
    status: "ia_respondidas",
    checkIn: toISO(15),
    checkOut: toISO(20),
    adultos: 4,
    ninos: 3,
  },
  {
    id: "ct4",
    name: "Ana Demo Cuatro",
    phone: "600 000 014",
    status: "informados",
    checkIn: toISO(8),
    checkOut: toISO(12),
    adultos: 2,
    ninos: 1,
  },
  {
    id: "ct5",
    name: "Roberto Demo Cinco",
    phone: "600 000 015",
    status: "equipo_humano",
    checkIn: toISO(0),
    checkOut: toISO(7),
    adultos: 2,
    ninos: 0,
  },
  {
    id: "ct6",
    name: "Laura Demo Seis",
    phone: "600 000 016",
    status: "programados",
    checkIn: toISO(3),
    checkOut: toISO(10),
    adultos: 5,
    ninos: 3,
  },
  {
    id: "ct7",
    name: "Diego Demo Siete",
    phone: "600 000 017",
    status: "ia_respondidas",
    checkIn: toISO(12),
    checkOut: toISO(15),
    adultos: 2,
    ninos: 2,
  },
  {
    id: "ct8",
    name: "Sofía Demo Ocho",
    phone: "600 000 018",
    status: "informados",
    checkIn: toISO(20),
    checkOut: toISO(24),
    adultos: 2,
    ninos: 0,
  },
  {
    id: "ct9",
    name: "Pedro Demo Nueve",
    phone: "600 000 019",
    status: "equipo_humano",
    checkIn: toISO(1),
    checkOut: toISO(5),
    adultos: 6,
    ninos: 0,
  },
  {
    id: "ct10",
    name: "Valentina Demo Diez",
    phone: "600 000 020",
    status: "programados",
    checkIn: toISO(-1),
    checkOut: toISO(4),
    adultos: 2,
    ninos: 2,
  },
];

const STATUSES = ["informados", "programados", "ia_respondidas", "equipo_humano"];

function KanbanCard({ contact }) {
  const activa = contact.checkIn <= hoy && contact.checkOut >= hoy;
  const totalPersonas = (contact.adultos || 0) + (contact.ninos || 0);
  const dias = calcDias(contact.checkIn, contact.checkOut);
  const colors = columnColors[contact.status] || columnColors.informados;

  return (
    <div className={cn("bg-white border border-slate-200 border-l-4 rounded-[12px] shadow-sm overflow-hidden", colors.top)}>
      <div className={cn("flex items-center px-3 py-2 border-b border-slate-200", colors.tint)}>
        <span className="text-[0.85rem] font-bold text-slate-900 truncate">{contact.name}</span>
      </div>

      <div className="px-3 py-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <Phone size={14} className="text-slate-400 shrink-0" />
          <span>{contact.phone}</span>
        </div>

        {contact.checkIn && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            <span>{formatFecha(contact.checkIn)} → {formatFecha(contact.checkOut)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-slate-100 text-sm">
        <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
          <Users size={14} className="text-slate-400 shrink-0" />
          <span>{totalPersonas} pers.</span>
          <span className="text-slate-400">({contact.adultos || 0}a {contact.ninos || 0}n)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {activa && (
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
              Activa
            </span>
          )}
          {dias !== null && (
            <div className="flex items-center gap-1 text-blue-700 font-semibold">
              <Sun size={14} />
              <span>{dias} {dias === 1 ? "día" : "días"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ status, contacts }) {
  const colors = columnColors[status];

  return (
    <div className={cn("flex flex-col flex-1 min-w-[280px] max-w-[340px] bg-slate-50 border border-slate-200 rounded-[10px] overflow-hidden")}>
      <div className={cn("flex items-center justify-between gap-2 px-4 py-3 bg-white border-b border-slate-200 border-t-4", colors.top)}>
        <h3 className="text-[0.82rem] font-extrabold uppercase tracking-[0.04em] text-slate-900 whitespace-nowrap">
          {statusLabels[status]}
        </h3>
        <span className={cn("text-base font-black text-white px-2.5 py-0.5 rounded-full min-w-[28px] text-center leading-6", colors.count)}>
          {contacts.length}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-2 gap-2 overflow-y-auto">
        {contacts.map((contact) => (
          <KanbanCard key={contact.id} contact={contact} />
        ))}
        {contacts.length === 0 && (
          <div className="text-center text-slate-300 text-xs italic py-6">Sin huéspedes</div>
        )}
      </div>
    </div>
  );
}

export default function CrmKanbanShowcase() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <LayoutDashboard size={18} strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <div className="text-base font-semibold text-slate-900 leading-tight">Gestiones del agente</div>
            <div className="text-xs text-slate-500 leading-snug">La IA resuelve lo que puede y te deja lo que necesita tu criterio</div>
          </div>
        </div>
        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded shrink-0 hidden sm:inline">
          IA + equipo
        </span>
      </div>

      <div className="flex items-start gap-2.5 p-4 overflow-x-auto bg-slate-50">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            contacts={CONTACTS.filter((c) => c.status === status)}
          />
        ))}
      </div>
    </div>
  );
}
