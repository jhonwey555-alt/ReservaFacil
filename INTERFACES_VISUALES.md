# 📐 RESUMEN VISUAL DE INTERFACES - ReservaFácil

## 🎨 ARQUITECTURA DE COMPONENTES

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP (Principal)                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ NAVBAR: Logo | Buscador | Favoritos | Perfil             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FILTER BAR: [Categorías] | [Precios] | Ordenar | Contador │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────┬─────────────────────────────────┐  │
│  │                         │                                 │  │
│  │   LIST PANEL (380px)    │      MAP PANEL                  │  │
│  │                         │    (Leaflet + Markers)          │  │
│  │  [RoomCard 1]          │   Title: Mar Caribe             │  │
│  │  [RoomCard 2]          │   Zoom: 7                        │  │
│  │  [RoomCard 3] ← SEL    │   ◆ Marcador seleccionado       │  │
│  │  [RoomCard 4]          │   ◇ Otros marcadores            │  │
│  │  ...scroll...          │   Legend: RD colors             │  │
│  │                         │   Info box: Top-right           │  │
│  └─────────────────────────┴─────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ MODALS (Z-Index > Main):                                 │   │
│  │ • DetailPanel (Z:400)  - Frente página                   │   │
│  │ • Cal (Z:600)          - Encima de DetailPanel           │   │
│  │ • Checkout (Z:700)     - Encima de todo                  │   │
│  │ • Toast (Z:999)        - Notificación                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎴 INTERFAZ 1: ROOMCARD (Tarjeta de Alojamiento)

### Estructura
```
┌─────────────────────────────────────┐
│  ┌───────────────────────────────┐  │
│  │  [IMAGEN 120px]               │  │ ← image: URL
│  └───────────────────────────────┘  │
│                                     │
│  Nombre Alojamiento        [❤️/🤍] │ ← name + toggleWish(id)
│  📍 Ciudad, Región        [Categ] │ ← location + category tag
│                                     │
│  Descripción breve de la propiedad  │ ← desc (2 líneas max)
│  que aparece truncado aquí...       │
│                                     │
│  $XXX /noche    ⭐X.XX • Categoría │ ← price + rating + category
└─────────────────────────────────────┘

PROPS:
├─ room: Object
│  ├─ id: Number
│  ├─ name: String
│  ├─ location: String
│  ├─ price: Number
│  ├─ rating: Number
│  ├─ category: String
│  ├─ desc: String
│  └─ image: URL
├─ selected: Object | null
├─ onSelect: Function (room) → void
├─ wishlist: Array<id>
└─ toggleWish: Function (id) → void

EVENTOS:
├─ onClick en tarjeta → onSelect(room)
└─ onClick en ❤️ → toggleWish(room.id)

ESTADO VISUAL:
├─ Normal: border transparent, shadow light
├─ Selected: border #111 2px, shadow strong, translateX(4px)
└─ Transición: all .2s ease
```

---

## 📋 INTERFAZ 2: DETAIL PANEL (Panel de Detalles)

