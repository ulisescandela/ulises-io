---
title: "Guía Completa para Aprender Lógica de Programación y Estructuras de Datos"
date: "2026-01-27"
excerpt: "Domina los fundamentos que separan a los buenos programadores de los excelentes. Una guía exhaustiva para aprender lógica de programación, algoritmos y estructuras de datos desde cero hasta nivel avanzado."
readTime: "25 min"
tags: ["Lógica de Programación", "Estructuras de Datos", "Algoritmos", "Fundamentos", "Guía Completa", "2026"]
published: true
coverImage: ""
---

Puedes aprender React, Django, Kubernetes y todas las tecnologías de moda. Pero si no dominas la lógica de programación y las estructuras de datos, siempre vas a tener un techo invisible que te impide crecer. Es como querer construir un rascacielos sin entender los cimientos.

He visto desarrolladores con años de experiencia que no pueden resolver un problema básico de algoritmos en una entrevista. También he visto juniors que, con fundamentos sólidos, superan a seniors en resolución de problemas. La diferencia no está en cuántos frameworks conoces, sino en qué tan bien piensas.

Este artículo es la guía que me hubiera gustado tener cuando empecé. Vamos desde cero hasta estructuras avanzadas, con ejercicios prácticos y una ruta clara.

---

## Por qué esto importa más que cualquier framework

Déjame ser directo: las tecnologías cambian, los fundamentos no.

React podría ser reemplazado en 5 años. Python podría dejar de ser el favorito. Pero los árboles binarios, la recursión y la complejidad algorítmica van a seguir siendo relevantes en 50 años. Son el lenguaje universal de la programación.

### Beneficios concretos de dominar estos fundamentos

1. **Entrevistas técnicas:** La mayoría de empresas top (y cada vez más empresas medianas) evalúan estructuras de datos y algoritmos. No importa si aplicas para frontend, backend o DevOps.

2. **Resolución de problemas:** Cuando enfrentas un bug complejo o diseñas un sistema, tu capacidad de descomponer problemas y elegir la estructura correcta marca la diferencia.

3. **Código eficiente:** Entender Big O te permite escribir código que escala. La diferencia entre O(n) y O(n²) puede ser la diferencia entre una app que funciona y una que colapsa.

4. **Comunicación técnica:** Poder hablar de trade-offs entre estructuras te posiciona como alguien senior, aunque tengas poca experiencia.

5. **Aprender nuevos lenguajes:** Cuando entiendes la lógica subyacente, aprender un nuevo lenguaje es solo cuestión de sintaxis.

---

## Parte 1: Lógica de Programación

Antes de estructuras de datos, necesitas pensar como programador. Esto significa descomponer problemas en pasos, entender flujos de control y desarrollar el "músculo" del pensamiento lógico.

### 1.1 Pensamiento Algorítmico

Un algoritmo es simplemente una secuencia de pasos para resolver un problema. Antes de escribir código, deberías poder explicar la solución en español.

**Ejercicio mental:** Antes de codificar cualquier problema, escríbelo en pseudocódigo o en tu idioma natural. Si no puedes explicarlo en palabras, no podrás explicárselo a la computadora.

#### Los 4 pasos del pensamiento algorítmico

1. **Entender el problema:** ¿Cuál es el input? ¿Cuál es el output esperado? ¿Cuáles son las restricciones?
2. **Descomponer:** Divide el problema grande en subproblemas más pequeños
3. **Encontrar patrones:** ¿He visto algo similar antes? ¿Hay repetición?
4. **Abstraer:** ¿Puedo generalizar la solución para casos similares?

**Ejemplo práctico:**

*Problema:* Determinar si un año es bisiesto.

*Paso 1 - Entender:*
- Input: Un número entero (año)
- Output: Verdadero o falso
- Reglas: Es bisiesto si es divisible por 4, EXCEPTO los divisibles por 100, A MENOS que también sean divisibles por 400

*Paso 2 - Descomponer:*
- Verificar divisibilidad por 400
- Verificar divisibilidad por 100
- Verificar divisibilidad por 4
- Combinar las condiciones

*Paso 3 - Patrón:*
- Es un problema de condiciones anidadas
- Hay excepciones a las reglas

*Paso 4 - Pseudocódigo:*
```
SI año es divisible por 400:
    RETORNAR verdadero
SI año es divisible por 100:
    RETORNAR falso
SI año es divisible por 4:
    RETORNAR verdadero
RETORNAR falso
```

### 1.2 Variables y Tipos de Datos

Las variables son cajas donde guardas información. Los tipos de datos definen qué tipo de información puede ir en cada caja.

#### Tipos primitivos fundamentales

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Entero (int)** | Números sin decimales | 42, -17, 0 |
| **Flotante (float)** | Números con decimales | 3.14, -0.001 |
| **Cadena (string)** | Texto | "Hola mundo" |
| **Booleano (bool)** | Verdadero o falso | true, false |
| **Nulo (null/None)** | Ausencia de valor | null, None |

#### Buenas prácticas con variables

1. **Nombres descriptivos:** `precioTotal` es mejor que `pt` o `x`
2. **CamelCase o snake_case:** Sé consistente (`precioTotal` o `precio_total`)
3. **Constantes en MAYÚSCULAS:** `MAX_INTENTOS = 3`
4. **Evita números mágicos:** En vez de `if intentos > 3`, usa `if intentos > MAX_INTENTOS`

