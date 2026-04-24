# 📋 ReservaFácil - Documentación Funcional del Sistema
## Demostración en Vivo de Interfaces y Validaciones

---

## 🏠 I. INTERFAZ PRINCIPAL (APP)

### Descripción General
La pantalla principal de ReservaFácil es un sistema de búsqueda y visualización de alojamientos en la República Dominicana con mapa interactivo en tiempo real.

### Componentes de la Interfaz

#### 1. **NAVBAR (Barra de Navegación)**
**Ubicación:** Parte superior fija
**Elementos:**
- **Logo "ReservaFácil"** (clickeable - reinicia filtros)
- **Buscador textual:**
  - Campo de búsqueda con placeholder: "Buscar destino o tipo de alojamiento..."
  - Botón de envío (→)
  - Busca en nombres de alojamientos y localizaciones
  
- **Botón de Favoritos:**
  - Muestra cantidad de alojamientos guardados
  - Indica estado con corazón (❤️) o vacío (🤍)
  - Al clickear, filtra solo favoritos
  
- **Ícono de Perfil:**
  - Avatar de usuario (👤)
  - Placeholder para futuras funcionalidades

**Función:** Navegación principal, búsqueda rápida y acceso a favoritos

---

#### 2. **BARRA DE CATEGORÍAS Y FILTROS**
**Ubicación:** Debajo del navbar
**Elementos:**

**Panel 1 - Categorías (7 botones):**
- Todos ✦
- Lujo ◆
- Playa ◎
- Naturaleza ◉
- Urbano ▣
- Villas ⬡
- Cultural ◈

**Panel 2 - Rango de Precio (4 botones):**
- Todos (all)
- Menos de $150 (low)
- $150 - $300 (mid)
- Más de $300 (high)

**Panel 3 - Ordenamiento (dropdown selector):**
- Recomendado (default)
- Mejor valorado (rating)
- Precio ↑ (asc)
- Precio ↓ (desc)

**Panel 4 - Contador:**
- Muestra cantidad de alojamientos filtrados
- Se actualiza en tiempo real según filtros aplicados

**Función:** Filtrado y ordenamiento de alojamientos

---

#### 3. **VISTA SPLIT (Dividida en dos columnas)**

**COLUMNA IZQUIERDA - LISTADO DE TARJETAS (380px)**
- Scroll vertical independiente
- Cada tarjeta es clickeable
- Seleccionada tiene borde y shadow destacado

**COLUMNA DERECHA - MAPA INTERACTIVO**
- Leaflet Map con centro: República Dominicana (18.7357°N, -70.1627°O)
- Zoom nivel 7
- Marcadores con precios
- Popup al clickear marcador
- Leyenda de mapa con información de color

**Función:** Exploración visual y espacial de alojamientos

---

## 🎴 II. COMPONENTE: TARJETA DE ALOJAMIENTO (RoomCard)

### Descripción
Componente de visualización condensada de información del alojamiento.

### Estructura y Controles

```
┌─────────────────────────────────┐
│  [IMAGEN DEL ALOJAMIENTO]       │  ← Imagen responsive 120px alto
├─────────────────────────────────┤
│ Nombre Alojamiento      [❤️/🤍] │  ← Título + Botón favoritar
│ 📍 Ubicación            [rating]│  ← Ubicación + Calificación
├─────────────────────────────────┤
│ Descripción breve (max 2 líneas)│  ← Texto truncado
├─────────────────────────────────┤
│ $XXX /noche    ⭐X.XX • Categ. │  ← Precio + Rating + Categoría
└─────────────────────────────────┘
```

### Campos Mostrados
| Campo | Tipo | Descripción |
|-------|------|-------------|
| imagen | Image | Foto del alojamiento |
| nombre | Texto | Nombre de la propiedad |
| ubicación | Texto | Ciudad/región dominicana |
| descripción | Texto | Resumen máx 2 líneas |
| precio | Número | Precio por noche en USD |
| rating | Decimal | Calificación 0-5 estrellas |
| categoría | Etiqueta | Tipo de alojamiento |

### Funcionalidades
- **Click en tarjeta:** Abre panel de detalles
- **Click en corazón:** Agrega/elimina de favoritos
- **Borde activo:** Indica selección actual
- **Animación:** Traslación al seleccionar

---

## 📰 III. COMPONENTE: PANEL DE DETALLES (DetailPanel)

### Descripción
Interfaz lateral derecha que muestra información completa del alojamiento seleccionado.

### Estructura de Secciones