### Estructura Visual (Móvil: 420px max-width)
```
┌────────────────────────────────┐
│ [×]  [CATEG]  [❤️/🤍]          │ ← Header fijo
├────────────────────────────────┤
│ NOMBRE ALOJAMIENTO (26px)      │ ← Serif Display
│ 📍 Ubicación                   │
│ ⭐ X.XX (XXX reseñas)          │
│                                │
│ [IMAGEN HERO 160px]            │ ← image: objectFit cover
│ "Descripción larga del aloja"  │
│                                │
│ [STATS EN GRID 4 COL]:         │ ← capacity/beds/baths/sqm
│ 👥 4   │ 🛏 2   │ 🚿 2  │ 📐 120 │
│                                │
│ INCLUYE:                       │ ← Amenities como chips
│ [Chip1] [Chip2] [Chip3]        │
│                                │
│ FECHAS:                        │ ← Clickeable → abre Cal
│ [LLEGADA] | [SALIDA]           │
│                                │
│ HUÉSPEDES:                     │ ← Buttons +/- con limits
│ [−] 1 [+]  máx. X             │
│                                │
│ DESGLOSE (Si fechas > 0):      │ ← Precio dinámico
│ $XXX × N noches    $XXXX       │
│ Impuestos 18%      $XX         │
│ Servicio 5%        $XX         │
│ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌     │
│ TOTAL              $XXXX       │
├────────────────────────────────┤
│ [Reservar · $XXXX]             │ ← CTA (enabled si fechas)
│ Sin cargos hasta confirmar     │
└────────────────────────────────┘

PROPS:
├─ room: Object (todos los campos)
├─ onClose: Function () → void
├─ wishlist: Array<id>
└─ toggleWish: Function (id) → void

ESTADO:
├─ showCal: Boolean ─→ abre Cal modal
├─ showCO: Boolean ─→ abre Checkout modal
├─ ci: String|null (check-in date YYYY-MM-DD)
├─ co: String|null (check-out date YYYY-MM-DD)
└─ guests: Number (1 a room.capacity)

CÁLCULOS EN TIEMPO REAL:
├─ n = diff(ci, co) [días]
├─ sub = n * room.price [subtotal]
├─ tax = Math.round(sub * 0.18) [18% impuestos]
├─ svc = Math.round(sub * 0.05) [5% servicio]
└─ tot = sub + tax + svc [total]
```

---

## 📅 INTERFAZ 3: CALENDARIO (Cal Modal)

### Estructura
```
┌────────────────────────────────────┐
│         [‹] Abril 2026 [›]         │ ← Navegación meses
├────────────────────────────────────┤
│ Do  Lu  Ma  Mi  Ju  Vi  Sá         │ ← Encabezados días
│                                    │
│  [1]  [2]  [3]  [4]  [5]  [6]     │
│  [7]  [8]  [9] [10] [11] [12]     │
│ [13] [14] [15] [16] [17] [18]     │
│ [19] [20] [21] [22] [23] [24]     │ ← Ejemplo selección:
│ [25] [26] [27] [28] [29] [30]     │    Entrada: 20 (negro izq)
│                                    │    Salida: 25 (negro der)
│ Leyenda de colores:                │    Rango: 21-24 (gris)
│ ■ Negro: Seleccionado              │    Gris: Booked/pasado
│ ░ Gris: Booked o pasado            │
│ ◐ Hoy: Negrita                     │
├────────────────────────────────────┤
│ [Limpiar]      [Confirmar (5 n.)]  │
└────────────────────────────────────┘

PROPS:
├─ booked: Array<YYYY-MM-DD>
├─ ci: String|null (check-in)
├─ co: String|null (check-out)
├─ setCi: Function (date) → void
├─ setCo: Function (date) → void
└─ onClose: Function () → void

LÓGICA:
├─ st() → Devuelve estado del día
│  ├─ "past" (< hoy) ─ BLOQUEADO
│  ├─ "booked" (en array) ─ BLOQUEADO
│  ├─ "ci" (entrada seleccionada)
│  ├─ "co" (salida seleccionada)
│  ├─ "range" (entre ci y co)
│  ├─ "single" (solo ci, sin co)
│  ├─ "today" (fecha actual)
│  └─ "" (disponible)
│
├─ click(d) → Lógica de selección
│  ├─ Si no hay CI ─ SET CI
│  ├─ Si hay CI y no CO ─ SET CO
│  ├─ Si hay ambos ─ RESET y nueva entrada
│  └─ Valida no-past, no-booked, no-overlap
│
└─ Navegación
   ├─ Botón ‹ ─ Mes anterior (año si enero)
   └─ Botón › ─ Mes siguiente (año si diciembre)

VALIDACIONES:
✗ Fecha < hoy
✗ Fecha en booked array
✗ Salida ≤ Entrada
✗ Booked entre Entrada y Salida

ESTILOS POR ESTADO:
├─ Past/Booked: gris, cursor not-allowed
├─ Entry: negro, borde izq redondo
├─ Exit: negro, borde der redondo
├─ Range: gris claro, sin borde
├─ Single: negro, redondo
├─ Today: negrita, redondo
└─ Normal: negro texto, redondo on hover
```