### 1.3 Operadores

Los operadores manipulan datos. Dominarlos es esencial.

#### Operadores aritméticos
```
+   Suma
-   Resta  
*   Multiplicación
/   División
%   Módulo (resto de división)
**  Potencia
//  División entera (en Python)
```

#### Operadores de comparación
```
==  Igual a
!=  Diferente de
>   Mayor que
<   Menor que
>=  Mayor o igual
<=  Menor o igual
```

#### Operadores lógicos
```
AND (&&)  - Verdadero si AMBOS son verdaderos
OR (||)   - Verdadero si AL MENOS UNO es verdadero
NOT (!)   - Invierte el valor booleano
```

**Tabla de verdad importante:**

| A | B | A AND B | A OR B | NOT A |
|---|---|---------|--------|-------|
| V | V | V | V | F |
| V | F | F | V | F |
| F | V | F | V | V |
| F | F | F | F | V |

### 1.4 Estructuras de Control

#### Condicionales (if/else)

Los condicionales permiten que tu programa tome decisiones.

```python
# Estructura básica
if condicion:
    # código si es verdadero
elif otra_condicion:
    # código si la primera es falsa pero esta es verdadera
else:
    # código si todas son falsas
```

**Ejemplo completo - Sistema de calificaciones:**

```python
def obtener_calificacion(nota):
    if nota >= 90:
        return "A - Excelente"
    elif nota >= 80:
        return "B - Muy bien"
    elif nota >= 70:
        return "C - Bien"
    elif nota >= 60:
        return "D - Suficiente"
    else:
        return "F - Reprobado"

# Pruebas
print(obtener_calificacion(95))  # A - Excelente
print(obtener_calificacion(73))  # C - Bien
print(obtener_calificacion(45))  # F - Reprobado
```

#### Bucles (loops)

Los bucles repiten código hasta que una condición se cumple (o deja de cumplirse).

**Bucle for** - Cuando sabes cuántas veces iterar:

```python
# Iterar sobre un rango
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Iterar sobre una lista
frutas = ["manzana", "banana", "naranja"]
for fruta in frutas:
    print(fruta)

# Con índice
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")
```

**Bucle while** - Cuando no sabes cuántas iteraciones necesitas:

```python
# Ejemplo: encontrar el primer número divisible por 7 mayor a 100
numero = 101
while numero % 7 != 0:
    numero += 1
print(f"Encontrado: {numero}")  # 105
```

**Controles de bucle:**

```python
# break - Sale del bucle completamente
for i in range(100):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - Salta a la siguiente iteración
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4
```

### 1.5 Funciones

Las funciones encapsulan lógica reutilizable. Son fundamentales para escribir código limpio.

#### Anatomía de una función

```python
def nombre_funcion(parametro1, parametro2="valor_default"):
    """
    Docstring: describe qué hace la función
    
    Args:
        parametro1: descripción
        parametro2: descripción (opcional)
    
    Returns:
        descripción de lo que retorna
    """
    # Cuerpo de la función
    resultado = parametro1 + parametro2
    return resultado
```

#### Principios para buenas funciones

1. **Una función, una responsabilidad:** Si tu función hace muchas cosas, divídela
2. **Nombres verbales:** `calcular_impuesto()`, `validar_email()`, `obtener_usuario()`
3. **Parámetros limitados:** Más de 3-4 parámetros es señal de que algo está mal
4. **Evita efectos secundarios:** Una función idealmente recibe inputs y retorna outputs, sin modificar estado externo
5. **Retorna temprano:** Valida al inicio y retorna errores pronto

**Ejemplo - Función bien diseñada:**

```python
def calcular_descuento(precio, porcentaje_descuento, es_cliente_premium=False):
    """
    Calcula el precio final después de aplicar descuento.
    
    Args:
        precio: Precio original del producto
        porcentaje_descuento: Descuento a aplicar (0-100)
        es_cliente_premium: Si es premium, obtiene 5% adicional
    
    Returns:
        Precio final con descuento aplicado
    """
    # Validaciones tempranas
    if precio < 0:
        raise ValueError("El precio no puede ser negativo")
    if not 0 <= porcentaje_descuento <= 100:
        raise ValueError("El descuento debe estar entre 0 y 100")
    
    # Cálculo
    descuento_total = porcentaje_descuento
    if es_cliente_premium:
        descuento_total += 5
    
    descuento_total = min(descuento_total, 100)  # Máximo 100%
    precio_final = precio * (1 - descuento_total / 100)
    
    return round(precio_final, 2)
```

### 1.6 Recursión

La recursión es cuando una función se llama a sí misma. Es elegante para ciertos problemas, pero requiere cuidado.

#### Componentes de toda función recursiva

1. **Caso base:** Condición que detiene la recursión
2. **Caso recursivo:** La función se llama con un problema más pequeño
3. **Progreso hacia el caso base:** Cada llamada debe acercarse al caso base

**Ejemplo clásico - Factorial:**

