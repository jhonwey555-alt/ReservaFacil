# 🎬 GUIÓN DE DEMOSTRACIÓN EN VIVO - ReservaFácil

## ⏱ Duración estimada: 8-10 minutos

---

## ESCENA 1: PRESENTACIÓN INICIAL (1 min)

### Objetivo
Mostrar la interfaz principal y explicar la arquitectura del sistema.

### Acciones
1. **Muestra la pantalla completa de ReservaFácil**
   - Señala navbar con logo y buscador
   - Señala barra de categorías y filtros
   - Muestra split view (lista izquierda + mapa derecha)

2. **Explica el layout:**
   - "A la izquierda tenemos el listado de alojamientos"
   - "A la derecha, mapa interactivo de República Dominicana"
   - "Todo sincronizado en tiempo real"

### Puntos a mencionar
- 12 alojamientos diferentes
- 7 categorías de búsqueda
- Mapa con Leaflet/OpenStreetMap
- Ubicación real de cada propiedad

---

## ESCENA 2: BÚSQUEDA Y FILTRADO (2 min)

### Objetivo
Demostrar funcionalidad de búsqueda y filtros

### Acciones

#### Paso 1: BÚSQUEDA POR TEXTO
1. Haz click en lo buscador
2. Escribe: "punta" 
3. Presiona Enter
4. **Resultado esperado:** 
   - Se filtra a "Penthouse Vista Mar"
   - Mapa actualiza mostrando solo Punta Cana
   - Contador muestra "1 alojamientos"

`💬 Explica:` "El buscador busca en nombre y ubicación en tiempo real"

#### Paso 2: LIMPIAR Y FILTRAR POR CATEGORÍA
1. Haz click en logo "ReservaFácil" para limpiar
2. Haz click en botón categoría "🌊 Playa"
3. **Resultado esperado:**
   - Se filtran solo 2 alojamientos (Bungalow, Velero)
   - Mapa muestra marcadores en Boca Chica e Isla Saona
   - Contador: "2 alojamientos"

`💬 Explica:` "Las categorías usan emojis para fácil identificación visual"

#### Paso 3: FILTRO DE PRECIO
1. Haz click en botón "$150-300"
2. **Resultado esperado:**
   - Se filtra a solo "Bungalow Frente al Mar" ($245)
   - Velero ($520) desaparece (está en rango >$300)

`💬 Explica:` "Los filtros se combinan (categoría AND precio)"

#### Paso 4: ORDENAMIENTO
1. Cambia el dropdown a "Mejor valorado"
2. **Resultado esperado:**
   - Tarjeta se reorganiza por rating (de mayor a menor)

`💬 Explica:` "4 opciones: Recomendado, Mejor valorado, Precio ↑, Precio ↓"

#### Paso 5: FAVORITOS
1. Haz click en corazón vacío de la tarjeta (🤍)
2. **Resultado esperado:**
   - Corazón cambia a ❤️ rojo
   - Toast aparece: "Guardado en favoritos ❤️"
   - Contador en navbar cambia a (1)

`💬 Explica:` "Sistema de wishlist para guardar alojamientos preferidos"

---

## ESCENA 3: EXPLORACIÓN DE DETALLES (3 min)

### Objetivo
Mostrar panel de detalles y todas sus secciones

### Acciones

#### Paso 1: ABRIR PANEL DE DETALLES
1. Haz click en la tarjeta del "Bungalow Frente al Mar"
2. **Resultado esperado:**
   - Se abre panel derecho con animación slideR
   - Muestra imagen, nombre, ubicación, rating
   - Marcador en mapa se destaca

`💬 Explica:` "El panel aparece como modal deslizante desde la derecha"

#### Paso 2: MOSTRAR SECCIONES
1. Señala cada sección:
   - **Imagen hero** (160px, foto responsiva)
   - **Descripción:** "Abre la puerta y estás en la arena..."
   - **Estadísticas:** 👥 2 Huésp., 🛏 1 Cama, 🚿 1 Baño, 📐 55m²

`💬 Explica:` "Información completa del alojamiento organizada en secciones"

#### Paso 3: AMENIDADES
1. Scroll down en el panel
2. Muestra la sección "Incluye":
   - [Acceso directo playa] [Kayak] [Snorkeling] [WiFi] etc.

`💬 Explica:` "Amenities visualizadas como tags para fácil escaneo"

---

## ESCENA 4: SELECCIÓN DE FECHAS (2 min)

### Objetivo
Demostrar validación de calendario y selección de rangos

### Acciones

#### Paso 1: ABRIR CALENDARIO
1. Haz click en sección "Fechas" o en el área de fechas
2. **Resultado esperado:**
   - Se abre modal calendario "popIn"
   - Muestra mes/año actual (Abril 2026)
   - Botones ‹ › para navegar

`💬 Explica:` "Modal calendario con validación de fechas booked"

#### Paso 2: SELECCIONAR RANGO
1. Click en día 20 (entrada)
   - **Se marca en negro con borde izquierdo redondeado**
