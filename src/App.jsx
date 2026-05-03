import React, { useState, useMemo, useEffect, useRef } from 'react';


/* ----------------------------- ICONS (inline SVG) ----------------------------- */
const I = {
  Menu:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Bell:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Home:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>,
  Path:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 6h10a4 4 0 1 1 0 8H10a4 4 0 1 0 0 8h10"/></svg>,
  Grid:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Chart:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="20" x2="21" y2="20"/><rect x="6" y="11" width="3" height="9"/><rect x="11" y="6" width="3" height="14"/><rect x="16" y="14" width="3" height="6"/></svg>,
  Award:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>,
  Users:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Book:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Help:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Cog:     (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Play:    (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><polygon points="6 4 20 12 6 20 6 4"/></svg>,
  Lock:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Check:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  Clock:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Flame:   (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 .8-2.7C9.5 8 10 7 10 6c2 1 2 4 2 4s0-3 0-8z"/><path d="M7 14a5 5 0 1 0 10 0c0-2-2-3-2-5-1 1-2 2-2 4 0 0-1-1-1-3-2 1-5 2-5 4z"/></svg>,
  Bolt:    (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ChevR:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 6 15 12 9 18"/></svg>,
  ChevL:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 6 9 12 15 18"/></svg>,
  ChevD:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  FileTxt: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
  Quiz:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/></svg>,
  Target:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Forum:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Live:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M5 12a7 7 0 0 1 14 0"/><path d="M2 12a10 10 0 0 1 20 0"/></svg>,
  Filter:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Sparkle: (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5L12 2z"/></svg>,
};

/* ----------------------------- DATA ----------------------------- */
const USER = { name: 'Camila Soto', role: 'Líder de equipo · Minería', initials: 'CS', xp: 1240, streak: 12, badges: 3, progress: 47 };

const ACTIVITY_TYPES = {
  pre:   { label: 'Pre-clase',     dot: 'bg-sky-500',     text: 'text-sky-700',    bg: 'bg-sky-50',    icon: I.Book },
  live:  { label: 'En vivo',       dot: 'bg-rose-500',    text: 'text-rose-700',   bg: 'bg-rose-50',   icon: I.Live },
  post:  { label: 'Post-clase',    dot: 'bg-emerald-500', text: 'text-emerald-700',bg: 'bg-emerald-50',icon: I.Target },
  trans: { label: 'Transferencia', dot: 'bg-gold-600',    text: 'text-gold-700',   bg: 'bg-gold-50',   icon: I.Sparkle },
};
const KOLB = {
  concrete:   { label: 'Concreto',   ring: 'ring-sky-300/70',     chip:'bg-sky-100 text-sky-800' },
  reflective: { label: 'Reflexivo',  ring: 'ring-violet-300/70',  chip:'bg-violet-100 text-violet-800' },
  conceptual: { label: 'Conceptual', ring: 'ring-amber-300/70',   chip:'bg-amber-100 text-amber-800' },
  applied:    { label: 'Aplicado',   ring: 'ring-emerald-300/70', chip:'bg-emerald-100 text-emerald-800' },
};
const LESSON_ICON = {
  video: I.Play, reading: I.FileTxt, quiz: I.Quiz, challenge: I.Target, forum: I.Forum, live: I.Live,
};

const ACTIVE_ROUTE = {
  title: 'Liderazgo Transformacional · 90 días',
  subtitle: 'Ruta integral · 6 módulos · 24 lecciones',
  progress: 47,
  nextLesson: 'M3 · Lección 4 — Conversaciones difíciles con propósito',
  nextDuration: '18 min',
  nextType: 'pre',
};

const CONTINUE_WATCHING = [
  { id:1, title:'Conversaciones difíciles con propósito', course:'Liderazgo Transformacional', module:'M3 · L4', pct:62, dur:'18:24', type:'video', tone:'navy' },
  { id:2, title:'Marco legal Ley Karin: alcance y deberes', course:'Ley Karin', module:'M1 · L2', pct:80, dur:'12:10', type:'reading', tone:'gold' },
  { id:3, title:'Mapa de riesgos psicosociales (DS44)', course:'DS44 Riesgos Psicosociales', module:'M2 · L3', pct:35, dur:'24:00', type:'video', tone:'slate' },
  { id:4, title:'Cultura de seguridad: del cumplimiento al compromiso', course:'Cultura de Seguridad', module:'M1 · L1', pct:18, dur:'15:40', type:'video', tone:'navy' },
  { id:5, title:'Escucha activa y feedback consciente', course:'Comunicación Consciente', module:'M2 · L1', pct:54, dur:'09:55', type:'video', tone:'gold' },
  { id:6, title:'Bienestar como estrategia organizacional', course:'Bienestar Organizacional', module:'M1 · L4', pct:22, dur:'21:30', type:'reading', tone:'slate' },
];

const TIMELINE = [
  { id:1, title:'Fundamentos del liderazgo con propósito', state:'done',   lessons:4, dur:'1h 40m' },
  { id:2, title:'Autoconocimiento y estilos de liderazgo',  state:'done',   lessons:4, dur:'2h 05m' },
  { id:3, title:'Conversaciones que transforman',           state:'active', lessons:5, dur:'2h 20m', activeLessonIdx:3 },
  { id:4, title:'Equipos de alto desempeño',                state:'locked', lessons:4, dur:'1h 50m' },
  { id:5, title:'Cultura, bienestar y resultados',          state:'locked', lessons:4, dur:'2h 10m' },
  { id:6, title:'Transferencia: tu plan de 90 días',        state:'locked', lessons:3, dur:'1h 20m' },
];

const MODULE_LESSONS = [
  { id:1, title:'Bienvenida al módulo y mapa de aprendizaje', type:'video',     activity:'pre',   kolb:'concrete',   dur:'06:20', state:'done' },
  { id:2, title:'Modelo de conversaciones difíciles',          type:'reading',   activity:'pre',   kolb:'conceptual', dur:'14 min', state:'done' },
  { id:3, title:'Quiz: identificando tu estilo bajo presión',  type:'quiz',      activity:'pre',   kolb:'reflective', dur:'08 min', state:'done' },
  { id:4, title:'Conversaciones difíciles con propósito',      type:'video',     activity:'pre',   kolb:'conceptual', dur:'18:24', state:'active' },
  { id:5, title:'Sesión sincrónica: práctica con coach',       type:'live',      activity:'live',  kolb:'concrete',   dur:'90 min', state:'pending' },
  { id:6, title:'Desafío aplicado: tu próxima conversación',   type:'challenge', activity:'post',  kolb:'applied',    dur:'45 min', state:'pending' },
  { id:7, title:'Foro: comparte tu experiencia',                type:'forum',     activity:'post',  kolb:'reflective', dur:'20 min', state:'pending' },
  { id:8, title:'Brinkerhoff: evidencia de transferencia',     type:'challenge', activity:'trans', kolb:'applied',    dur:'30 min', state:'pending' },
];

const RECOMMENDED = [
  { id:'r1', title:'Liderazgo en terreno minero', course:'Programa Minería', tone:'navy', dur:'4h 20m', rating:4.8, sence:true },
  { id:'r2', title:'Gestión de conflictos en equipos diversos', course:'Comunicación', tone:'gold', dur:'3h 10m', rating:4.7 },
  { id:'r3', title:'DS44: implementación práctica', course:'Compliance', tone:'slate', dur:'5h 00m', rating:4.9, sence:true },
  { id:'r4', title:'Conversaciones de desempeño', course:'Liderazgo', tone:'navy', dur:'2h 40m', rating:4.6 },
  { id:'r5', title:'Bienestar emocional para líderes', course:'Bienestar', tone:'gold', dur:'3h 30m', rating:4.8 },
  { id:'r6', title:'Cultura justa y aprendizaje', course:'Cultura', tone:'slate', dur:'2h 50m', rating:4.7 },
];

const PROGRAMS = [
  { id:'p1', title:'Liderazgo Transformacional · 90 días', tag:'Insignia P180', tone:'navy',  modules:6, hours:'12h', sence:true },
  { id:'p2', title:'Ley Karin · Cumplimiento y cultura',   tag:'Compliance',     tone:'gold',  modules:4, hours:'6h',  sence:true },
  { id:'p3', title:'DS44 Riesgos Psicosociales',           tag:'Normativo',      tone:'slate', modules:5, hours:'9h',  sence:true },
  { id:'p4', title:'Bienestar Organizacional integral',    tag:'Cultura',        tone:'navy',  modules:5, hours:'10h' },
  { id:'p5', title:'Comunicación Consciente',              tag:'Habilidades',    tone:'gold',  modules:4, hours:'7h' },
  { id:'p6', title:'Cultura de Seguridad',                 tag:'Operacional',    tone:'slate', modules:4, hours:'8h',  sence:true },
];

const CATALOG = [
  { id:'c1', title:'Liderazgo Transformacional · 90 días', sector:'Privado', topic:'Liderazgo', level:'Avanzado',   dur:'12h', modules:6, instr:'Carolina Pérez', tone:'navy',  sence:true },
  { id:'c2', title:'Ley Karin · Cumplimiento y cultura',   sector:'Privado', topic:'Compliance',  level:'Intermedio', dur:'6h',  modules:4, instr:'Andrés Vega',    tone:'gold',  sence:true },
  { id:'c3', title:'DS44 Riesgos Psicosociales',           sector:'Minería', topic:'Compliance',  level:'Intermedio', dur:'9h',  modules:5, instr:'María Torres',   tone:'slate', sence:true },
  { id:'c4', title:'Cultura de Seguridad',                 sector:'Minería', topic:'Cultura',     level:'Básico',     dur:'8h',  modules:4, instr:'Rodrigo Núñez',  tone:'navy',  sence:true },
  { id:'c5', title:'Comunicación Consciente',              sector:'Privado', topic:'Liderazgo',   level:'Básico',     dur:'7h',  modules:4, instr:'Paula Sandoval', tone:'gold' },
  { id:'c6', title:'Bienestar Organizacional integral',    sector:'Municipios',topic:'Bienestar', level:'Intermedio', dur:'10h', modules:5, instr:'Juan Iturra',    tone:'slate' },
  { id:'c7', title:'Liderazgo público con propósito',      sector:'Municipios',topic:'Liderazgo', level:'Avanzado',   dur:'9h',  modules:5, instr:'Carolina Pérez', tone:'navy' },
  { id:'c8', title:'Conversaciones de desempeño',          sector:'Privado', topic:'Liderazgo',   level:'Intermedio', dur:'4h',  modules:3, instr:'Andrés Vega',    tone:'gold' },
  { id:'c9', title:'Equidad de género y prevención',       sector:'Privado', topic:'Cultura',     level:'Básico',     dur:'5h',  modules:3, instr:'Paula Sandoval', tone:'slate', sence:true },
  { id:'c10',title:'Coaching para mandos medios',          sector:'Minería', topic:'Liderazgo',   level:'Avanzado',   dur:'11h', modules:6, instr:'Rodrigo Núñez',  tone:'navy' },
];

/* ----------------------------- HELPERS ----------------------------- */
const toneBg = {
  navy:  'stripe-bg',
  gold:  'stripe-gold',
  slate: 'stripe-bg',
};
const toneAccent = {
  navy:  'text-navy',
  gold:  'text-gold-700',
  slate: 'text-slate-700',
};

function ProgressBar({ value, color='bg-gold', track='bg-navy/10', height='h-1.5' }) {
  return (
    <div className={`w-full ${track} rounded-full overflow-hidden ${height}`}>
      <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

function Badge({ children, className='' }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${className}`}>{children}</span>;
}

/* Thumbnail placeholder, P180-styled */
function Thumb({ tone='navy', label='video', children, className='' }){
  const Icon = label==='reading' ? I.Book : I.Play;
  return (
    <div className={`relative aspect-video rounded-xl overflow-hidden ${toneBg[tone]} ring-soft ${className}`}>
      <div className="absolute inset-0 grid place-items-center">
        <div className="size-12 rounded-full bg-white/85 backdrop-blur grid place-items-center shadow">
          <Icon className={`size-5 ${toneAccent[tone]}`} />
        </div>
      </div>
      <div className="absolute left-2 top-2"><span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-white/90 text-navy">P180</span></div>
      {children}
    </div>
  );
}

/* ----------------------------- LAYOUT ----------------------------- */
function Sidebar({ open, view, setView }){
  const main = [
    { id:'home', label:'Inicio', icon:I.Home },
    { id:'paths',label:'Mis Rutas', icon:I.Path },
    { id:'catalog', label:'Catálogo', icon:I.Grid },
    { id:'progress',label:'Mi Progreso', icon:I.Chart },
    { id:'certs', label:'Certificados', icon:I.Award },
    { id:'community', label:'Comunidad', icon:I.Users },
    { id:'resources', label:'Recursos', icon:I.Book },
  ];
  const foot = [
    { id:'support', label:'Soporte', icon:I.Help },
    { id:'settings', label:'Configuración', icon:I.Cog },
  ];
  const Item = ({it, active}) => (
    <button onClick={()=>setView(it.id)}
      className={`w-full group flex items-center ${open?'gap-3 px-3':'justify-center'} h-10 rounded-lg transition
        ${active ? 'bg-navy text-white' : 'text-ink/80 hover:bg-navy/5'}`}>
      <it.icon className="size-5 shrink-0" />
      {open && <span className={`text-sm ${active?'font-semibold':'font-medium'}`}>{it.label}</span>}
      {open && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
    </button>
  );
  return (
    <aside className={`shrink-0 ${open?'w-60':'w-[72px]'} transition-all duration-200 border-r border-black/5 bg-white flex flex-col`}>
      <div className={`h-16 flex items-center ${open?'px-4':'justify-center'} border-b border-black/5`}>
        {open ? (
          <img src="/assets/logo-p180-cropped.png" alt="Propósito 180" className="h-9 object-contain object-left" style={{maxWidth:'180px'}}/>
        ) : (
          <div className="size-9 rounded-lg bg-navy text-white grid place-items-center font-extrabold text-sm tracking-tight">
            <span>P<span className="text-gold">180</span></span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-none">
        {main.map(it => <Item key={it.id} it={it} active={view===it.id}/>) }
        <div className="my-3 border-t border-black/5" />
        {open && <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-ink/40">Tu cuenta</div>}
        {foot.map(it => <Item key={it.id} it={it} active={view===it.id}/>) }
      </nav>

      {open && (
        <div className="m-3 mt-0 p-3 rounded-xl stripe-navy text-white">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gold-100/90"><I.Sparkle className="size-3.5 text-gold"/> Metodología P180</div>
          <p className="mt-1 text-[12.5px] leading-snug text-white/90">Aula invertida + Backward Design + Ciclo de Kolb.</p>
        </div>
      )}
    </aside>
  );
}

function Header({ onToggle, view, setView }){
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur border-b border-black/5 flex items-center px-4 gap-3">
      <button onClick={onToggle} className="size-10 grid place-items-center rounded-full hover:bg-navy/5 text-ink/80"><I.Menu className="size-5"/></button>

      <div className="flex-1 max-w-2xl mx-auto">
        <div className="flex items-center bg-paper border border-black/10 rounded-full h-10 px-4 focus-within:border-navy/40 focus-within:bg-white transition">
          <I.Search className="size-4 text-ink/50" />
          <input className="flex-1 bg-transparent outline-none text-sm px-3 placeholder:text-ink/40" placeholder="Buscar curso, módulo o lección..." />
          <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded border border-black/10 text-ink/50">⌘K</kbd>
        </div>
      </div>

      {/* XP cluster */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-50 text-gold-700 ring-1 ring-gold/30 text-sm font-semibold">
          <I.Bolt className="size-3.5"/> {USER.xp.toLocaleString('es-CL')} XP
        </div>
        <div className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-200 text-sm font-semibold">
          <I.Flame className="size-3.5"/> {USER.streak}d
        </div>
      </div>

      <button className="relative size-10 grid place-items-center rounded-full hover:bg-navy/5 text-ink/80">
        <I.Bell className="size-5"/>
        <span className="absolute top-2 right-2 size-2 rounded-full bg-gold ring-2 ring-white"/>
      </button>

      <button className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full hover:bg-navy/5">
        <span className="size-8 rounded-full bg-navy text-white grid place-items-center text-xs font-bold">{USER.initials}</span>
        <span className="hidden md:flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold">{USER.name.split(' ')[0]}</span>
          <span className="text-[10px] text-ink/50">Líder · Minería</span>
        </span>
        <I.ChevD className="size-3.5 text-ink/50 hidden md:block"/>
      </button>
    </header>
  );
}

/* ----------------------------- HOME PIECES ----------------------------- */

function Hero(){
  const t = ACTIVITY_TYPES[ACTIVE_ROUTE.nextType];
  return (
    <section className="relative overflow-hidden rounded-2xl stripe-navy text-white">
      <div className="absolute -right-10 -top-10 size-72 rounded-full bg-gold/15 blur-3xl"/>
      <div className="absolute right-20 bottom-0 size-48 rounded-full bg-white/5 blur-2xl"/>
      <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-6 p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-100/90">
            <span className="size-1.5 rounded-full bg-gold"/> Tu ruta activa
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{ACTIVE_ROUTE.title}</h1>
          <p className="text-sm md:text-base text-white/75 mt-1">{ACTIVE_ROUTE.subtitle}</p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-extrabold text-gold tabular-nums">{ACTIVE_ROUTE.progress}%</span>
            <div className="flex-1">
              <ProgressBar value={ACTIVE_ROUTE.progress} color="bg-gold" track="bg-white/15" height="h-2"/>
              <div className="flex justify-between text-[11px] text-white/60 mt-1.5">
                <span>11 de 24 lecciones</span><span>Meta · 90 días</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-gold hover:bg-gold-500 text-navy font-semibold text-sm shadow-hover transition">
              <I.Play className="size-4"/> Continuar aprendiendo
            </button>
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium ring-1 ring-white/15">
              Ver toda la ruta <I.ChevR className="size-3.5"/>
            </button>
          </div>
        </div>

        {/* Next lesson card */}
        <div className="rounded-xl bg-white/8 backdrop-blur ring-1 ring-white/10 p-4 md:p-5 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">Siguiente lección sugerida</div>
          <div className="mt-2 flex items-start gap-3">
            <div className="size-12 rounded-lg bg-gold/15 ring-1 ring-gold/30 grid place-items-center text-gold shrink-0"><t.icon className="size-5"/></div>
            <div className="min-w-0">
              <div className="text-[11px] text-white/55 uppercase tracking-wider">{ACTIVE_ROUTE.nextLesson.split('—')[0]}</div>
              <div className="font-semibold text-[15px] leading-snug clamp-2">{ACTIVE_ROUTE.nextLesson.split('—')[1]?.trim() || ACTIVE_ROUTE.nextLesson}</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge className="bg-white/10 text-white/85 ring-1 ring-white/15"><span className={`size-1.5 rounded-full ${t.dot}`}/> {t.label}</Badge>
            <Badge className="bg-white/10 text-white/85 ring-1 ring-white/15">{KOLB.conceptual.label}</Badge>
            <Badge className="bg-white/10 text-white/85 ring-1 ring-white/15"><I.Clock className="size-3"/> {ACTIVE_ROUTE.nextDuration}</Badge>
          </div>
          <div className="mt-auto pt-4 grid grid-cols-3 gap-2 text-center">
            <Stat n={USER.xp.toLocaleString('es-CL')} l="XP" />
            <Stat n={USER.streak+'d'} l="Racha" />
            <Stat n={USER.badges} l="Badges" />
          </div>
        </div>
      </div>
    </section>
  );
}
const Stat = ({n,l}) => (
  <div className="rounded-lg bg-white/5 ring-1 ring-white/10 py-2">
    <div className="text-base font-bold text-gold tabular-nums">{n}</div>
    <div className="text-[10px] uppercase tracking-wider text-white/55">{l}</div>
  </div>
);

/* Carousel wrapper */
function Carousel({ title, subtitle, children, action='Ver todo' }){
  const ref = useRef(null);
  const scroll = (dx) => ref.current?.scrollBy({ left: dx, behavior:'smooth' });
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight text-ink">{title}</h2>
          {subtitle && <p className="text-[12.5px] text-ink/55">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={()=>scroll(-560)} className="size-9 grid place-items-center rounded-full bg-white border border-black/10 hover:border-navy/40 text-ink/70"><I.ChevL className="size-4"/></button>
          <button onClick={()=>scroll(560)}  className="size-9 grid place-items-center rounded-full bg-white border border-black/10 hover:border-navy/40 text-ink/70"><I.ChevR className="size-4"/></button>
          <button className="ml-2 text-xs font-semibold text-navy hover:text-gold-700 inline-flex items-center gap-1">{action} <I.ChevR className="size-3"/></button>
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-none -mx-1 px-1 pb-1 snap-x">
        {children}
      </div>
    </section>
  );
}

function ContinueCard({ item, onClick }){
  const t = ACTIVITY_TYPES[item.type==='reading'?'pre':'pre'];
  return (
    <button onClick={onClick} className="card-hover snap-start text-left w-[300px] shrink-0 group">
      <Thumb tone={item.tone} label={item.type}>
        <span className="absolute right-2 top-2 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-black/55 text-white">{item.dur}</span>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/15">
          <div className="h-full bg-gold" style={{width:`${item.pct}%`}}/>
        </div>
        <div className="preview absolute inset-x-2 bottom-2 rounded-md bg-white/95 backdrop-blur px-2.5 py-1.5 text-[11px] text-ink/70 ring-1 ring-black/5">
          <span className="font-semibold text-ink">Continuar · </span>{item.pct}% completado · faltan {Math.max(1, Math.round((100-item.pct)/100 * 18))} min
        </div>
      </Thumb>
      <div className="mt-2.5 px-0.5">
        <div className="text-[11px] uppercase tracking-wider text-ink/45">{item.course} · {item.module}</div>
        <h3 className="text-[14px] font-semibold leading-snug clamp-2 group-hover:text-navy">{item.title}</h3>
      </div>
    </button>
  );
}

function RecCard({ item }){
  return (
    <div className="card-hover snap-start w-[280px] shrink-0 bg-white rounded-xl ring-1 ring-black/5 hover:shadow-hover transition overflow-hidden">
      <Thumb tone={item.tone}>
        {item.sence && <span className="absolute right-2 top-2 px-1.5 py-0.5 text-[10px] font-bold rounded bg-gold text-navy">SENCE</span>}
      </Thumb>
      <div className="p-3">
        <div className="text-[11px] uppercase tracking-wider text-ink/45">{item.course}</div>
        <h3 className="mt-0.5 text-[14px] font-semibold leading-snug clamp-2">{item.title}</h3>
        <div className="mt-2 flex items-center gap-3 text-[11.5px] text-ink/60">
          <span className="inline-flex items-center gap-1"><I.Clock className="size-3"/>{item.dur}</span>
          <span className="inline-flex items-center gap-1 text-gold-700"><I.Sparkle className="size-3"/>{item.rating}</span>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({ item }){
  return (
    <div className="card-hover snap-start w-[340px] shrink-0 rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 hover:shadow-hover transition">
      <div className={`relative h-32 ${toneBg[item.tone]} ring-soft`}>
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-white/90 text-navy">{item.tag}</span>
          {item.sence && <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gold text-navy">SENCE</span>}
        </div>
        <div className="absolute right-3 bottom-3 size-10 rounded-full bg-white grid place-items-center shadow"><I.Play className={`size-4 ${toneAccent[item.tone]}`}/></div>
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-bold leading-snug">{item.title}</h3>
        <div className="mt-2 flex items-center gap-3 text-[12px] text-ink/60">
          <span>{item.modules} módulos</span><span>·</span><span>{item.hours}</span>
        </div>
        <button className="mt-3 w-full h-9 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-navy-800 transition">Inscribirme</button>
      </div>
    </div>
  );
}

/* Vertical timeline of route */
function RouteTimeline({ onOpen }){
  return (
    <section className="bg-white rounded-2xl ring-1 ring-black/5 p-5 md:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight">Tu ruta de aprendizaje activa</h2>
          <p className="text-[12.5px] text-ink/55">Liderazgo Transformacional · 6 módulos · diseño Backward · ciclo Kolb</p>
        </div>
        <span className="text-[12px] text-ink/55">{ACTIVE_ROUTE.progress}% completado</span>
      </div>

      <ol className="mt-5 relative">
        <span className="absolute left-[15px] top-2 bottom-2 w-px bg-navy/10"/>
        {TIMELINE.map((m, i) => {
          const done = m.state==='done', active = m.state==='active', locked = m.state==='locked';
          return (
            <li key={m.id} className="relative pl-12 py-3">
              <span className={`absolute left-0 top-3 size-8 rounded-full grid place-items-center ring-4 ring-white
                ${done?'bg-emerald-500 text-white': active?'bg-gold text-navy': 'bg-navy/5 text-ink/40'}`}>
                {done ? <I.Check className="size-4"/> : locked ? <I.Lock className="size-3.5"/> : <span className="text-[11px] font-bold">M{m.id}</span>}
              </span>
              <button
                disabled={locked}
                onClick={()=> active && onOpen?.()}
                className={`w-full text-left rounded-xl px-4 py-3 ring-1 transition flex items-center gap-4
                  ${active?'bg-gold-50 ring-gold/30 hover:ring-gold/60': done?'bg-white ring-black/5': 'bg-paper ring-black/5 opacity-70 cursor-not-allowed'}`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${done?'text-emerald-700':active?'text-gold-700':'text-ink/40'}`}>
                      Módulo {m.id} · {done?'Completado':active?'En curso':'Bloqueado'}
                    </span>
                  </div>
                  <h3 className="text-[14.5px] font-semibold mt-0.5">{m.title}</h3>
                  <div className="text-[12px] text-ink/55 mt-0.5">{m.lessons} lecciones · {m.dur}</div>
                  {active && (
                    <div className="mt-2 max-w-md">
                      <ProgressBar value={(m.activeLessonIdx/m.lessons)*100} color="bg-gold" track="bg-gold/15"/>
                    </div>
                  )}
                </div>
                {active && <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-navy">Abrir módulo <I.ChevR className="size-3"/></span>}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ----------------------------- MODULE / PLAYER VIEW ----------------------------- */
function ModuleView({ onBack }){
  const [activeId, setActiveId] = useState(4);
  const [tab, setTab] = useState('desc');
  const lesson = MODULE_LESSONS.find(l => l.id===activeId);
  const idx = MODULE_LESSONS.findIndex(l=>l.id===activeId);

  const completed = MODULE_LESSONS.filter(l=>l.state==='done').length;
  const pct = Math.round((completed / MODULE_LESSONS.length)*100);

  return (
    <div className="space-y-4">
      {/* Breadcrumb + module progress */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-ink/70 hover:text-navy"><I.ChevL className="size-4"/> Volver al inicio</button>
        <div className="flex items-center gap-3 text-[12px] text-ink/60">
          <span className="font-semibold">Liderazgo Transformacional · Módulo 3 — Conversaciones que transforman</span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-40"><ProgressBar value={pct} /></span>
            <span className="tabular-nums">{pct}%</span>
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5">
        {/* Player + tabs */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-navy-900 relative aspect-video ring-soft">
            <div className="absolute inset-0 stripe-navy"/>
            <div className="absolute inset-0 grid place-items-center">
              <div className="size-20 rounded-full bg-gold grid place-items-center shadow-2xl text-navy"><I.Play className="size-7 ml-1"/></div>
            </div>
            <div className="absolute inset-x-4 bottom-3 flex items-center gap-3 text-white">
              <span className="text-xs tabular-nums w-10">04:12</span>
              <div className="flex-1 h-1 bg-white/15 rounded-full"><div className="h-full bg-gold rounded-full" style={{width:'62%'}}/></div>
              <span className="text-xs tabular-nums w-10 text-right">18:24</span>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <Badge className="bg-white/15 text-white ring-1 ring-white/20"><span className="size-1.5 rounded-full bg-sky-300"/>Pre-clase</Badge>
              <Badge className="bg-white/15 text-white ring-1 ring-white/20">Conceptual</Badge>
            </div>
          </div>

          {/* Title + actions */}
          <div className="flex flex-wrap items-start gap-3 justify-between">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-ink/50">Lección {idx+1} de {MODULE_LESSONS.length}</div>
              <h1 className="text-xl md:text-2xl font-bold mt-0.5 leading-tight">{lesson.title}</h1>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge className={`${ACTIVITY_TYPES[lesson.activity].bg} ${ACTIVITY_TYPES[lesson.activity].text}`}><span className={`size-1.5 rounded-full ${ACTIVITY_TYPES[lesson.activity].dot}`}/> {ACTIVITY_TYPES[lesson.activity].label}</Badge>
                <Badge className={KOLB[lesson.kolb].chip}>{KOLB[lesson.kolb].label}</Badge>
                <Badge className="bg-paper text-ink/70 ring-1 ring-black/5"><I.Clock className="size-3"/> {lesson.dur}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setActiveId(MODULE_LESSONS[Math.max(0,idx-1)].id)} className="h-10 px-3 rounded-lg ring-1 ring-black/10 text-sm hover:bg-navy/5 inline-flex items-center gap-1"><I.ChevL className="size-4"/> Anterior</button>
              <button className="h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center gap-2"><I.Check className="size-4"/> Marcar completada</button>
              <button onClick={()=>setActiveId(MODULE_LESSONS[Math.min(MODULE_LESSONS.length-1,idx+1)].id)} className="h-10 px-3 rounded-lg bg-navy text-white text-sm hover:bg-navy-800 inline-flex items-center gap-1">Siguiente <I.ChevR className="size-4"/></button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-1 px-2 border-b border-black/5 overflow-x-auto scrollbar-none">
              {[
                ['desc','Descripción'],['res','Recursos'],['challenge','Desafíos'],['q','Preguntas'],['notes','Notas'],
              ].map(([id,label])=>(
                <button key={id} onClick={()=>setTab(id)}
                  className={`px-3 h-11 text-sm font-medium border-b-2 transition whitespace-nowrap
                    ${tab===id?'border-gold text-navy':'border-transparent text-ink/55 hover:text-ink'}`}>{label}</button>
              ))}
            </div>
            <div className="p-5 text-[14px] text-ink/80 leading-relaxed">
              {tab==='desc' && (
                <div className="grid md:grid-cols-[1fr_220px] gap-5">
                  <div className="space-y-3">
                    <p>En esta lección abordamos el modelo P180 para sostener conversaciones difíciles desde el propósito: cómo preparar el contexto, nombrar el impacto y co-construir el siguiente paso sin perder el vínculo.</p>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 mb-1.5">Resultados de aprendizaje (Backward Design)</div>
                      <ul className="space-y-1.5">
                        {['Identificar tu patrón bajo presión y su impacto en el equipo.','Aplicar el modelo PCC (Preparar–Conversar–Comprometer).','Diseñar una conversación real para tu contexto de trabajo.'].map((t,i)=>(
                          <li key={i} className="flex gap-2"><I.Check className="size-4 mt-0.5 text-emerald-600 shrink-0"/><span>{t}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <aside className="rounded-xl bg-paper ring-1 ring-black/5 p-3 text-[12.5px]">
                    <div className="font-semibold text-ink mb-2">Ciclo de Kolb</div>
                    <div className="space-y-2">
                      {Object.entries(KOLB).map(([k,v])=>(
                        <div key={k} className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${k==='conceptual'?'bg-amber-500':'bg-ink/15'}`}/>
                          <span className={k==='conceptual'?'text-ink font-semibold':'text-ink/55'}>{v.label}</span>
                          {k==='conceptual' && <span className="ml-auto text-[10px] text-amber-700 font-semibold">Esta lección</span>}
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              )}
              {tab==='res' && (
                <ul className="divide-y divide-black/5 -my-2">
                  {[
                    ['PDF','Modelo PCC — guía de bolsillo','420 KB'],
                    ['Plantilla','Preparación de conversación difícil','Editable'],
                    ['Lectura','Brinkerhoff: del aprendizaje al impacto','12 min'],
                  ].map((r,i)=>(
                    <li key={i} className="flex items-center gap-3 py-2.5">
                      <span className="size-9 rounded-lg bg-paper grid place-items-center text-ink/60 ring-1 ring-black/5"><I.FileTxt className="size-4"/></span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold">{r[1]}</div>
                        <div className="text-[12px] text-ink/55">{r[0]} · {r[2]}</div>
                      </div>
                      <button className="text-xs font-semibold text-navy">Descargar</button>
                    </li>
                  ))}
                </ul>
              )}
              {tab==='challenge' && (
                <div className="rounded-xl stripe-gold ring-soft p-4">
                  <Badge className="bg-white text-gold-700 ring-1 ring-gold/30">Transferencia · Brinkerhoff</Badge>
                  <h3 className="mt-2 font-bold text-ink">Tu próxima conversación</h3>
                  <p className="text-[13px] text-ink/75 mt-1">Identifica una conversación pendiente esta semana, prepárala con el modelo PCC y registra evidencia (audio nota, resumen y compromiso) en el aula.</p>
                  <button className="mt-3 h-9 px-4 rounded-lg bg-navy text-white text-sm font-semibold">Iniciar desafío</button>
                </div>
              )}
              {tab==='q' && <p className="text-ink/60 text-[13px]">Aún no hay preguntas. Sé el primero del cohorte.</p>}
              {tab==='notes' && (
                <textarea placeholder="Escribe tus apuntes de esta lección..." className="w-full min-h-[140px] rounded-xl bg-paper ring-1 ring-black/5 p-3 text-sm outline-none focus:ring-navy/30"/>
              )}
            </div>
          </div>
        </div>

        {/* Right rail: lesson list */}
        <aside className="bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden self-start sticky top-20">
          <div className="px-4 pt-4 pb-3 border-b border-black/5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[15px]">Lecciones del módulo</h3>
              <span className="text-[12px] text-ink/55">{completed}/{MODULE_LESSONS.length}</span>
            </div>
            <div className="mt-2"><ProgressBar value={pct}/></div>
          </div>
          <ul className="max-h-[600px] overflow-y-auto scrollbar-none divide-y divide-black/5">
            {MODULE_LESSONS.map((l,i)=>{
              const Ico = LESSON_ICON[l.type];
              const t = ACTIVITY_TYPES[l.activity];
              const active = l.id===activeId;
              return (
                <li key={l.id}>
                  <button onClick={()=>setActiveId(l.id)} className={`w-full flex items-start gap-3 p-3 text-left transition
                    ${active?'bg-gold-50':'hover:bg-paper'}`}>
                    <span className={`mt-0.5 size-8 rounded-lg grid place-items-center ring-1 shrink-0
                      ${l.state==='done'?'bg-emerald-50 text-emerald-700 ring-emerald-200':
                        active?'bg-gold text-navy ring-gold':
                        'bg-paper text-ink/55 ring-black/5'}`}>
                      {l.state==='done' ? <I.Check className="size-4"/> : <Ico className="size-4"/>}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                        <span className={`size-1.5 rounded-full ${t.dot}`}/>
                        <span className={t.text}>{t.label}</span>
                        <span className="text-ink/30">·</span>
                        <span className="text-ink/45">{KOLB[l.kolb].label}</span>
                      </div>
                      <div className={`text-[13.5px] mt-0.5 leading-snug ${active?'font-semibold text-navy':'text-ink'}`}>{i+1}. {l.title}</div>
                      <div className="text-[11.5px] text-ink/50 mt-0.5 inline-flex items-center gap-1"><I.Clock className="size-3"/> {l.dur}</div>
                    </div>
                    {active && <span className="size-2 rounded-full bg-gold mt-3"/>}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/* ----------------------------- CATALOG VIEW ----------------------------- */
function Catalog(){
  const [sector, setSector] = useState('Todos');
  const [topic, setTopic] = useState('Todos');
  const [level, setLevel] = useState('Todos');
  const [dur, setDur] = useState('Todos');

  const filtered = CATALOG.filter(c=>
    (sector==='Todos'||c.sector===sector) &&
    (topic==='Todos'||c.topic===topic) &&
    (level==='Todos'||c.level===level) &&
    (dur==='Todos' || (dur==='<6h' ? parseInt(c.dur)<6 : parseInt(c.dur)>=6))
  );

  const Pill = ({val,setVal,opts,label}) => (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/45 mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {opts.map(o=>(
          <button key={o} onClick={()=>setVal(o)}
            className={`px-3 h-8 rounded-full text-[12.5px] transition
              ${val===o?'bg-navy text-white':'bg-white ring-1 ring-black/10 text-ink/70 hover:ring-navy/40'}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Catálogo</h1>
        <p className="text-sm text-ink/55">Programas y cursos del portafolio Propósito 180.</p>
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-black/5 p-5 grid md:grid-cols-4 gap-4">
        <Pill label="Sector"   val={sector} setVal={setSector} opts={['Todos','Minería','Municipios','Privado']}/>
        <Pill label="Tema"     val={topic}  setVal={setTopic}  opts={['Todos','Liderazgo','Compliance','Bienestar','Cultura']}/>
        <Pill label="Nivel"    val={level}  setVal={setLevel}  opts={['Todos','Básico','Intermedio','Avanzado']}/>
        <Pill label="Duración" val={dur}    setVal={setDur}    opts={['Todos','<6h','≥6h']}/>
      </div>

      <div className="flex items-center justify-between text-[12.5px] text-ink/55">
        <span>{filtered.length} cursos</span>
        <span className="inline-flex items-center gap-1"><I.Filter className="size-3.5"/> Ordenar por relevancia</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="card-hover bg-white rounded-2xl ring-1 ring-black/5 hover:shadow-hover transition overflow-hidden">
            <Thumb tone={c.tone}>
              {c.sence && <span className="absolute right-2 top-2 px-1.5 py-0.5 text-[10px] font-bold rounded bg-gold text-navy">SENCE</span>}
              <span className="absolute left-2 bottom-2 px-1.5 py-0.5 text-[10px] font-bold rounded bg-black/55 text-white">{c.level}</span>
            </Thumb>
            <div className="p-4">
              <div className="text-[11px] uppercase tracking-wider text-ink/45">{c.sector} · {c.topic}</div>
              <h3 className="mt-0.5 text-[14.5px] font-semibold leading-snug clamp-2">{c.title}</h3>
              <div className="mt-2 flex items-center gap-2 text-[12px] text-ink/60">
                <span className="size-5 rounded-full bg-navy text-white grid place-items-center text-[9px] font-bold">{c.instr.split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
                <span className="truncate">{c.instr}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-ink/55">
                <span>{c.modules} módulos · {c.dur}</span>
                <span className="text-navy font-semibold inline-flex items-center gap-1">Ver curso <I.ChevR className="size-3"/></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- HOME ----------------------------- */
function Home({ onOpenModule }){
  return (
    <div className="space-y-7">
      <Hero/>

      <Carousel title="Continúa donde lo dejaste" subtitle="Retoma tu última lección sin perder el ritmo">
        {CONTINUE_WATCHING.map(it => <ContinueCard key={it.id} item={it} onClick={onOpenModule}/>)}
      </Carousel>

      <RouteTimeline onOpen={onOpenModule}/>

      <Carousel title="Recomendados para ti" subtitle="En base a tu rol: Líder de equipo · Sector Minería">
        {RECOMMENDED.map(it => <RecCard key={it.id} item={it}/>)}
      </Carousel>

      <Carousel title="Programas destacados" subtitle="Itinerarios completos del portafolio P180">
        {PROGRAMS.map(it => <ProgramCard key={it.id} item={it}/>)}
      </Carousel>

      {/* Methodology strip */}
      <section className="rounded-2xl bg-white ring-1 ring-black/5 p-5 md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[17px] font-bold tracking-tight">Cómo aprendes en Academia P180</h2>
            <p className="text-[12.5px] text-ink/55">Aula invertida · Backward Design · Ciclo de Kolb · Brinkerhoff</p>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-4 gap-3">
          {Object.entries(ACTIVITY_TYPES).map(([k,v])=>(
            <div key={k} className={`rounded-xl ${v.bg} ring-soft p-4`}>
              <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${v.text}`}>
                <span className={`size-1.5 rounded-full ${v.dot}`}/> {v.label}
              </div>
              <div className="mt-2 flex items-center gap-2"><v.icon className={`size-5 ${v.text}`}/></div>
              <p className="mt-1.5 text-[12.5px] text-ink/70 leading-snug">
                {k==='pre'   && 'Video y lectura para llegar preparado.'}
                {k==='live'  && 'Sesión sincrónica con coach y pares.'}
                {k==='post'  && 'Desafío aplicado en tu contexto real.'}
                {k==='trans' && 'Evidencia de transferencia al trabajo.'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- APP ----------------------------- */
function App(){
  const [open, setOpen] = useState(true);
  const [view, setView] = useState('home'); // home | catalog | module

  // mobile awareness — simple
  useEffect(()=>{
    const onResize = () => { if (window.innerWidth < 900 && open) setOpen(false); };
    window.addEventListener('resize', onResize); onResize();
    return ()=> window.removeEventListener('resize', onResize);
  // eslint-disable-next-line
  },[]);

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <Sidebar open={open} view={view} setView={setView}/>
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onToggle={()=>setOpen(o=>!o)} view={view} setView={setView}/>
        <main className="flex-1 px-5 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
          {view==='home'    && <Home onOpenModule={()=>setView('module')}/>}
          {view==='catalog' && <Catalog/>}
          {view==='module'  && <ModuleView onBack={()=>setView('home')}/>}
          {!['home','catalog','module'].includes(view) && (
            <Placeholder view={view} onBack={()=>setView('home')}/>
          )}
        </main>
      </div>
    </div>
  );
}

function Placeholder({ view, onBack }){
  const map = {
    paths:'Mis Rutas', progress:'Mi Progreso', certs:'Certificados', community:'Comunidad', resources:'Recursos', support:'Soporte', settings:'Configuración'
  };
  return (
    <div className="bg-white rounded-2xl ring-1 ring-black/5 p-10 text-center">
      <div className="mx-auto size-12 rounded-full bg-navy/5 grid place-items-center text-navy"><I.Sparkle className="size-5"/></div>
      <h2 className="mt-3 text-xl font-bold">{map[view] || view}</h2>
      <p className="text-sm text-ink/55 mt-1">Sección en construcción para esta vista única. Vuelve a Inicio para ver el flujo completo.</p>
      <button onClick={onBack} className="mt-4 h-10 px-4 rounded-lg bg-navy text-white text-sm font-semibold">Volver a Inicio</button>
    </div>
  );
}


export default App;