```python
def factorial(n):
    # Caso base
    if n <= 1:
        return 1
    # Caso recursivo
    return n * factorial(n - 1)

# factorial(5) = 5 * factorial(4)
#              = 5 * 4 * factorial(3)
#              = 5 * 4 * 3 * factorial(2)
#              = 5 * 4 * 3 * 2 * factorial(1)
#              = 5 * 4 * 3 * 2 * 1
#              = 120
```

**Ejemplo - Fibonacci:**

```python
# Versión recursiva simple (ineficiente)
def fibonacci_recursivo(n):
    if n <= 1:
        return n
    return fibonacci_recursivo(n - 1) + fibonacci_recursivo(n - 2)

# Versión con memoización (eficiente)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]
```

#### Cuándo usar recursión

✅ **Úsala cuando:**
- El problema tiene estructura recursiva natural (árboles, grafos)
- La solución iterativa sería muy compleja
- Estás dividiendo un problema en subproblemas idénticos más pequeños

❌ **Evítala cuando:**
- Una solución iterativa simple existe
- La profundidad de recursión puede ser muy grande (stack overflow)
- El rendimiento es crítico y no puedes memoizar

---

## Parte 2: Estructuras de Datos Fundamentales

Ahora que piensas como programador, necesitas saber dónde y cómo guardar tus datos. La estructura correcta puede hacer tu código 1000x más rápido.

### 2.1 Arrays (Arreglos/Listas)

El array es la estructura más básica y más usada. Es una colección ordenada de elementos.

#### Características

- **Acceso por índice:** O(1) - instantáneo
- **Búsqueda:** O(n) - hay que recorrer todo en el peor caso
- **Inserción al final:** O(1) amortizado
- **Inserción al inicio/medio:** O(n) - hay que mover elementos

#### Operaciones comunes

```python
# Creación
lista = [1, 2, 3, 4, 5]
lista_vacia = []

# Acceso
primer_elemento = lista[0]      # 1
ultimo_elemento = lista[-1]     # 5
sublista = lista[1:3]           # [2, 3]

# Modificación
lista[0] = 10                   # [10, 2, 3, 4, 5]
lista.append(6)                 # [10, 2, 3, 4, 5, 6]
lista.insert(0, 0)              # [0, 10, 2, 3, 4, 5, 6]
lista.extend([7, 8])            # [0, 10, 2, 3, 4, 5, 6, 7, 8]

# Eliminación
lista.pop()                     # Elimina y retorna el último
lista.pop(0)                    # Elimina y retorna el primero
lista.remove(10)                # Elimina la primera ocurrencia de 10

# Búsqueda
if 3 in lista:
    indice = lista.index(3)

# Ordenamiento
lista.sort()                    # Ordena in-place
lista_ordenada = sorted(lista)  # Retorna nueva lista ordenada

# Longitud
tamaño = len(lista)
```

#### Técnicas importantes con arrays

**Two Pointers (Dos punteros):**

Útil para problemas que involucran pares o búsqueda en arrays ordenados.

```python
def dos_suma_ordenada(nums, target):
    """
    Encuentra dos números que sumen target en array ordenado.
    """
    izquierda = 0
    derecha = len(nums) - 1
    
    while izquierda < derecha:
        suma_actual = nums[izquierda] + nums[derecha]
        if suma_actual == target:
            return [izquierda, derecha]
        elif suma_actual < target:
            izquierda += 1
        else:
            derecha -= 1
    
    return None
```

**Sliding Window (Ventana deslizante):**

Para problemas de subarrays contiguos.

```python
def max_suma_subarray(nums, k):
    """
    Encuentra la suma máxima de un subarray de tamaño k.
    """
    if len(nums) < k:
        return None
    
    # Suma de la primera ventana
    suma_ventana = sum(nums[:k])
    max_suma = suma_ventana
    
    # Deslizar la ventana
    for i in range(k, len(nums)):
        suma_ventana += nums[i] - nums[i - k]
        max_suma = max(max_suma, suma_ventana)
    
    return max_suma
```

### 2.2 Strings (Cadenas)

Los strings son arrays de caracteres con operaciones especiales.

#### Operaciones esenciales

```python
texto = "Hola Mundo"

# Acceso
print(texto[0])         # 'H'
print(texto[-1])        # 'o'
print(texto[0:4])       # 'Hola'

# Inmutabilidad - los strings no se modifican in-place
# texto[0] = 'h'        # ¡Error!
texto = 'h' + texto[1:] # Crear nuevo string

# Métodos útiles
texto.lower()           # 'hola mundo'
texto.upper()           # 'HOLA MUNDO'
texto.strip()           # Elimina espacios al inicio/fin
texto.split(' ')        # ['Hola', 'Mundo']
' '.join(['Hola', 'Mundo'])  # 'Hola Mundo'
texto.replace('Mundo', 'Python')  # 'Hola Python'
texto.find('Mundo')     # 5 (índice donde empieza)
texto.count('o')        # 2

# Verificaciones
texto.startswith('Hola')    # True
texto.endswith('Mundo')     # True
texto.isalpha()             # False (tiene espacio)
texto.isdigit()             # False
'mundo' in texto.lower()    # True
```

#### Problema clásico - Palíndromo

