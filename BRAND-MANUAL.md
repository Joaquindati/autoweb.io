# Automatika — Manual de Marca

---

## 1. Logo

**Nombre**: Automatika
**Formato**: Tipográfico (wordmark)
**Fuente**: Poppins Bold
**Acento**: Punto verde al final → `Automatika.`
**Colores del logo**:
- Texto: `#0f172a` (Neutral 900) sobre fondo claro
- Texto: `#ffffff` sobre fondo oscuro
- Punto: `#22c55e` (Primary Green) siempre

---

## 2. Paleta de Colores

### Primarios
| Color | Hex | Uso |
|---|---|---|
| **Primary** | `#22c55e` | CTAs, acentos, iconos, links activos |
| **Primary Dark** | `#16a34a` | Hover en botones, gradientes |
| **Primary Light** | `#dcfce7` | Fondos de iconos, badges, fondos de ilustraciones |
| **Primary 50** | `#f0fdf4` | Tinte sutil para secciones |

### Neutros
| Color | Hex | Uso |
|---|---|---|
| **Neutral 900** | `#0f172a` | Headings, texto principal, fondo footer |
| **Neutral 800** | `#1e293b` | Fondo iconos sociales footer |
| **Neutral 700** | `#334155` | Body text por defecto |
| **Neutral 500** | `#64748b` | Texto secundario, captions |
| **Neutral 400** | `#94a3b8` | Links footer |
| **Neutral 300** | `#cbd5e1` | Bordes |
| **Neutral 200** | `#e2e8f0` | Bordes cards, dividers |
| **Neutral 100** | `#f1f5f9` | Fondos alternados (How It Works, WhyChooseUs) |
| **Neutral 50** | `#f8fafc` | Fondos sutiles |
| **White** | `#ffffff` | Fondo principal, cards |

### Gradientes
| Nombre | Definición | Uso |
|---|---|---|
| **CTA Gradient** | `from-#22c55e to-#16a34a` (diagonal BR) | Sección CTA |
| **Illustration BG** | `from-#f0fdf4 to-#dcfce7` (diagonal BR) | Fondos de ilustraciones SVG |

---

## 3. Tipografía

### Fuentes
| Familia | Uso | Pesos |
|---|---|---|
| **Poppins** | Headings (h1–h6), logo, badges | 400, 500, 600, **700** |
| **Inter** | Body text, párrafos, labels, nav | **400**, 500, 600 |

### Escala Tipográfica
| Elemento | Clase Tailwind | Tamaño | Peso |
|---|---|---|---|
| Hero heading | `text-4xl md:text-5xl lg:text-6xl` | 36/48/60px | 700 (bold) |
| Section heading | `text-3xl md:text-4xl` | 30/36px | 700 (bold) |
| Eyebrow | `text-sm uppercase tracking-widest` | 14px | 600 (semibold) |
| Card title | `text-lg` / `text-xl` | 18/20px | 600 (semibold) |
| Body large | `text-lg` | 18px | 400 (regular) |
| Body | `text-base` | 16px | 400 (regular) |
| Body small | `text-sm` | 14px | 400 (regular) |
| Caption | `text-xs` | 12px | 400/500 |
| Button | `text-sm` / `text-base` / `text-lg` | 14/16/18px | 500 (medium) |
| Nav link | `text-sm` | 14px | 500 (medium) |

---

## 4. Botones

**Forma**: Pill (rounded-full)

### Variantes
| Variante | Fondo | Texto | Borde | Sombra |
|---|---|---|---|---|
| **Primary** | `#22c55e` | Blanco | — | `shadow-lg` con tinte verde 25% |
| **Secondary** | Transparente | `#22c55e` | 2px `#22c55e` | — |
| **Outline** | Transparente | `#0f172a` | 2px `#e2e8f0` | — |
| **White** | `#ffffff` | `#22c55e` | — | `shadow-lg` |

### Tamaños
| Tamaño | Padding |
|---|---|
| Small | `px-4 py-2` |
| Medium | `px-6 py-3` |
| Large | `px-8 py-4` |

### Hover
- Primary: fondo cambia a `#16a34a`, sombra aumenta a 40%
- Secondary: fondo se llena a `#22c55e`, texto se vuelve blanco
- Outline: borde y texto cambian a `#22c55e`
- White: fondo cambia a `#f8fafc`

---

## 5. Cards

### Card Base (Service, Feature)
| Propiedad | Valor |
|---|---|
| Fondo | `#ffffff` |
| Borde | 1px `#e2e8f0` |
| Border radius | `rounded-2xl` (16px) |
| Padding | `p-6` (24px) |
| Sombra | `shadow-sm` |
| Hover | Sube 4px, sombra `0 10px 40px rgba(0,0,0,0.08)`, borde `#22c55e/30` |

### Pricing Card (Destacada)
| Propiedad | Valor |
|---|---|
| Borde | 2px `#22c55e` |
| Sombra | `shadow-xl` |
| Escala | `scale-105` |
| Badge | Pill verde con texto blanco, posición `-top-3` |

