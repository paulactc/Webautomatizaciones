import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const SERVICIOS = {
  s1: { name: "Vacunación", abbr: "Vac", dot: "bg-blue-500", bar: "border-l-blue-400", label: "text-blue-700", bg: "bg-blue-50" },
  s2: { name: "Desparasitación", abbr: "Des", dot: "bg-emerald-500", bar: "border-l-emerald-400", label: "text-emerald-700", bg: "bg-emerald-50" },
  s3: { name: "Revisión", abbr: "Rev", dot: "bg-amber-500", bar: "border-l-amber-400", label: "text-amber-700", bg: "bg-amber-50" },
  s4: { name: "Urgencia", abbr: "Urg", dot: "bg-rose-500", bar: "border-l-rose-400", label: "text-rose-700", bg: "bg-rose-50" },
  s5: { name: "Cirugía", abbr: "Cir", dot: "bg-violet-500", bar: "border-l-violet-400", label: "text-violet-700", bg: "bg-violet-50" },
  s6: { name: "Peluquería", abbr: "Pel", dot: "bg-cyan-500", bar: "border-l-cyan-400", label: "text-cyan-700", bg: "bg-cyan-50" },
  s7: { name: "Análisis", abbr: "Aná", dot: "bg-orange-500", bar: "border-l-orange-400", label: "text-orange-700", bg: "bg-orange-50" },
};

const DEFAULT_STYLE = { abbr: "?", dot: "bg-gray-400", bar: "border-l-gray-400", label: "text-gray-700", bg: "bg-gray-50" };

const TARGET_DAY = 6;

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, currentMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, currentMonth: true });
  }
  while (cells.length < 42) {
    cells.push({ day: cells.length - daysInMonth - startDay + 1, currentMonth: false });
  }
  return cells;
}