```python
def es_palindromo(texto):
    """
    Verifica si un texto es palíndromo (ignora espacios y mayúsculas).
    """
    # Limpiar texto
    limpio = ''.join(c.lower() for c in texto if c.isalnum())
    
    # Comparar con su reverso
    return limpio == limpio[::-1]

# Alternativa con dos punteros
def es_palindromo_punteros(texto):
    limpio = ''.join(c.lower() for c in texto if c.isalnum())
    izq, der = 0, len(limpio) - 1
    
    while izq < der:
        if limpio[izq] != limpio[der]:
            return False
        izq += 1
        der -= 1
    
    return True
```

### 2.3 Hash Tables (Diccionarios/Mapas)

La estructura más versátil. Almacena pares clave-valor con acceso O(1).

#### Características

- **Acceso por clave:** O(1) promedio
- **Inserción:** O(1) promedio
- **Eliminación:** O(1) promedio
- **No ordenado:** Las claves no tienen orden garantizado

#### Operaciones fundamentales

```python
# Creación
diccionario = {}
diccionario = {'nombre': 'Juan', 'edad': 25}
diccionario = dict(nombre='Juan', edad=25)

# Acceso
nombre = diccionario['nombre']          # 'Juan'
nombre = diccionario.get('nombre')      # 'Juan'
nombre = diccionario.get('apellido', 'No existe')  # 'No existe'

# Modificación
diccionario['edad'] = 26                # Actualiza
diccionario['ciudad'] = 'Madrid'        # Agrega nuevo

# Eliminación
del diccionario['ciudad']
valor = diccionario.pop('edad')         # Elimina y retorna

# Verificación
if 'nombre' in diccionario:
    print("Existe")

# Iteración
for clave in diccionario:
    print(clave)

for clave, valor in diccionario.items():
    print(f"{clave}: {valor}")

for valor in diccionario.values():
    print(valor)

# Métodos útiles
claves = list(diccionario.keys())
valores = list(diccionario.values())
items = list(diccionario.items())
```

#### Aplicaciones comunes

**Contar frecuencias:**

```python
def contar_caracteres(texto):
    frecuencias = {}
    for char in texto:
        frecuencias[char] = frecuencias.get(char, 0) + 1
    return frecuencias

# Con Counter (más pythónico)
from collections import Counter
frecuencias = Counter("hola mundo")  # {'o': 2, 'h': 1, ...}
```

**Two Sum (problema clásico de entrevistas):**

```python
def two_sum(nums, target):
    """
    Encuentra dos índices cuya suma sea target.
    """
    vistos = {}  # valor -> índice
    
    for i, num in enumerate(nums):
        complemento = target - num
        if complemento in vistos:
            return [vistos[complemento], i]
        vistos[num] = i
    
    return None
```

**Agrupar anagramas:**

```python
def agrupar_anagramas(palabras):
    """
    Agrupa palabras que son anagramas entre sí.
    """
    grupos = {}
    
    for palabra in palabras:
        clave = ''.join(sorted(palabra))
        if clave not in grupos:
            grupos[clave] = []
        grupos[clave].append(palabra)
    
    return list(grupos.values())

# Ejemplo
palabras = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(agrupar_anagramas(palabras))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

### 2.4 Sets (Conjuntos)

Un set es como un diccionario pero solo con claves (sin valores). Elementos únicos, sin orden.

#### Características

- **Elementos únicos:** No hay duplicados
- **Verificación de pertenencia:** O(1)
- **Inserción/Eliminación:** O(1) promedio
- **Sin índices:** No puedes acceder por posición

#### Operaciones

```python
# Creación
conjunto = {1, 2, 3}
conjunto = set([1, 2, 2, 3])  # {1, 2, 3} - duplicados eliminados
conjunto_vacio = set()        # {} crea diccionario, no set

# Modificación
conjunto.add(4)
conjunto.remove(4)      # Error si no existe
conjunto.discard(4)     # No error si no existe
conjunto.pop()          # Elimina elemento aleatorio

# Verificación
if 2 in conjunto:
    print("Existe")

# Operaciones de conjuntos
a = {1, 2, 3}
b = {2, 3, 4}

union = a | b           # {1, 2, 3, 4}
interseccion = a & b    # {2, 3}
diferencia = a - b      # {1}
dif_simetrica = a ^ b   # {1, 4}

# Verificaciones
a.issubset(b)           # ¿a es subconjunto de b?
a.issuperset(b)         # ¿a es superconjunto de b?
a.isdisjoint(b)         # ¿No tienen elementos en común?
```

#### Aplicación - Encontrar duplicados

```python
def tiene_duplicados(lista):
    return len(lista) != len(set(lista))

def encontrar_duplicados(lista):
    vistos = set()
    duplicados = set()
    
    for elemento in lista:
        if elemento in vistos:
            duplicados.add(elemento)
        vistos.add(elemento)
    
    return list(duplicados)
```

### 2.5 Stacks (Pilas)

LIFO: Last In, First Out. El último que entra es el primero que sale.

#### Operaciones fundamentales

```python
# En Python, usamos lista como stack
stack = []

# Push - agregar al tope
stack.append(1)
stack.append(2)
stack.append(3)

# Pop - remover del tope
elemento = stack.pop()  # 3

# Peek - ver el tope sin remover
tope = stack[-1]        # 2