---

## 🛒 INTERFAZ 4: CHECKOUT (Modal Reserva)

### PASO 1: FORMULARIO

```
┌──────────────────────────────────┐
│ [←] Confirmar reserva            │ ← Header + cerrar
├──────────────────────────────────┤
│                                  │
│ MINI TARJETA RESUMEN:            │
│ [Foto] Nombre Alojamiento        │
│        📍 Ubicación              │
│        FechA → FechA • X noches  │
│                                  │
│ DESGLOSE:                        │
│ Subtotal         $XXXX           │
│ Impuestos 18%    $XX             │
│ Servicio 5%      $XX             │
│ ──────────────────────           │
│ Total            $XXXX           │
│                                  │
│ ── DATOS PERSONALES ──           │
│ [Nombre completo*]               │ ← Validación: trim required
│ [Email*]                         │ ← Validación: regex @.
│ [Teléfono]                       │ ← Validación: 7+ chars
│ [Huéspedes dropdown: 1-X]        │
│                                  │
│ ── PAGO ──                       │
│ [💳 Tarjeta] [🅿️ PayPal] [💵 Efectivo] │ ← Exclusive
│                                  │
│ (Si Tarjeta seleccionada:)       │
│ [Número tarjeta (19 chars)]      │
│ [Vencimiento MM/AA] [CVC (3)]    │
│                                  │
│ ── SOLICITUDES ESPECIALES ──     │
│ [Textarea 3 filas]               │ ← Campo libre
│ "Llegada tardía, cama extra..."  │
│                                  │
│ [Confirmar · $XXXX]              │ ← CTA (deshabilitado si errs)
│ No se realizará cobro hasta...   │
└──────────────────────────────────┘

PROPS:
├─ room: Object (completo)
├─ ci: String (YYYY-MM-DD)
├─ co: String (YYYY-MM-DD)
└─ onClose: Function () → void

STATE:
├─ step: 1 | 2
├─ form: Object
│  ├─ name: String
│  ├─ email: String
│  ├─ phone: String
│  ├─ nat: String
│  ├─ guests: String
│  ├─ pay: "card" | "paypal" | "cash"
│  └─ req: String
├─ errs: Object<fieldName, message>
└─ conf: String (código RF-XXXXX)

VALIDACIONES:
├─ name: !form.name.trim()
│  ├─ Mensaje: "Requerido"
│  └─ Acción: Deshabilita submit
│
├─ email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
│  ├─ Mensaje: "Email inválido"
│  └─ Ejemplos:
│     ✓ usuario@ejemplo.com
│     ✓ juan.perez@company.co.uk
│     ✗ usuario@ejemplo (sin extensión)
│     ✗ usuario.ejemplo.com (sin @)
│     ✗ @ejemplo.com (sin usuario)
│
├─ phone: (opcional, pero si se llena) !/^\+?[\d\s\-]{7,}/.test()
│  ├─ Mensaje: "Inválido"
│  └─ Ejemplos:
│     ✓ +1 (555) 123-4567
│     ✓ +34 91 123 4567
│     ✓ 09112345678
│     ✗ 123 (menos de 7)
│
└─ guests: 1 ≤ value ≤ room.capacity
   └─ Validado por dropdown (no errors)

DINÁMICAS:
├─ Error visual: Borde rojo, texto rojo
├─ Focus: Borde negro
├─ Normal: Borde gris
└─ Pago: Mostrar/ocultar campos tarjeta según selección

FLUJO SUBMIT:
├─ Click "Confirmar"
├─ Ejecuta val() ─ valida todos campos
├─ Si errs ─ muestra errores, detiene
├─ Si OK ─ genera código RF-XXXXX
├─ setStep(2) ─ pasa pantalla confirmación
└─ Emula envío email

CÁLCULOS (heredados del DetailPanel):
├─ n = diff(ci, co)
├─ sub = n * room.price
├─ tax = Math.round(sub * 0.18)
├─ svc = Math.round(sub * 0.05)
└─ tot = sub + tax + svc
```