```
┌──────────────────────────────────┐
│ [×] [Categoría] [❤️/🤍]          │ ← Header con cerrar + favoritar
├──────────────────────────────────┤
│ NOMBRE DEL ALOJAMIENTO           │ ← Título grande
│ 📍 Ubicación                      │ ← Ubicación
│ ⭐ X.XX (XXX reseñas)            │ ← Rating + cantidad reviews
├──────────────────────────────────┤
│ [IMAGEN HERO - Alto 160px]       │ ← Foto principal responsiva
├──────────────────────────────────┤
│ Descripción larga y detallada     │ ← Párrafo descriptivo italizado
│ ...                               │
├──────────────────────────────────┤
│ 👥 X Huésp. │ 🛏 X Camas │      │ ← Estadísticas en grid 4 cols
│ 🚿 X Baños │ 📐 XXm² Área       │
├──────────────────────────────────┤
│ INCLUYE:                          │ ← Amenities como tags
│ [Tag1] [Tag2] [Tag3] [Tag4]      │
├──────────────────────────────────┤
│ FECHAS:                           │ ← Selector de fechas
│ [LLEGADA___] | [SALIDA____]      │ (clickeable - abre calendario)
├──────────────────────────────────┤
│ HUÉSPEDES:                        │ ← Selector numérico
│ [−] 1 [+]  máx. 4               │
├──────────────────────────────────┤
│ DESGLOSE DE PRECIO (si hay dates)│ ← Breakdown dinámico
│ $XXX × X noches      $XXXX       │
│ Impuestos (18%)      $XX         │
│ Servicio (5%)        $XX         │
│ ─────────────────────────────    │
│ Total                $XXXX       │
├──────────────────────────────────┤
│ [Reservar · $XXXX] (deshabilitado│ ← CTA principal
│  Si no hay fechas)               │
│ Sin cargos hasta confirmar       │ ← Texto aclaratorio
└──────────────────────────────────┘
```

### Formulario: SELECTOR DE FECHAS (Modal Calendario)

**Nombre:** `Cal` (Calendar)

**Controles:**
- **Navegación de meses:** Botones ‹ y › 
- **Displays:** Mes y año actual
- **Grid de días:** 
  - 7 columnas (Do-Sá)
  - Filas dinámicas según mes
  
**Estados de Días:**
- **Gris deshabilitado:** Pasadas o ya booked
- **Hoy:** Número en negrita
- **Seleccionado (Llegada):** Fondo negro, borde izquierdo redondeado
- **Rango:** Fondo gris claro
- **Salida:** Fondo negro, borde derecho redondeado

**Botones:**
- **Limpiar:** Reinicia selección
- **Confirmar:** Cierra modal si hay fecha entrada y salida

**Validaciones:**
- No permite fechas pasadas
- No permite fechas ya categorizadas como booked
- Valida que salida > entrada

---

## 💳 IV. COMPONENTE: FORMULARIO DE RESERVA (Checkout)

### Descripción
Interfaz modal de dos pasos para completar la reserva.

### PASO 1: Datos de Reserva y Personales

#### Sección 1: RESUMEN MINI TARJETA
```
┌────────────────────────────┐
│ [Img] Nombre Alojamiento   │
│       📍 Ubicación         │
│       FechA → FechA • X     │
│       noches               │
└────────────────────────────┘
```

#### Sección 2: DESGLOSE DE PRECIO
```
Subtotal (precio × noches)    $XXXX
Impuestos (18%)               $XX
Cargo por servicio            $XX
────────────────────────
Total                         $XXXX
```

#### Sección 3: DATOS PERSONALES (FORMULARIO)

**Campos:**