# Verificar si está vacío
esta_vacio = len(stack) == 0
```

#### Aplicaciones clásicas

**Verificar paréntesis balanceados:**

```python
def parentesis_validos(s):
    """
    Verifica si los paréntesis/brackets están balanceados.
    """
    stack = []
    pares = {')': '(', ']': '[', '}': '{'}
    
    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pares[char]:
                return False
            stack.pop()
    
    return len(stack) == 0

# Ejemplos
print(parentesis_validos("()[]{}"))     # True
print(parentesis_validos("([)]"))       # False
print(parentesis_validos("{[]}"))       # True
```

**Evaluar notación polaca inversa:**

```python
def evaluar_rpn(tokens):
    """
    Evalúa expresión en notación polaca inversa.
    Ejemplo: ["2", "1", "+", "3", "*"] = (2 + 1) * 3 = 9
    """
    stack = []
    operadores = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b)  # División entera hacia cero
    }
    
    for token in tokens:
        if token in operadores:
            b = stack.pop()
            a = stack.pop()
            resultado = operadores[token](a, b)
            stack.append(resultado)
        else:
            stack.append(int(token))
    
    return stack[0]
```

### 2.6 Queues (Colas)

FIFO: First In, First Out. El primero que entra es el primero que sale.

#### Implementación

```python
from collections import deque

# Crear cola
cola = deque()

# Enqueue - agregar al final
cola.append(1)
cola.append(2)
cola.append(3)

# Dequeue - remover del frente
elemento = cola.popleft()  # 1

# Peek - ver el frente sin remover
frente = cola[0]           # 2

# Verificar si está vacía
esta_vacia = len(cola) == 0
```

#### Aplicación - BFS (Búsqueda en anchura)

```python
def bfs_matriz(matriz, inicio, fin):
    """
    Encuentra el camino más corto en una matriz.
    """
    filas, cols = len(matriz), len(matriz[0])
    cola = deque([(inicio, 0)])  # (posición, distancia)
    visitados = {inicio}
    
    direcciones = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    while cola:
        (fila, col), distancia = cola.popleft()
        
        if (fila, col) == fin:
            return distancia
        
        for df, dc in direcciones:
            nf, nc = fila + df, col + dc
            if (0 <= nf < filas and 0 <= nc < cols and 
                (nf, nc) not in visitados and 
                matriz[nf][nc] != 1):  # 1 = obstáculo
                
                visitados.add((nf, nc))
                cola.append(((nf, nc), distancia + 1))
    
    return -1  # No hay camino
```

### 2.7 Linked Lists (Listas Enlazadas)

Una secuencia de nodos donde cada nodo apunta al siguiente.

#### Implementación básica

```python
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None
    
    def agregar_al_final(self, valor):
        nuevo = Nodo(valor)
        if not self.cabeza:
            self.cabeza = nuevo
            return
        
        actual = self.cabeza
        while actual.siguiente:
            actual = actual.siguiente
        actual.siguiente = nuevo
    
    def agregar_al_inicio(self, valor):
        nuevo = Nodo(valor)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo
    
    def eliminar(self, valor):
        if not self.cabeza:
            return
        
        if self.cabeza.valor == valor:
            self.cabeza = self.cabeza.siguiente
            return
        
        actual = self.cabeza
        while actual.siguiente:
            if actual.siguiente.valor == valor:
                actual.siguiente = actual.siguiente.siguiente
                return
            actual = actual.siguiente
    
    def buscar(self, valor):
        actual = self.cabeza
        while actual:
            if actual.valor == valor:
                return True
            actual = actual.siguiente
        return False
    
    def imprimir(self):
        actual = self.cabeza
        elementos = []
        while actual:
            elementos.append(str(actual.valor))
            actual = actual.siguiente
        print(" -> ".join(elementos))
```

#### Problema clásico - Detectar ciclo

```python
def tiene_ciclo(cabeza):
    """
    Detecta si una lista enlazada tiene ciclo usando Floyd's algorithm.
    """
    if not cabeza or not cabeza.siguiente:
        return False
    
    lento = cabeza
    rapido = cabeza
    
    while rapido and rapido.siguiente:
        lento = lento.siguiente
        rapido = rapido.siguiente.siguiente
        
        if lento == rapido:
            return True
    
    return False
```

**Invertir lista enlazada:**

```python
def invertir_lista(cabeza):
    """
    Invierte una lista enlazada in-place.
    """
    previo = None
    actual = cabeza
    
    while actual:
        siguiente = actual.siguiente
        actual.siguiente = previo
        previo = actual
        actual = siguiente
    
    return previo
```

---

## Parte 3: Estructuras de Datos Avanzadas

Estas estructuras son menos comunes en código del día a día, pero esenciales para resolver problemas complejos y entrevistas en empresas top.

### 3.1 Árboles Binarios

Estructura jerárquica donde cada nodo tiene máximo dos hijos.

#### Implementación

```python
class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