### PASO 2: CONFIRMACIÓN

```
┌──────────────────────────────────┐
│              ✦                   │ ← Icono éxito, 56px
│   Reserva confirmada             │ ← Título 30px Serif
│                                  │
│ Recibirás detalles en:           │
│ usuario@email.com                │
│                                  │
│ ┌────────────────────────────┐   │
│ │  RF-A7K2X  (monoespaciado)│   │ ← Código único
│ └────────────────────────────┘   │
│                                  │
│ ┌────────────────────────────┐   │
│ │ Alojamiento:   Nombre      │   │
│ │ Ubicación:     Ciudad      │   │
│ │ Check-in:      20 Abr 2026 │   │ ← Tabla resumen
│ │ Check-out:     25 Abr 2026 │   │
│ │ Noches:        5           │   │
│ │ Total:         $1,507      │   │
│ └────────────────────────────┘   │
│                                  │
│ [Explorar más alojamientos]      │ ← CTA secundario
│                                  │
└──────────────────────────────────┘

OUTPUT:
├─ Código: RF-[5 caracteres aleatorios]
├─ Email: Se mostraría (form.email)
└─ Resumen: Tabla completa de reserva

ACCIÓN CLICK:
└─ onClose() ─ Vuelve a APP principal, limpia estado
```

---

## 📊 MATRIZ DE VALIDACIONES RESUMIDA

| # | Componente | Campo | Validación | Bloquea | Mensaje |
|---|-----------|-------|-----------|---------|---------|
| 1 | Cal | Fecha pasada | `date < today` | ✓ Gray | (sin click) |
| 2 | Cal | Fecha booked | `booked.includes(date)` | ✓ Gray | (sin click) |
| 3 | Cal | Rango overlap | `booked.some(d=>d>ci&&d<co)` | ✓ False | (sin confirmar) |
| 4 | Checkout | Nombre | `!form.name.trim()` | ✓ Desabl | "Requerido" |
| 5 | Checkout | Email | `!/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | ✓ Desabl | "Email inválido" |
| 6 | Checkout | Teléfono | `!/^\+?[\d\s\-]{7,}/` | ☐ Info | "Inválido" |
| 7 | DetailPanel | Huéspedes + | `guests < room.capacity` | ☐ Limit | (button disable) |
| 8 | DetailPanel | Huéspedes − | `guests > 1` | ☐ Limit | (button disable) |
| 9 | DetailPanel | Reservar btn | `!ci \|\| !co` | ✓ Desabl | Gray state |

Legend:
- ✓ = Bloquea completamente
- ☐ = Limita sin error
- Desabl = Botón deshabilitado
- Gray = Elemento desactivado visualmente

---

## 🎯 FLUJO PRINCIPAL (User Journey)

```
START: Pantalla Principal
  ↓
[1] EXPLORAR
  ├─ Buscador ─→ Filtra por nombre/ubicación
  ├─ Categorías ─→ Filtra por tipo
  ├─ Precio ─→ Filtra por rango
  ├─ Ordenar ─→ Reordena lista
  └─ Click tarjeta ─→ Abre DetailPanel
  ↓
[2] INVESTIGAR (DetailPanel)
  ├─ Ver imagen, amenities, stats
  ├─ Ver en mapa
  ├─ Guardar favorito
  └─ Click en "Fechas" ─→ Abre Calendario
  ↓