function formatDay(date) {
  return new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

export default function CalendarShowcase() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const [events, setEvents] = useState([]);
  const [targetDate, setTargetDate] = useState(null);
  const [clipStart, setClipStart] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | day
  const [visible, setVisible] = useState(false);
  const [loop, setLoop] = useState(0);

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const cellRefs = useRef({});

  useEffect(() => {
    const base = new Date(year, month, TARGET_DAY);
    setTargetDate(base);
    const evs = [
      { day: TARGET_DAY, time: "09:00", pet: "Luka", owner: "Marta García", servicioId: "s1", phone: "612 34 56 78", motivo: "Vacuna anual" },
      { day: TARGET_DAY, time: "11:30", pet: "Rocky", owner: "Javi Mora", servicioId: "s3", phone: "611 22 33 44", motivo: "Revisión general" },
      { day: TARGET_DAY, time: "17:00", pet: "Nala", owner: "Lucía Vidal", servicioId: "s4", phone: "677 88 99 00", motivo: "Urgencia" },
      { day: 12, time: "10:00", pet: "Kira", owner: "Sofía Ruiz", servicioId: "s2", phone: "644 55 66 77", motivo: "Desparasitación" },
      { day: 12, time: "18:30", pet: "Toby", owner: "Raúl Pérez", servicioId: "s6", phone: "633 44 55 66", motivo: "Corte de pelo" },
      { day: 21, time: "12:00", pet: "Mia", owner: "Carmen Soto", servicioId: "s5", phone: "622 33 44 55", motivo: "Cirugía programada" },
      { day: 26, time: "16:00", pet: "Bruno", owner: "Adrián Gil", servicioId: "s2", phone: "699 88 77 66", motivo: "Pipeta y chip" },
    ];
    setEvents(evs.map((ev) => ({ ...ev, date: new Date(year, month, ev.day) })));
  }, [year, month]);

  useEffect(() => {
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setPhase("idle");
    setClipStart(null);

    const timers = [];

    const zoomIn = () => {
      const frame = frameRef.current;
      const cell = cellRefs.current[TARGET_DAY];
      if (!frame || !cell) return;
      const fr = frame.getBoundingClientRect();
      const cr = cell.getBoundingClientRect();
      const inset = [
        ((cr.top - fr.top) / fr.height) * 100,
        ((fr.right - cr.right) / fr.width) * 100,
        ((fr.bottom - cr.bottom) / fr.height) * 100,
        ((cr.left - fr.left) / fr.width) * 100,
      ];
      setClipStart(`inset(${inset[0]}% ${inset[1]}% ${inset[2]}% ${inset[3]}%)`);
      setPhase("day");
    };

    timers.push(setTimeout(zoomIn, 2200));
    timers.push(setTimeout(() => setPhase("idle"), 6000));
    timers.push(setTimeout(() => setLoop((l) => l + 1), 8000));

    return () => timers.forEach(clearTimeout);
  }, [visible, loop]);

  const cells = getMonthGrid(year, month);
  const eventsByDay = {};
  events.forEach((ev) => {
    if (!eventsByDay[ev.day]) eventsByDay[ev.day] = [];
    eventsByDay[ev.day].push(ev);
  });

  const today = new Date();
  const monthLabel = new Intl.DateTimeFormat("es", { month: "long", year: "numeric" }).format(now);
  const dayEvents = events.filter((ev) => ev.day === TARGET_DAY);
  const weekend = (day) => {
    const d = new Date(year, month, day).getDay();
    return d === 0 || d === 6;
  };

  return (
    <div className="calshow" ref={sectionRef}>
      <div className="calshow__frame" ref={frameRef}>
        <motion.div
          animate={{ opacity: phase === "day" ? 0.35 : 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col text-[13px] bg-white"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 text-white flex items-center justify-center text-sm font-bold">
                {year % 100}
              </span>
              <div>
                <div className="font-bold text-gray-800 capitalize leading-tight">{monthLabel}</div>
                <div className="text-xs text-gray-500">Agenda de citas</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full">
              IA sincronizada
            </span>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-200">
            {WEEKDAYS.map((d, i) => (
              <div
                key={d}
                className={cn(
                  "px-1 md:px-2 py-1.5 md:py-2 text-center font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-b border-b-2 border-transparent text-[10px] md:text-[13px]",
                  ["from-blue-500/10 to-blue-500/5", "from-emerald-500/10 to-emerald-500/5", "from-amber-500/10 to-amber-500/5", "from-violet-500/10 to-violet-500/5", "from-rose-500/10 to-rose-500/5", "from-cyan-500/15 to-cyan-500/5", "from-orange-500/15 to-orange-500/5"][i]
                )}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-fr">
            {cells.map((cell, i) => {
              const dayEventsHere = eventsByDay[cell.day] || [];
              const isToday = cell.currentMonth && cell.day === today.getDate();
              const isTarget = cell.currentMonth && cell.day === TARGET_DAY;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el && cell.currentMonth) cellRefs.current[cell.day] = el;
                  }}
                  className={cn(
                    "border-b border-r border-gray-200 p-1 flex flex-col min-h-[46px] md:min-h-[108px] cursor-default transition-colors",
                    isTarget && "ring-2 ring-violet-400 ring-inset z-10"
                  )}
                >
                  <div className="flex items-center justify-center mb-1 shrink-0">
                    <span
                      className={cn(
                        "font-bold inline-flex items-center justify-center w-6 h-6 text-xs shrink-0",
                        isToday && "bg-violet-600 text-white rounded-full",
                        !isToday && cell.currentMonth && "text-gray-800",
                        !cell.currentMonth && "text-gray-300"
                      )}
                    >
                      {cell.day}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1 hidden md:block">
                    {dayEventsHere.length === 1 ? (() => {
                      const ev = dayEventsHere[0];
                      const st = SERVICIOS[ev.servicioId] || DEFAULT_STYLE;
                      return (
                        <div className={cn("px-1.5 py-1 border-l-[4px] leading-snug border", st.bar, st.bg)}>
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-gray-800 text-[11px]">{ev.pet}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className={cn("font-bold text-[10px]", st.label)}>{st.abbr}</span>
                              <span className="text-gray-400 text-[10px]">{ev.time}</span>
                            </div>
                          </div>
                          <div className="text-gray-500 text-[10px] mt-0.5">{ev.owner}</div>
                          <div className="flex flex-wrap items-center gap-x-1 text-gray-400 text-[10px]">
                            <span className="shrink-0">📞 {ev.phone}</span>
                            <span>{ev.motivo}</span>
                          </div>
                        </div>
                      );
                    })() : (
                      dayEventsHere.slice(0, 2).map((ev) => {
                        const st = SERVICIOS[ev.servicioId] || DEFAULT_STYLE;
                        return (
                          <div key={`${ev.day}-${ev.time}`} className={cn("px-1.5 py-1 border-l-[3px] leading-tight border-b", st.bar, st.bg)}>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-semibold text-gray-800 text-[11px]">{ev.pet}</span>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className={cn("font-bold text-[10px]", st.label)}>{st.abbr}</span>
                                <span className="text-gray-400 text-[10px]">{ev.time}</span>
                              </div>
                            </div>
                            <div className="text-gray-400 text-[10px]">{ev.owner}</div>
                          </div>
                        );
                      })
                    )}
                    {dayEventsHere.length > 2 && (
                      <div className="text-violet-500 font-semibold text-center text-[10px]">
                        +{dayEventsHere.length - 2} más
                      </div>
                    )}
                  </div>
                  {dayEventsHere.length > 0 && (
                    <div className="md:hidden flex flex-wrap justify-center gap-1 mt-auto pb-0.5">
                      {dayEventsHere.slice(0, 3).map((ev) => {
                        const st = SERVICIOS[ev.servicioId] || DEFAULT_STYLE;
                        return <span key={`${ev.day}-${ev.time}`} className={cn("w-1.5 h-1.5 rounded-full", st.dot)} />;
                      })}
                      {dayEventsHere.length > 3 && (
                        <span className="text-[8px] text-violet-500 font-bold leading-none">+{dayEventsHere.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-t border-gray-200 bg-gray-50/60">
            {Object.values(SERVICIOS).map((s) => (
              <span key={s.abbr} className="flex items-center gap-1.5 font-medium text-gray-500 text-[11px]">
                <span className={cn("w-2.5 h-2.5 rounded-full", s.dot)} />
                {s.name}
              </span>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {phase === "day" && clipStart && (
            <motion.div
              key="day-zoom"
              className="calshow__day"
              initial={{ clipPath: clipStart, opacity: 0.8 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              exit={{ clipPath: clipStart, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="h-full bg-white flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <div>
                    <div className="text-lg font-extrabold text-gray-900 leading-none">
                      {TARGET_DAY} <span className="text-violet-600">·</span>{" "}
                      <span className="text-base font-bold text-gray-700 capitalize">{formatDay(targetDate).split(",")[0]}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">{monthLabel}</div>
                  </div>
                  <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full">
                    3 citas gestionadas
                  </span>
                </div>

                <div className="flex-1 overflow-hidden p-2 md:p-3 space-y-1.5 md:space-y-2 bg-violet-50/30">
                  {dayEvents.map((ev) => {
                    const st = SERVICIOS[ev.servicioId] || DEFAULT_STYLE;
                    return (
                      <div key={`${ev.pet}-${ev.time}`} className="bg-white rounded-lg border border-gray-200 shadow-sm px-2.5 md:px-3 py-2 md:py-2.5 flex items-center gap-2 md:gap-3">
                        <div className="text-center shrink-0 w-12 md:w-14">
                          <div className="font-bold text-violet-700 text-sm leading-tight">{ev.time}</div>
                          <div className="text-[10px] text-gray-400">hora</div>
                        </div>
                        <div className={cn("h-9 w-1.5 rounded-full shrink-0", st.dot)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm truncate">{ev.pet}</span>
                            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0", st.bg, st.label)}>{st.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{ev.owner} · 📞 {ev.phone}</div>
                        </div>
                        <span className="text-emerald-600 text-[10px] font-bold shrink-0 hidden sm:inline">✓ Confirmada</span>
                        <span className={cn("w-2 h-2 rounded-full shrink-0 sm:hidden", st.dot)} />
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 py-2.5 border-t border-gray-200 bg-white text-center text-xs font-semibold text-gray-600">
                  La IA reserva, recuerda y confirma las citas automáticamente
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="calshow__hint">
        Así se ve tu agenda desde fuera: <strong>entra, resuelve y cierra</strong> sin tocar el teléfono.
      </p>
    </div>
  );
}