class ArbolBinario:
    def __init__(self):
        self.raiz = None
    
    def insertar(self, valor):
        if not self.raiz:
            self.raiz = NodoArbol(valor)
        else:
            self._insertar_recursivo(self.raiz, valor)
    
    def _insertar_recursivo(self, nodo, valor):
        if valor < nodo.valor:
            if nodo.izquierdo:
                self._insertar_recursivo(nodo.izquierdo, valor)
            else:
                nodo.izquierdo = NodoArbol(valor)
        else:
            if nodo.derecho:
                self._insertar_recursivo(nodo.derecho, valor)
            else:
                nodo.derecho = NodoArbol(valor)
```

#### Recorridos fundamentales

```python
def inorder(nodo, resultado=None):
    """Izquierdo -> Raíz -> Derecho"""
    if resultado is None:
        resultado = []
    if nodo:
        inorder(nodo.izquierdo, resultado)
        resultado.append(nodo.valor)
        inorder(nodo.derecho, resultado)
    return resultado

def preorder(nodo, resultado=None):
    """Raíz -> Izquierdo -> Derecho"""
    if resultado is None:
        resultado = []
    if nodo:
        resultado.append(nodo.valor)
        preorder(nodo.izquierdo, resultado)
        preorder(nodo.derecho, resultado)
    return resultado

def postorder(nodo, resultado=None):
    """Izquierdo -> Derecho -> Raíz"""
    if resultado is None:
        resultado = []
    if nodo:
        postorder(nodo.izquierdo, resultado)
        postorder(nodo.derecho, resultado)
        resultado.append(nodo.valor)
    return resultado

def level_order(raiz):
    """Recorrido por niveles (BFS)"""
    if not raiz:
        return []
    
    resultado = []
    cola = deque([raiz])
    
    while cola:
        nivel = []
        for _ in range(len(cola)):
            nodo = cola.popleft()
            nivel.append(nodo.valor)
            if nodo.izquierdo:
                cola.append(nodo.izquierdo)
            if nodo.derecho:
                cola.append(nodo.derecho)
        resultado.append(nivel)
    
    return resultado
```

#### Problemas comunes de árboles

**Altura del árbol:**

```python
def altura(nodo):
    if not nodo:
        return 0
    return 1 + max(altura(nodo.izquierdo), altura(nodo.derecho))
```

**Verificar si es BST válido:**

```python
def es_bst_valido(nodo, minimo=float('-inf'), maximo=float('inf')):
    if not nodo:
        return True
    
    if nodo.valor <= minimo or nodo.valor >= maximo:
        return False
    
    return (es_bst_valido(nodo.izquierdo, minimo, nodo.valor) and
            es_bst_valido(nodo.derecho, nodo.valor, maximo))
```

**Ancestro común más bajo (LCA):**

```python
def lca(raiz, p, q):
    """
    Encuentra el ancestro común más bajo de dos nodos.
    """
    if not raiz or raiz == p or raiz == q:
        return raiz
    
    izq = lca(raiz.izquierdo, p, q)
    der = lca(raiz.derecho, p, q)
    
    if izq and der:
        return raiz
    return izq or der
```

### 3.2 Heaps (Montículos)

Árbol binario especial que mantiene el mínimo (o máximo) siempre en la raíz.

#### Uso en Python

```python
import heapq

# Min heap (por defecto en Python)
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)

minimo = heapq.heappop(heap)  # 1

# Ver mínimo sin remover
minimo = heap[0]

# Crear heap desde lista
numeros = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(numeros)  # O(n)

# Max heap (truco: negar valores)
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
maximo = -heapq.heappop(max_heap)  # 3

# K elementos más grandes
k_mayores = heapq.nlargest(3, numeros)
k_menores = heapq.nsmallest(3, numeros)
```

#### Aplicación - Mediana de stream de datos

```python
class MedianFinder:
    def __init__(self):
        self.pequeños = []  # Max heap (mitad menor)
        self.grandes = []   # Min heap (mitad mayor)
    
    def agregar(self, num):
        # Agregar a max heap (negamos para simular)
        heapq.heappush(self.pequeños, -num)
        
        # Mover el mayor de pequeños a grandes
        heapq.heappush(self.grandes, -heapq.heappop(self.pequeños))
        
        # Balancear: pequeños puede tener 1 más que grandes
        if len(self.grandes) > len(self.pequeños):
            heapq.heappush(self.pequeños, -heapq.heappop(self.grandes))
    
    def mediana(self):
        if len(self.pequeños) > len(self.grandes):
            return -self.pequeños[0]
        return (-self.pequeños[0] + self.grandes[0]) / 2
```

### 3.3 Grafos

Conjunto de nodos conectados por aristas. Pueden ser dirigidos o no dirigidos.

#### Representaciones

```python
# Lista de adyacencia (más común y eficiente)
grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# Con pesos
grafo_pesos = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('D', 3)],
    'C': [('A', 2), ('D', 1)],
    'D': [('B', 3), ('C', 1)]
}

# Matriz de adyacencia (útil para grafos densos)
#     A  B  C  D
# A [[0, 1, 1, 0],
# B  [1, 0, 0, 1],
# C  [1, 0, 0, 1],
# D  [0, 1, 1, 0]]
```

#### Algoritmos fundamentales

**DFS (Búsqueda en profundidad):**

```python
def dfs(grafo, inicio, visitados=None):
    if visitados is None:
        visitados = set()
    
    visitados.add(inicio)
    print(inicio)  # Procesar nodo
    
    for vecino in grafo[inicio]:
        if vecino not in visitados:
            dfs(grafo, vecino, visitados)
    
    return visitados