### Testimonial Card
| Propiedad | Valor |
|---|---|
| Hover | Rota -1°, escala 1.02x |
| Quote icon | `#22c55e`, 32x32px |
| Avatar | Círculo `#22c55e` con iniciales blancas |

---

## 6. Contenedores de Ilustraciones

| Propiedad | Valor |
|---|---|
| Fondo | Gradiente `from-#f0fdf4 to-#dcfce7` |
| Border radius | `rounded-3xl` (24px) |
| Padding | `p-6 lg:p-8` (Remotion) / `p-10 lg:p-14` (Hero) |
| Borde | 1px `#e2e8f0` con 50% opacidad |
| Sombra | `shadow-sm` |

### Elementos SVG
- Color primario: `#22c55e` con variaciones de opacidad
- Color acento en gráficos: `#16a34a`
- Fondos de nodos: Blanco con borde `#22c55e`
- Líneas de conexión: `#22c55e` con opacidad 35-50%

---

## 7. Iconos

**Librería**: Lucide React
**Estilo**: Outlined, stroke-width 2
**Colores**: `#22c55e` (primario) o `#0f172a` (neutro) según contexto
**Contenedor**: `w-12 h-12 rounded-xl bg-primary-light` (fondo verde claro)
**Hover**: Fondo cambia a `#22c55e`, icono se vuelve blanco

---

## 8. Espaciado

### Container
- Max width: `max-w-7xl` (1280px)
- Padding horizontal: `px-4 sm:px-6 lg:px-8`
- Centrado: `mx-auto`

### Secciones
- Padding vertical: `py-20 lg:py-28` (80px / 112px)
- Hero top: `pt-28 lg:pt-36` (para el navbar fijo)

### Grid
- Columnas: `lg:grid-cols-2` (texto + ilustración)
- Gap: `gap-12 lg:gap-16`

---

## 9. Sombras

| Nombre | Valor | Uso |
|---|---|---|
| `shadow-sm` | Sutil | Cards en reposo |
| `shadow-lg` | Pronunciada | Botones primary |
| `shadow-xl` | Fuerte | Pricing card destacada |
| Card hover | `0 10px 40px rgba(0,0,0,0.08)` | Cards al hover |
| Primary glow | `shadow-primary/25` → `shadow-primary/40` | Botón primary |

---

## 10. Border Radius

| Valor | Uso |
|---|---|
| `rounded-full` | Botones, badges, avatars, toggle |
| `rounded-3xl` (24px) | Contenedores de ilustraciones |
| `rounded-2xl` (16px) | Cards |
| `rounded-xl` (12px) | Contenedores de iconos, dropdowns |

---

## 11. Animaciones

### Transiciones CSS
- Botones: `duration-200`
- Colores/bordes: `duration-300`
- Navbar scroll: `duration-300`

### Framer Motion
- Fade-up scroll: `opacity: 0→1, y: 20→0` en 0.5s
- Stagger entre items: 0.08-0.12s
- Spring animations: `stiffness: 260, damping: 20`
- Hover cards: `y: -4px` o `y: -6px`
- Hover tilt (testimonials): `rotate: -1°, scale: 1.02`

### Animaciones continuas
- Dots flotantes: ciclo de 4-6s
- Espirales rotando: 20-25s por revolución
- Pulsos del hub: ciclo de 3s

### Remotion (ilustraciones animadas)
- Duración: 240 frames (8s a 30fps)
- Pausa final: ~3s congelado antes del loop
- Spring: `stiffness: 200, damping: 12-15`
- Líneas se dibujan con pathLength progression

---

## 12. Footer

| Propiedad | Valor |
|---|---|
| Fondo | `#0f172a` |
| Texto | Blanco |
| Links | `#94a3b8` → `#22c55e` en hover |
| Iconos sociales | Círculos `#1e293b` → `#22c55e` en hover |
| Layout | 4 columnas (Logo, Services, Company, Legal) |
| Copyright | `#64748b`, separador `border-neutral-800` |

---

## 13. Navbar

| Estado | Fondo | Sombra |
|---|---|---|
| Inicial (top) | Transparente | — |
| Scrolled (>50px) | `white/95 + backdrop-blur-sm` | `shadow-sm` |

**Altura**: `h-16 lg:h-20`
**Selector de idioma**: Globe icon + código (`EN`, `ES`, `PT`)
**Mobile**: Hamburger menu con overlay blanco full-screen

---

## 14. Idiomas

| Código | Idioma | Default |
|---|---|---|
| `es` | Español | Sí |
| `en` | English | — |
| `pt` | Português | — |

Routing: `/{locale}/` (ej: `/en/`, `/es/`, `/pt/`)

---

## 15. Contacto

Todos los CTAs de contacto abren WhatsApp:
**URL**: `https://wa.me/543416446621`
**Número**: +54 341 644 6621