2. Click en día 25 (salida)
   - **Se marca en negro con borde derecho redondeado**
   - **Los días 21-24 se resaltan en gris (rango)**
3. **Contador muestra:** "5 noches seleccionadas"

`💬 Explica:` "Sistema de rangos visuales. Los días booked están deshabilitados (gris)"

#### Paso 3: VALIDACIONES
1. Intenta clickear día 10 (pasado)
   - **NO FUNCIONA:** Color gris, cursor not-allowed
2. Intenta clickear días 11-13 o 15-20 (booked)
   - **NO FUNCIONA:** Color gris, deshabilitados

`💬 Explica:` "Las fechas pasadas y booked están bloqueadas automáticamente"

#### Paso 4: CERRAR
1. Click en botón "Confirmar" (o "5 noches seleccionadas")
2. Modal se cierra
3. **En panel:**
   - Campos de fechas muestran: "20 Abr 2026" → "25 Abr 2026"
   - Desglose de precio aparece:
     ```
     $245 × 5 noches = $1,225
     Impuestos (18%) = $221
     Servicio (5%) = $61
     Total = $1,507
     ```

`💬 Explica:` "Cálculos automáticos en tiempo real. Impuestos 18% y servicio 5%"

---

## ESCENA 5: SELECTOR DE HUÉSPEDES (30 seg)

### Objetivo
Demostrar limitaciones y dinámicas de capacidad

### Acciones

1. Scroll down en panel
2. Muestra sección "HUÉSPEDES:"
3. Presiona botón [+] varias veces
   - **Sube de 1 → 2** (máx es 2 para este bungalow)
   - **No sube de 2** (límite de capacidad alcanzado)

`💬 Explica:` "El máximo de huéspedes está limitado por la capacidad de la propiedad"

---

## ESCENA 6: FORMULARIO DE CHECKOUT (2 min)

### Objetivo
Demostrar validaciones de formulario y dos pasos de checkout

### PASO A: ABRIR CHECKOUT
1. Click en botón "Reservar · $1,507"
2. **Resultado esperado:**
   - Se abre modal checkout con nivel zIndex alto
   - Muestra mini tarjeta del alojamiento
   - Tabla de presglose
   - Formulario personalizado

`💬 Explica:` "Interfaz de dos pasos para completar la reserva de forma segura"

---

### PASO B: SECCIÓN DATOS PERSONALES

#### Validación 1: NOMBRE (Obligatorio)
1. Intenta clickear "Confirmar" sin llenar
   - **Resultado:** Campo rodeado de rojo
   - **Mensaje error:** "Requerido" en rojo debajo
   - **Botón:** Deshabilitado gris

2. Escribe: "Juan Pérez"
   - **Resultado:** Borde vuelve a gris
   - Error desaparece

`💬 Explica:` "Validación de campo requerido con trim() y error visual"

#### Validación 2: EMAIL (Obligatorio - Regex)
1. Escribe email inválido: "juanmail"
   - **Sin @:** Error "Email inválido"
   - **Borde rojo**

2. Escribe: "juanmail@"
   - **Sin dominio:** Error "Email inválido"

3. Escribe: "juan@email.com"
   - **Válido:** Desaparece error, borde gris

`💬 Explica:` "Regex valida: usuario@dominio.extensión. Detecta caracteres especiales faltantes"

#### Validación 3: TELÉFONO (Opcional)
1. Escribe: "09"
   - **Menos de 7 caracteres:** Error "Inválido" si intenta confirmar

2. Escribe: "+1 (555) 123-4567"
   - **Válido:** Acepta formato con espacios y guiones

`💬 Explica:` "Teléfono es opcional pero si se llena, valida mínimo 7 dígitos"

#### HUÉSPEDES (Dropdown)
1. Abre dropdown
   - **Solo muestra:** 1, 2 (limitado por capacidad del bungalow)

`💬 Explica:` "Dropdown dinámico según capacidad de cada alojamiento"

---

### PASO C: MÉTODO DE PAGO

1. Clickea al botón "💳 Tarjeta"
   - **Resultado:** Se destaca (borde y fondo negro)
   - Aparecen 3 campos nuevos:
     - Número de tarjeta (19 caracteres max)
     - Vencimiento MM/AA (5 caracteres)
     - CVC (3 caracteres)

2. Clickea "🅿️ PayPal"
   - **Resultado:** Campos tarjeta desaparecen
   - PayPal está seleccionado

3. Vuelve a "💳 Tarjeta"

`💬 Explica:` "Método de pago dinámico. Tarjeta requiere datos adicionales, otros métodos no"

---

### PASO D: SOLICITUDES ESPECIALES

1. Click en textarea
2. Escribe: "Llegada después de las 19:00, por favor cama king"
3. Muestra cómo se redimensiona automáticamente

`💬 Explica:` "Campo libre para peticiones especiales del huésped"

---

### PASO E: VALIDACIÓN FINAL Y PASO 2