[3] SELECCIONAR FECHAS (Calendar)
  ├─ Navegar meses
  ├─ Click entrada (blocked si pasada/booked)
  ├─ Click salida (blocked si pasada/booked)
  ├─ Ver rango resaltado
  ├─ Click Limpiar ─→ Reset selección
  └─ Click Confirmar ─→ Cierra modal
  ↓
[4] AJUSTAR DETALLES (DetailPanel)
  ├─ Ver desglose precio dinámico
  ├─ Usar +/− para huéspedes
  └─ Click "Reservar · $XXX" ─→ Abre Checkout
  ↓
[5] COMPLETAR DATOS (Checkout - Paso 1)
  ├─ Llenar Nombre (required, trim)
  ├─ Llenar Email (required, regex)
  ├─ (Opcional) Llenar Teléfono (regex si no vacío)
  ├─ Seleccionar Huéspedes (dropdown)
  ├─ Seleccionar Pago (exclusive)
  ├─ (Si Tarjeta) Llenar datos tarjeta
  ├─ (Opcional) Solicitudes especiales
  ├─ Sistema valida todos campos
  └─ Click "Confirmar" ─→ Si valid → Paso 2
  ↓
[6] CONFIRMACIÓN (Checkout - Paso 2)
  ├─ Ver código RF-XXXXX
  ├─ Ver resumen reserva
  ├─ Leer "Email enviado a..."
  └─ Click "Explorar" ─→ Vuelve a START
```

---

## ⚙️ ESTADO GLOBAL (React Context/Hooks)

```
App Component State:
├─ cat: String (categoría seleccionada)
├─ search: String (búsqueda aplicada)
├─ sinput: String (búsqueda en input)
├─ sort: String ("default" | "rating" | "asc" | "desc")
├─ price: String ("all" | "low" | "mid" | "high")
├─ selected: Room | null (tarjeta seleccionada)
├─ detail: Room | null (panel detalles abierto)
├─ wishlist: Array<id> (alojamientos guardados)
├─ wishOnly: Boolean (filtro solo favoritos)
└─ toast: String | null (notificación temporal)

DetailPanel State:
├─ ci: String | null
├─ co: String | null
├─ guests: Number
├─ showCal: Boolean
└─ showCO: Boolean

Checkout State:
├─ step: 1 | 2
├─ form: Object {name, email, phone, nat, guests, pay, req}
├─ errs: Object {fieldName: message}
└─ conf: String

⚠️ SINCRONIZACIÓN:
├─ Cambiar categoría ─→ Recalcula rooms array
├─ Cambiar precio ─→ Recalcula rooms array
├─ Cambiar sort ─→ Reordena rooms array
├─ Click tarjeta ─→ Actualiza selected + detail
├─ Cerrar panel ─→ Reset selected + detail
└─ Cambiar filtros ─→ Cierra modal abierto si existe
```

---

## ✨ CONCLUSIÓN TABULADA

| Aspecto | Detalles |
|---------|----------|
| **Total Interfaces** | 4 principales (App, DetailPanel, Cal, Checkout) |
| **Total Componentes** | 6 (App, DRMap, RoomCard, DetailPanel, Cal, Checkout) |
| **Total Formularios** | 2 (Cal + Checkout) |
| **Total Campos** | 7 (Nombre, Email, Teléfono, Guests, Pago, Tarjeta, Solicitudes) |
| **Total Validaciones** | 10+ (fechas, email, teléfono, capacidad, overlap) |
| **Estados Visuales** | 15+ (colores, borders, shadows, animaciones) |
| **Interactividad** | 100% (click, hover, focus, validación en tiempo real) |
| **Responsividad** | Móvil-first con breakpoints |
| **Accesibilidad** | Labels claros, errores visibles, feedback |

---

*Documentación completa de interfaces y validaciones*  
*Listo para presentación grupal* ✓
