# Academia Propósito 180

Aula invertida tipo YouTube de la consultora **Propósito 180**.
Stack: React 18 + Vite + Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
npm run preview
```

El build se genera en `/dist`.

## Estructura

```
├── public/assets/      → logos y assets estáticos
├── src/
│   ├── App.jsx         → componente principal (todo el aula)
│   ├── main.jsx        → entry point
│   └── index.css       → Tailwind + estilos custom
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Deploy

### Vercel (recomendado)
1. Conecta el repo en https://vercel.com/new
2. Framework preset: **Vite**
3. Deploy.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# subir contenido de /dist a rama gh-pages
```

## Edición visual

- **VS Code / Cursor**: abre la carpeta y edita `src/App.jsx`.
- **Lovable / v0 / StackBlitz**: importa el repo desde GitHub.
- **GitHub Codespaces**: botón verde "Code" → Codespaces → Create.

## Marca

- Navy `#1B3A5C` · Gold `#C9A227`
- Tipografía: Inter