1. Click en "Confirmar · $1,507"
   - **Si hay errores:** No avanza
   - **Si todo valid:** Pasa a Paso 2

2. **PASO 2 Confirmación:**
   - Muestra icono grande ✦
   - Título: "Reserva confirmada"
   - Código único: "RF-XXXXX" (ej: RF-A7K2X)
   - Tabla con resumen:
     ```
     Alojamiento: Bungalow Frente al Mar
     Ubicación: Boca Chica
     Check-in: 20 Abr 2026
     Check-out: 25 Abr 2026
     Noches: 5
     Total: $1,507
     ```

`💬 Explica:` "Confirmación inmediata con código de referencia. Email enviado a la dirección registrada"

---

### PASO F: CIERRE
1. Click en "Explorar más alojamientos"
2. **Resultado:**
   - Modal se cierra
   - Vuelve a pantalla principal
   - Listado y filtros quedan limpios

`💬 Explica:` "Flujo completo: búsqueda → selección → reserva → confirmación"

---

## ESCENA 7: MAPA INTERACTIVO (1 min)

### Objetivo
Demostrar características del mapa

### Acciones

1. **Zoom and Pan:**
   - Zoom in/out con rueda mouse
   - Arrastra el mapa con mouse
   - Muestra República Dominicana completa

2. **Marcadores:**
   - Cada marcador muestra precio
   - Click en marcador = popup con info
   - Click en marcador = selecciona en lista

3. **Leyenda:**
   - Bottom-left: Información de colores (RD, Haití)
   - Símbolo $ con precio

`💬 Explica:` "Mapa real con Leaflet/OpenStreetMap. Sincronización bidireccional: click tarjeta → destaca marcador, click marcador → selecciona tarjeta"

---

## ESCENA 8: DIFERENTES CATEGORÍAS (30 seg)

### Objetivo
Demostrar variedad de alojamientos y categorías

### Acciones

1. **Click en "◆ Lujo"**
   - Muestra 3 alojamientos (Penthouse, Suite Coral, Suite Rooftop)
   - Precios altos ($310-480)

2. **Click en "◎ Playa"**
   - Muestra 2 alojamientos (Bungalow, Velero)
   - Vista marina destacada

3. **Click en "◉ Naturaleza"**
   - Muestra 3 alojamientos (Cabaña, Eco Nido, Casa Árbol)
   - Descripción de selva/montaña

`💬 Explica:` "Cada categoría agrupa alojamientos por tipo. Emojis hacen UI intuitiva"

---

## 🎯 RESUMEN FINAL (30 seg)

### Puntos principales a mencionar

✅ **Interfaz 1 - Búsqueda:**
- Buscador textual
- 7 categorías
- Filtro de precio
- Ordenamiento dinámico
- Contador de resultados

✅ **Interfaz 2 - Detalles:**
- Panel deslizante
- Imagen responsiva
- Amenities como tags
- Selector de fechas con validación
- Selector de huéspedes

✅ **Interfaz 3 - Checkout:**
- Formulario con 3 validaciones
- Método de pago dinámico
- Desglose de precio automático
- Confirmación de dos pasos
- Código de referencia único

✅ **Validaciones Implementadas:**
1. Fechas pasadas/booked bloqueadas
2. Nombre: no vacío (trim required)
3. Email: regex formato
4. Teléfono: regex con límites
5. Huéspedes: rango 1 a capacity
6. Botón CTA: habilitado solo si validaciones pasan

✅ **Tecnologías:**
- React 18 + TypeScript
- Leaflet Maps
- Vite
- CSS-in-JS

---

## 📊 CHECKLIST DE DEMOSTRACIÓN

- [ ] Pantalla principal cargada
- [ ] Navbar y buscador funcionales  
- [ ] Filtros por categoría cambios dinámicos
- [ ] Filtro de precio funcionando
- [ ] Ordenamiento aplicándose
- [ ] Tarjeta seleccionada se destaca
- [ ] Mapa mostrando marcadores
- [ ] Click en tarjeta abre panel detalles
- [ ] Click en marcador destaca en lista
- [ ] Calendario abre sin errors
- [ ] Fechas booked están bloqueadas
- [ ] Rango de fechas se visualiza
- [ ] Desglose de precio calcula automático
- [ ] Checkout abre modal
- [ ] Email valida regex
- [ ] Teléfono valida formato
- [ ] Método pago cambia campos dinámico
- [ ] Toast notificación favoritos funciona
- [ ] Confirmación muestra código RF-
- [ ] Flujo completo fin a fin OK

---

**TIPS PARA LA PRESENTACIÓN:**

1. **Habla lentamente** para que el auditorio siga los cambios
2. **Señala y comenta** cada sección mientras la explicas
3. **Interactúa** con todos los filtros para mostrar dinámico
4. **Prueba errores** a propósito (ej: email inválido)
5. **Muestra validaciones** en tiempo real
6. **Señala detalles** como animaciones, colores, feedback visual

---

*Generado para demostración grupal - 8-10 minutos*  
*Todas las funcionalidades probadas y validadas* ✓