# Versión iterativa con stack
def dfs_iterativo(grafo, inicio):
    visitados = set()
    stack = [inicio]
    
    while stack:
        nodo = stack.pop()
        if nodo not in visitados:
            visitados.add(nodo)
            print(nodo)
            for vecino in grafo[nodo]:
                if vecino not in visitados:
                    stack.append(vecino)
    
    return visitados
```

**BFS (Búsqueda en anchura):**

```python
def bfs(grafo, inicio):
    visitados = set([inicio])
    cola = deque([inicio])
    
    while cola:
        nodo = cola.popleft()
        print(nodo)
        
        for vecino in grafo[nodo]:
            if vecino not in visitados:
                visitados.add(vecino)
                cola.append(vecino)
    
    return visitados
```

**Dijkstra (camino más corto):**

```python
def dijkstra(grafo, inicio):
    """
    Encuentra el camino más corto desde inicio a todos los nodos.
    grafo: diccionario con listas de tuplas (vecino, peso)
    """
    distancias = {nodo: float('inf') for nodo in grafo}
    distancias[inicio] = 0
    
    heap = [(0, inicio)]  # (distancia, nodo)
    visitados = set()
    
    while heap:
        dist_actual, nodo = heapq.heappop(heap)
        
        if nodo in visitados:
            continue
        visitados.add(nodo)
        
        for vecino, peso in grafo[nodo]:
            if vecino not in visitados:
                nueva_dist = dist_actual + peso
                if nueva_dist < distancias[vecino]:
                    distancias[vecino] = nueva_dist
                    heapq.heappush(heap, (nueva_dist, vecino))
    
    return distancias
```

**Detectar ciclo en grafo dirigido:**

```python
def tiene_ciclo_dirigido(grafo):
    """
    Detecta ciclo usando coloración: 
    0 = blanco (no visitado), 1 = gris (en proceso), 2 = negro (terminado)
    """
    colores = {nodo: 0 for nodo in grafo}
    
    def dfs(nodo):
        colores[nodo] = 1  # Gris
        
        for vecino in grafo.get(nodo, []):
            if colores[vecino] == 1:  # Encontramos un gris -> ciclo
                return True
            if colores[vecino] == 0 and dfs(vecino):
                return True
        
        colores[nodo] = 2  # Negro
        return False
    
    for nodo in grafo:
        if colores[nodo] == 0:
            if dfs(nodo):
                return True
    
    return False
```

### 3.4 Tries (Árboles de Prefijos)

Estructura optimizada para almacenar y buscar strings por prefijos.

```python
class TrieNode:
    def __init__(self):
        self.hijos = {}
        self.es_fin_palabra = False

class Trie:
    def __init__(self):
        self.raiz = TrieNode()
    
    def insertar(self, palabra):
        nodo = self.raiz
        for char in palabra:
            if char not in nodo.hijos:
                nodo.hijos[char] = TrieNode()
            nodo = nodo.hijos[char]
        nodo.es_fin_palabra = True
    
    def buscar(self, palabra):
        nodo = self._buscar_prefijo(palabra)
        return nodo is not None and nodo.es_fin_palabra
    
    def empieza_con(self, prefijo):
        return self._buscar_prefijo(prefijo) is not None
    
    def _buscar_prefijo(self, prefijo):
        nodo = self.raiz
        for char in prefijo:
            if char not in nodo.hijos:
                return None
            nodo = nodo.hijos[char]
        return nodo
    
    def autocomplete(self, prefijo):
        """Retorna todas las palabras que empiezan con el prefijo."""
        nodo = self._buscar_prefijo(prefijo)
        if not nodo:
            return []
        
        resultados = []
        self._dfs_palabras(nodo, prefijo, resultados)
        return resultados
    
    def _dfs_palabras(self, nodo, prefijo_actual, resultados):
        if nodo.es_fin_palabra:
            resultados.append(prefijo_actual)
        
        for char, hijo in nodo.hijos.items():
            self._dfs_palabras(hijo, prefijo_actual + char, resultados)
```

---

## Parte 4: Complejidad Algorítmica (Big O)

Entender Big O es lo que separa a alguien que "hace código" de alguien que entiende lo que hace.

### 4.1 ¿Qué es Big O?

Big O describe cómo escala un algoritmo cuando el input crece. No mide tiempo exacto, sino **cómo crece** el tiempo/espacio con inputs más grandes.

### 4.2 Complejidades comunes

| Notación | Nombre | Ejemplo |
|----------|--------|---------|
| O(1) | Constante | Acceso a array por índice |
| O(log n) | Logarítmica | Búsqueda binaria |
| O(n) | Lineal | Recorrer array |
| O(n log n) | Linearítmica | Merge sort, quick sort |
| O(n²) | Cuadrática | Dos loops anidados |
| O(2ⁿ) | Exponencial | Fibonacci recursivo sin memo |
| O(n!) | Factorial | Permutaciones |

### 4.3 Cómo calcular Big O

**Reglas básicas:**

1. **Ignora constantes:** O(2n) = O(n)
2. **Ignora términos menores:** O(n² + n) = O(n²)
3. **Loops anidados multiplican:** Loop dentro de loop = O(n × m)
4. **Loops secuenciales suman:** Loop seguido de loop = O(n + m) = O(n)

**Ejemplos prácticos:**

```python
# O(1) - Constante
def obtener_primero(lista):
    return lista[0]

