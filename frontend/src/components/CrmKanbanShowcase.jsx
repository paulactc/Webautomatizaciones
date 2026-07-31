import { CheckCircle2, Clock, MessageCircle, Users, LayoutDashboard } from "lucide-react";
import { cn } from "../lib/utils";

const COLUMNS = [
  {
    id: "citas",
    title: "Citas agendadas",
    icon: CheckCircle2,
    grad: "from-emerald-500 to-emerald-600",
    body: "bg-emerald-50/70",
    bar: "border-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    iconColor: "text-emerald-500",
    count: 3,
    cards: [
      { pet: "Luka", service: "Vacunación", meta: "Lun 12 · 17:00", note: "Confirmada por WhatsApp", done: true },
      { pet: "Rocky", service: "Revisión", meta: "Mar 13 · 11:00", note: "Confirmada por WhatsApp", done: true },
      { pet: "Nala", service: "Urgencia", meta: "Jue 6 · 17:00", note: "Recordatorio enviado", done: true },
    ],
  },
  {
    id: "consultas",
    title: "Consultas tramitadas",
    icon: MessageCircle,
    grad: "from-violet-500 to-violet-600",
    body: "bg-violet-50/70",
    bar: "border-violet-500",
    pill: "bg-violet-100 text-violet-700",
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
    title: "Equipo humano",
    icon: Users,
    grad: "from-amber-500 to-orange-500",
    body: "bg-amber-50/70",
    bar: "border-amber-500",
    pill: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-500",
    count: 2,
    cards: [
      { pet: "Carmen", service: "Factura a empresa", meta: "Requiere tu revisión", note: "Aprobación necesaria", done: false },
      { pet: "Adrián", service: "Descuento cliente fiel", meta: "Requiere tu revisión", note: "Decide tú y la IA aplica", done: false },
    ],
  },
];

export default function CrmKanbanShowcase() {
  return (
    <div className="crm-kanban">
      <div className="bg-white px-3.5 py-3 flex items-center justify-between gap-3 border-b border-gray-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0">
            <LayoutDashboard size={17} strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <div className="text-gray-900 font-extrabold text-sm leading-tight">Gestiones del agente</div>
            <div className="text-gray-500 text-[11px]">La IA resuelve lo que puede y te deja lo que necesita tu criterio</div>
          </div>
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full shrink-0 hidden sm:inline">
          IA + equipo
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 bg-gray-100/70">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex flex-col">
            <div className={cn("rounded-t-md bg-gradient-to-r px-3 py-2.5 flex items-center gap-2 text-white shadow-sm", col.grad)}>
              <col.icon size={15} strokeWidth={2.5} className="shrink-0" />
              <span className="font-extrabold text-[12px] uppercase tracking-wider leading-tight">{col.title}</span>
              <span className="ml-auto min-w-[20px] h-[18px] px-1.5 rounded-full bg-white text-gray-900 flex items-center justify-center text-[11px] font-extrabold shrink-0 shadow-sm">
                {col.count}
              </span>
            </div>

            <div className={cn("rounded-b-md flex-1 p-2 flex flex-col gap-1.5", col.body)}>
              {col.cards.map((card) => (
                <div
                  key={card.pet + card.service}
                  className={cn(
                    "bg-white rounded-md border border-gray-200 border-l-4 px-3 py-2.5 shadow-sm",
                    col.bar
                  )}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-[13px] leading-tight">{card.pet}</span>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0", col.pill)}>
                      {card.service}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1">
                    <Clock size={11} className="shrink-0" />
                    <span>{card.meta}</span>
                  </div>
                  <div className={cn("flex items-center gap-1 text-[11px] mt-1.5 font-medium", card.done ? "text-gray-600" : "text-amber-600")}>
                    {card.done ? <CheckCircle2 size={12} className={cn("shrink-0", col.iconColor)} /> : <Users size={12} className="shrink-0" />}
                    <span>{card.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-3.5 py-2.5 border-t border-gray-200 bg-white text-center text-[11px] font-semibold text-gray-500">
        Tú decides qué tramita la IA y qué requiere tu equipo humano
      </div>
    </div>
  );
}