| Campo | Tipo | Obligatorio | Validación | Mensaje Error |
|-------|------|-------------|-----------|---------------|
| Nombre completo | Texto | ✓ | No vacío (trim) | "Requerido" |
| Email | Email | ✓ | Regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$` | "Email inválido" |
| Teléfono | Tel | ✗ | Regex: `^\+?[\d\s\-]{7,}` | "Inválido" (si intenta) |
| Huéspedes | Select | ✗ | 1 - Capacidad room | Limitado por dropdown |
| Nacionalidad | (Placeholder) | ✗ | - | - |

**Estilos de Validación:**
- **Campo con error:** Borde rojo (#e53935)
- **Mensaje error:** Texto rojo debajo del campo
- **Focus:** Borde negro (#111)
- **Normal:** Borde gris (#e5e5e5)

#### Sección 4: MÉTODO DE PAGO (3 opciones)

**Botones de selección exclusivos:**
1. **💳 Tarjeta** → Abre campos adicionales:
   - Número de tarjeta (19 caracteres max)
   - Vencimiento MM/AA (5 caracteres max)
   - CVC (3 caracteres max)

2. **🅿️ PayPal** → Seleccionable directo

3. **💵 Efectivo** → Seleccionable directo

#### Sección 5: SOLICITUDES ESPECIALES

**Control:** `<textarea>` de 3 filas
**Placeholder:** "Llegada tardía, cama extra, alergias, celebración..."
**Función:** Campo libre para peticiones especiales

#### Botón CTA (Call To Action)

**Texto dinámico:** "Confirmar · $[TOTAL]"
**Estados:**
- **Habilitado:** Fondo negro, cursor pointer
- **Validación fallida:** Deshabilitado, gris

**Acción:** Al clickear → Valida formulario y pasa a Paso 2

---

### PASO 2: CONFIRMACIÓN

**Visual:**
- Icono grande: ✦
- Cabecera: "Reserva confirmada"
- Subtexto: "Recibirás todos los detalles en [EMAIL]"

**Código de Reserva:**
- Formato: RF-XXXXX (aleatorio 5 caracteres alfanuméricos)
- Mostrado en caja con borde

**Resumen de Reserva (tabla):**
| Concepto | Valor |
|----------|-------|
| Alojamiento | Nombre room |
| Ubicación | Ciudad |
| Check-in | Fecha formateada |
| Check-out | Fecha formateada |
| Noches | X |
| Total | $XXXX |

**Botón:** "Explorar más alojamientos" → Cierra modal y vuelve a listado

---

## ✅ V. VALIDACIONES IMPLEMENTADAS

### 1. VALIDACIÓN DE FECHAS (Calendario)

<table>
<tr><th>Regla</th><th>Tipo</th><th>Acción</th></tr>
<tr><td>Fecha menor a hoy</td><td>Bloqueo</td><td>Deshabilita día, color gris</td></tr>
<tr><td>Fecha en booked array</td><td>Bloqueo</td><td>Deshabilita día, color gris</td></tr>
<tr><td>Fecha salida ≤ entrada</td><td>Lógica</td><td>Permite reseleccionar entrada</td></tr>
<tr><td>Fechas booked entre entrada y salida</td><td>Bloqueo</td><td>No permite confirmar rango</td></tr>
</table>

### 2. VALIDACIÓN DE FORMULARIO CHECKOUT

#### A. CAMPO: Nombre Completo
- **Tipo:** String
- **Regla:** `!form.name.trim()` (no vacío)
- **Error:** "Requerido"
- **Impacto:** Deshabilita botón confirmar

#### B. CAMPO: Email
- **Tipo:** Email
- **Regla:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Cumple con:**
  - Al menos 1 carácter antes de @
  - @ obligatorio
  - Dominio con punto (.com, .es, etc)
- **Error:** "Email inválido"
- **Ejemplo válido:** usuario@dominio.com
- **Ejemplo inválido:** usuario@dominio / @dominio.com / usuario.dominio

#### C. CAMPO: Teléfono
- **Tipo:** String tel
- **Regla:** `/^\+?[\d\s\-]{7,}/`
- **Cumple con:**
  - Opcional: + al inicio
  - Mínimo 7 dígitos/espacios/guiones
  - Permite formatos: +1 234 567 8900, +34 91 123 4567, 09112345678
- **Error:** "Inválido"
- **Opcional:** No detiene confirmación si está vacío

#### D. CAMPO: Huéspedes (Dropdown)
- **Tipo:** Select
- **Validación:** Limitado por `room.capacity`
- **Rango:** 1 a Capacity
- **Ejemplos:**
  - Room con capacity 2 → Opciones: 1, 2
  - Room con capacity 6 → Opciones: 1, 2, 3, 4, 5, 6
- **No error:** Dropdown es nativo, no permite valores inválidos

### 3. VALIDACIÓN DE INTERFAZ (DetailPanel)

#### Botón "Reservar · $XXX"
- **Deshabilitado (gris)** si: `!ci || !co` (no hay fechas)
- **Habilitado (negro)** si: `ci && co` (ambas fechas seleccionadas)
- **Texto dinámico:** Muestra total calculado

#### Selector de Huéspedes (Buttons)
- **Botón −:** Mínimo 1 (`Math.max(1, guests-1)`)
- **Botón +:** Máximo capacity (`Math.min(room.capacity, guests+1)`)
- **Display actual:** Muestra número en tiempo real

### 4. VALIDACIÓN DE DATOS (Calculations)

#### Desglose de Precio
```javascript
const n = ci && co ? diff(ci, co) : 0;        // Diferencia de días
const sub = n * room.price;                   // Subtotal
const tax = Math.round(sub * 0.18);           // 18% impuestos
const svc = Math.round(sub * 0.05);           // 5% servicio
const tot = sub + tax + svc;                  // Total calculado
```

**Validaciones implícitas:**
- `diff()` calcula diferencia de milisegundos / 86400000 (ms en día)
- `Math.round()` redondea a entero para dinero
- Impuesto y servicio siempre positivos
- Total nunca negativo

---

## 🎯 VI. FLUJO DE INTERACCIÓN COMPLETO

### Escenario: Buscar y Reservar un Alojamiento

```
1. BÚSQUEDA
   └─ Usuario escribe en buscador
   └─ Presiona Enter o clickea →
   └─ Se filtra localización o nombre
   └─ Contador actualiza cantidad resultados

