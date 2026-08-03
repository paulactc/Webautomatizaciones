import { CheckCircle2, Calendar, Users, LayoutDashboard } from "lucide-react";
import { cn } from "../lib/utils";

const COLUMNS = [
  {
    id: "citas",
    title: "CITAS AGENDADAS",
    border: "border-t-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    iconColor: "text-blue-500",
    count: 3,
    cards: [
      { pet: "Luka", service: "Vacunación", meta: "Lun 12 · 17:00", note: "Confirmada por WhatsApp", done: true },
      { pet: "Rocky", service: "Revisión", meta: "Mar 13 · 11:00", note: "Confirmada por WhatsApp", done: true },
      { pet: "Nala", service: "Urgencia", meta: "Jue 6 · 17:00", note: "Recordatorio enviado", done: true },
    ],
  },
  {
    id: "consultas",
    title: "CONSULTAS TRAMITADAS",
    border: "border-t-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    iconColor: "text-violet-500",
    count: 3,
    cards: [
      { pet: "Marta", service: "Cambio de cita", meta: "Luka → lunes 12", note: "Reagendada automáticamente", done: true },
      { pet: "Javi", service: "Presupuesto", meta: "WhatsApp", note: "Presupuesto y enlace de pago enviados", done: true },
      { pet: "Lucía", service: "Horario", meta: "Fin de semana", note: "Horario de sábado respondido", done: true },
    ],
  },
  {
    id: "equipo",
    title: "EQUIPO HUMANO",
    border: "border-t-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
    iconColor: "text-orange-500",
    count: 2,
    cards: [
      { pet: "Carmen", service: "Factura a empresa", meta: "Requiere tu revisión", note: "Aprobación necesaria", done: false },
      { pet: "Adrián", service: "Descuento cliente fiel", meta: "Requiere tu revisión", note: "Decide tú y la IA aplica", done: false },
    ],
  },
];

export default function CrmKanbanShowcase() {
  return (
    <div className="crm-kanban bg-white">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50">
        {COLUMNS.map((col) => (
          <div key={col.id} className={cn("flex flex-col min-w-0 bg-slate-100/70 rounded-md border-t-4", col.border)}>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <span className={cn("w-3 h-3 rounded-full shrink-0", col.dot)} />
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{col.title}</h4>
              </div>
              <span className={cn("text-sm font-bold px-2 py-0.5 rounded-full shrink-0", col.bg, col.text)}>
                {col.count}
              </span>
            </div>

            <div className="flex-1 px-3 pb-3 space-y-2">
              {col.cards.map((card) => (
                <div key={card.pet + card.service} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-slate-900 truncate">{card.pet}</span>
                    <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded shrink-0", col.bg, col.text)}>
                      {card.service}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700 mb-1.5">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{card.meta}</span>
                  </div>
                  <div className={cn("flex items-center gap-1.5 pt-1.5 border-t border-slate-100 text-sm", card.done ? "text-slate-600" : "text-orange-600 font-medium")}>
                    {card.done ? (
                      <CheckCircle2 size={14} className={cn("shrink-0", col.iconColor)} />
                    ) : (
                      <Users size={14} className="shrink-0 text-orange-500" />
                    )}
                    <span className="truncate">{card.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-slate-200 bg-white text-center text-xs font-medium text-slate-500">
        Tú decides qué tramita la IA y qué requiere tu equipo humano
      </div>
    </div>
  );
}