# O(n) - Lineal
def sumar_todos(lista):
    total = 0
    for num in lista:      # n iteraciones
        total += num       # O(1) por iteración
    return total

# O(n²) - Cuadrática
def encontrar_pares(lista):
    pares = []
    for i in range(len(lista)):       # n iteraciones
        for j in range(len(lista)):   # n iteraciones por cada i
            pares.append((lista[i], lista[j]))
    return pares

# O(log n) - Logarítmica
def busqueda_binaria(lista, objetivo):
    izq, der = 0, len(lista) - 1
    while izq <= der:           # Se divide a la mitad cada vez
        mid = (izq + der) // 2
        if lista[mid] == objetivo:
            return mid
        elif lista[mid] < objetivo:
            izq = mid + 1
        else:
            der = mid - 1
    return -1

# O(n log n) - Linearítmica
def merge_sort(lista):
    if len(lista) <= 1:
        return lista
    
    mid = len(lista) // 2
    izq = merge_sort(lista[:mid])   # log n niveles de recursión
    der = merge_sort(lista[mid:])
    
    return merge(izq, der)          # O(n) por nivel

def merge(izq, der):
    resultado = []
    i = j = 0
    while i < len(izq) and j < len(der):
        if izq[i] <= der[j]:
            resultado.append(izq[i])
            i += 1
        else:
            resultado.append(der[j])
            j += 1
    resultado.extend(izq[i:])
    resultado.extend(der[j:])
    return resultado
```

### 4.4 Complejidad espacial

No solo importa el tiempo, también la memoria.

```python
# O(1) espacio - Solo variables simples
def suma(a, b):
    return a + b

# O(n) espacio - Lista que crece con input
def duplicar_lista(lista):
    return [x * 2 for x in lista]

# O(n) espacio por recursión (stack)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n llamadas en el stack
```

---

## Parte 5: Plan de Estudio Recomendado

### Semanas 1-2: Fundamentos de lógica
- Variables, tipos, operadores
- Condicionales y bucles
- Funciones
- **Práctica:** 30 problemas fáciles en LeetCode

### Semanas 3-4: Arrays y Strings
- Operaciones básicas
- Two pointers
- Sliding window
- **Práctica:** 40 problemas de arrays/strings

### Semanas 5-6: Hash Tables y Sets
- Cuando usar cada uno
- Patrones de frecuencia
- **Práctica:** 30 problemas con hashmaps

### Semanas 7-8: Stacks, Queues, Linked Lists
- Implementaciones desde cero
- Problemas clásicos
- **Práctica:** 30 problemas

### Semanas 9-10: Recursión y árboles
- Pensamiento recursivo
- Árboles binarios y BST
- Recorridos
- **Práctica:** 40 problemas de árboles

### Semanas 11-12: Grafos y algoritmos avanzados
- DFS, BFS
- Dijkstra básico
- Detección de ciclos
- **Práctica:** 30 problemas de grafos

### Continuo: Mantenimiento
- 1-2 problemas diarios
- Participar en contests
- Revisar soluciones de otros

---

## Recursos Recomendados

### Plataformas de práctica
1. **LeetCode** - El estándar para entrevistas
2. **HackerRank** - Buenos tutoriales iniciales
3. **Codewars** - Katas divertidas
4. **NeetCode** - Problemas organizados por patrón

### Libros
1. "Grokking Algorithms" - Perfecto para principiantes
2. "Cracking the Coding Interview" - El clásico para entrevistas
3. "Introduction to Algorithms" (CLRS) - La biblia académica

### Videos
1. NeetCode en YouTube - Explicaciones claras
2. CS Dojo - Fundamentos bien explicados
3. MIT OpenCourseWare - Si quieres profundizar

---

## Errores comunes a evitar

1. **Saltarte los fundamentos:** No vayas a grafos sin dominar arrays
2. **Memorizar sin entender:** Entiende el porqué, no solo el código
3. **No practicar suficiente:** La teoría sin práctica no sirve
4. **Rendirse muy pronto:** Los primeros problemas son frustrantes, es normal
5. **Compararte con otros:** Tu ritmo es válido
6. **No implementar desde cero:** Usa las estructuras built-in después de implementarlas tú

---

## Conclusión

Dominar lógica de programación y estructuras de datos no es algo que pasa en una semana. Es un proceso que requiere consistencia y práctica deliberada. Pero es la inversión más rentable que puedes hacer en tu carrera como desarrollador.

No necesitas ser un genio de las matemáticas ni haber estudiado computer science. Necesitas curiosidad, persistencia y un plan claro. Este artículo te da el plan, el resto depende de ti.

Empieza hoy. Un problema a la vez. En 3 meses te sorprenderá cuánto has avanzado.

Y recuerda: cada senior que admiras pasó por exactamente el mismo proceso. La diferencia es que ellos empezaron antes. Tu momento de empezar es ahora.