2. FILTRADO (Opcional)
   └─ Clickea categoría (ej: "Lujo")
   └─ Clickea rango precio (ej: "$150-300")
   └─ Clickea ordenamiento (ej: "Mejor valorado")
   └─ Resultados se regeneran en tiempo real

3. EXPLORACIÓN
   └─ Ve tarjetas en lista izquierda
   └─ Ve marcadores en mapa derecha
   └─ Clickea tarjeta → Abre panel detalles derecha
   └─ Clickea marcador → Info popup y selecciona
   └─ Puede guardar a favoritos (❤️)

4. SELECCIÓN DE FECHAS
   └─ En panel, clickea "Fechas" o los campos
   └─ Abre modal calendario
   └─ Selecciona día llegada (se marca negro izq)
   └─ Selecciona día salida (se marca negro der)
   └─ Rango entre ellos resaltado gris
   └─ Clickea "Confirmar" o cierra modal

5. AJUSTE DE HUÉSPEDES
   └─ Usa botones − y + para ajustar número
   └─ Máximo limitado por capacidad room

6. RESERVA
   └─ Clickea "Reservar · $TOTAL"
   └─ Abre modal checkout (Paso 1)
   └─ VALIDACIÓN 1: Nombre completo
   └─ VALIDACIÓN 2: Email (regex)
   └─ VALIDACIÓN 3: Teléfono (opcional)
   └─ Selecciona método pago
   └─ Si tarjeta: Llena números de tarjeta
   └─ Clickea "Confirmar · $TOTAL"
   └─ PASA A PASO 2: Confirmación
   └─ Muestra código RF-XXXXX
   └─ Email será enviado a [email introducido]

7. CIERRE
   └─ Clickea "Explorar más alojamientos"
   └─ Vuelve a pantalla principal limpia
```

---

## 📊 VII. MATRIZ DE VALIDACIONES

| # | Interfaz | Campo | Validación | Tipo | Estado |
|---|----------|-------|-----------|------|--------|
| 1 | Calendar | Fecha entrada | No pasada | Block | ✓ |
| 2 | Calendar | Fecha entrada | No booked | Block | ✓ |
| 3 | Calendar | Fecha salida | > entrada | Logic | ✓ |
| 4 | Calendar | Rango | No booked between | Block | ✓ |
| 5 | Checkout | Nombre | No vacío (trim) | Required | ✓ |
| 6 | Checkout | Email | Regex formato | Format | ✓ |
| 7 | Checkout | Teléfono | Regex formato | Format | ✓ |
| 8 | Checkout | Huéspedes | 1 ≤ X ≤ Capacity | Range | ✓ |
| 9 | DetailPanel | Botón Reservar | Fechas seleccionadas | Enable | ✓ |
| 10 | DetailPanel | Guests +/- | Límites capacity | Range | ✓ |

---

## 🚀 VIII. CARACTERÍSTICAS ADICIONALES

### Toast (Notificación Flotante)
- Aparece en inferior centro
- Durabilidad: 2.4 segundos
- Mensajes:
  - "Guardado en favoritos ❤️" (al añadir)
  - "Eliminado de favoritos" (al remover)

### Mapa Interactivo
- **Librería:** Leaflet con react-leaflet
- **Tiles:** OpenStreetMap
- **Marcadores:** Precio, estado (seleccionado/favorito)
- **Popup:** Nombre, ubicación, precio, rating

### Responsividad
- Split view de 2 columnas en desktop
- Componentes modales adaptables
- Scrollbars personalizados (4px)

---

## 📱 IX. TECNOLOGÍAS UTILIZADAS

| Componente | Tecnología |
|-----------|-----------|
| Framework | React 18 + TypeScript |
| Mapas | Leaflet + react-leaflet |
| Build | Vite |
| Datos | 12 alojamientos de muestra |
| Styling | CSS-in-JS (Inline Styles) |
| Fuentes | Google Fonts (DM Serif Display, DM Sans) |

---

## ✨ CONCLUSIÓN

ReservaFácil implementa un sistema completo de booking con:
- ✅ 3 interfaces principales (Búsqueda, Detalles, Checkout)
- ✅ 2 formularios complejos (Calendario, Checkout)
- ✅ 10+ validaciones automáticas
- ✅ Mapa interactivo en tiempo real
- ✅ Manejo completo de estado con React Hooks
- ✅ UX/UI profesional y responsivo

---

**Generado para demostración grupal**  
*Fecha: Abril 21, 2026*  
*Estado: LISTO PARA DEMOSTRACIÓN EN VIVO*
