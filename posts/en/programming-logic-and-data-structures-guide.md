---
title: 'Programming Logic and Data Structures: A Complete Guide'
sourceSlug: guia-completa-logica-estructuras-de-datos
category: Programming
date: '2026-01-27'
updated: "2026-10-21"
excerpt: Learn programming logic, algorithms and data structures through explanations and Python examples, from basic control flow to complexity.
published: true
translated: '2026-10-10'
---

You can learn React, Django, Kubernetes and the latest tools, but programming logic and data structures remain the foundation. Understanding them helps you reason about problems instead of relying on a framework to supply every answer.

I have seen developers with years of experience that cannot solve a basic algorithm problem in an interview. I have also seen juniors who, with solid foundations, outperform seniors in problem solving. The difference is not in how many frameworks you know, but in how well you think.

This article is the guide I would have liked to have when I started. We go from zero to advanced structures, with practical exercises and a clear route.

---

## Why this matters more than any framework

Let me be direct: technologies change, foundations do not.

React could be replaced in 5 years. Python could stop being the favorite. But binary trees, recursion and algorithmic complexity will remain relevant in 50 years. They are the universal programming language.

### Concrete benefits of mastering these fundamentals

1. Technical interviews: Most top companies (and more and more medium-sized companies) evaluate data structures and algorithms. It does not matter if you apply for frontend, backend or DevOps.

2. Problem Solving: When you face a complex bug or design a system, your ability to decompose problems and choose the right structure makes the difference.

3. Efficient code: Understanding Big O allows you to write code that scales. The difference between O(n) and O(n2) can be the difference between an app that works and one that collapses.

4. Technical communication: Being able to talk about trade-offs between structures positions you as a senior, even if you have little experience.

5. Learning new languages: When you understand the underlying logic, learning a new language is just a matter of syntax.

---

## Part 1: Programming Logic

Before data structures, you need to think as a programmer. This means breaking down problems into steps, understanding control flows and developing the "muscle" of logical thinking.

### 1.1 Algorithmic Thinking

An algorithm is simply a sequence of steps to solve a problem. Before writing code, you should be able to explain the solution in Spanish.

Mental exercise: Before coding any problem, write it in pseudocode or in your natural language. If you cannot explain it in words, you will not be able to explain it to the computer.

#### The 4 steps of algorithmic thinking

1. Understanding the problem: What is the input? What is the expected output? What are the restrictions?
2. Decompose: Divide the big problem into smaller subproblems
3. Finding patterns: Have I seen something similar before? Is there repetition?
4. Abstract: Can I generalize the solution for similar cases?

Practical example:

Problem: Determine if a year is leap.

Step 1 - Understand:
- Input: A whole number (year)
- Output: True or false
- Rules: It is biased if it is divisible by 4, EXCEPT those divisible by 100, UNLESS they are also divisible by 400.

Step 2 - Decompose:
- Verify divisibility by 400
- Verify divisibility by 100
- Verify divisibility by 4
- Combining the conditions

Step 3 - Pattern:
- It is a problem of nested conditions
- There are exceptions to the rules

Step 4 - Pseudocode:
```
SI año es divisible por 400:
    RETORNAR verdadero
SI año es divisible por 100:
    RETORNAR falso
SI año es divisible por 4:
    RETORNAR verdadero
RETORNAR falso
```

### 1.2 Variables and Types of Data

The variables are boxes where you store information. The types of data define what kind of information can go in each box.

#### Fundamental primitive types

|Type|Description|Example|
|------|-------------|---------|
|Integer (int)|Numbers without decimals|42, -17, 0|
|Float|Numbers with decimals|3.14, -0.001|
|string|Text|"Hello world"|
|Boolean (bool)|True or false|true, false|
|Null (null/None)|Lack of value|null, None|

#### Good practices with variables

1. Descriptive names: `precioTotal` is better than `pt` or `x`
2. CamelCase or snake▁Sécase: Be consistent (`precioTotal` or `precio_total`)
3. Constants in MAYUSCULAS: `MAX_INTENTOS = 3`
4. Avoid magic numbers: Instead of `if intentos > 3`, use `if intentos > MAX_INTENTOS`

### 1.3 Operators

Operators manipulate data. Mastering them is essential.

#### Arithmetic operators
```
+   Suma
-   Resta
*   Multiplicación
/   División
%   Módulo (resto de división)
**  Potencia
//  División entera (en Python)
```

#### Comparison operators
```
==  Igual a
!=  Diferente de
>   Mayor que
<   Menor que
>=  Mayor o igual
<=  Menor o igual
```

#### Logic operators
```
AND (&&)  - Verdadero si AMBOS son verdaderos
OR (||)   - Verdadero si AL MENOS UNO es verdadero
NOT (!)   - Invierte el valor booleano
```

Table of important truth:

|A|B|AND B|A OR B|NOT A|
|---|---|---------|--------|-------|
|V|V|V|V|F|
|V|F|F|V|F|
|F|V|F|V|V|
|F|F|F|F|V|

### 1.4 Control Structures

#### Conditional (if/else)

Conditionals allow your program to make decisions.

```python
# Estructura básica
if condicion:
    # código si es verdadero
elif otra_condicion:
    # código si la primera es falsa pero esta es verdadera
else:
    # código si todas son falsas
```

Complete example - System of qualifications:

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

#### Loops

Loops repeat code until a condition is fulfilled (or unfulfilled).

Loop for - When you know how many times iterate:

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

Loop while - When you don't know how many iterations you need:

```python
# Ejemplo: encontrar el primer número divisible por 7 mayor a 100
numero = 101
while numero % 7 != 0:
    numero += 1
print(f"Encontrado: {numero}")  # 105
```

Loop controls:

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

### 1.5 Function

Functions encapsulate reusable logic. They are fundamental to write clean code.

#### Anatomy of a function

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

#### Principles for good functions

1. A function, a responsibility: If your function does many things, divide it
2. Verbal names: `calcular_impuesto()`, `validar_email()`, `obtener_usuario()`
3. Limited parameters: More than 3-4 parameters is a sign that something is wrong
4. Avoids side effects: A function ideally receives inputs and returns outputs, without modifying external state.
5. Early return: Valid at the beginning and return errors soon

Example - Well-designed function:

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

### 1.6 Recurrence

Recursion is when a function calls itself. It is elegant for certain problems, but requires care.

#### Components of any recursive function

1. Base case: Condition that stops the recursion
2. Recursive case: The function is called with a smaller problem
3. Progress towards the base case: Each call must approach the base case

Classical example - Factorial:

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

Example - Fibonacci:

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

#### When to use recursion

Use it when:
- The problem has natural recursive structure (trees, graphs)
- The iterative solution would be very complex
- You are dividing a problem into smaller identical subproblems

Avoid it when:
- A simple iterative solution exists
- The depth of recursion can be very large (stack overflow)
- Performance is critical and you cannot memorize.

---

## Part 2: Fundamental Data Structures

Now that you think as a programmer, you need to know where and how to save your data. The correct structure can make your 1000x code faster.

### 2.1 Arrays (Arrays/Lists)

The array is the most basic and most used structure. It is an ordered collection of elements.

#### Characteristics

- Index access: O(1) - instantaneous
- Search: O(n) - everything must be covered in the worst case
- Insertion at the end: O(1) amortized
- Insertion at the beginning/mean: O(n) - elements must be moved

#### Common operations

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

#### Important techniques with arrays

Two Pointers:

Useful for problems involving pairs or search in ordered arrays.

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

Sliding Window:

For contiguous subarrays problems.

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

### 2.2 Strings

The strings are character arrays with special operations.

#### Essential operations

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

#### Classical problem - Palindromo

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

### 2.3 Hash Tables (Dictionaries/Maps)

The most versatile structure. It stores key-value pairs with O(1) access.

#### Characteristics

- Access by key: O(1) average
- Insertion: O(1) average
- Elimination: O(1) average
- Unordered: Keys have no guaranteed order

#### Fundamental operations

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

#### Common applications

Count frequencies:

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

Two Sum (classic interview problem):

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

Group anagrams:

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

### 2.4 Sets

A set is like a dictionary but only with keys (without values). Unique elements, without order.

#### Characteristics

- Unique elements: No duplicates
- Verification of membership: O(1)
- Insertion/Elimination: O(1) average
- Without indexes: You cannot access by position

#### Operations

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

#### Application - Find duplicates

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

### 2.5 Stacks

LIFO: Last In, First Out. The last one that enters is the first one that leaves.

#### Fundamental operations

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

#### Classical applications

Check balanced parentheses:

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

Evaluate reverse Polish notation:

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

FIFO: First In, First Out. The first one that enters is the first one that leaves.

#### Implementation

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

#### Application - BFS (Wide search)

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

### 2.7 Linked Lists

A sequence of nodes where each node points to the next.

#### Basic implementation

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

#### Classical problem - Detect cycle

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

Invest linked list:

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

## Part 3: Advanced Data Structures

These structures are less common in day-to-day code, but essential to solve complex problems and interviews in top companies.

### 3.1 Binary Trees

Hierarchical structure where each node has maximum two children.

#### Implementation

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

#### Fundamental routes

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

#### Common tree problems

Tree height:

```python
def altura(nodo):
    if not nodo:
        return 0
    return 1 + max(altura(nodo.izquierdo), altura(nodo.derecho))
```

Verify if it is valid BST:

```python
def es_bst_valido(nodo, minimo=float('-inf'), maximo=float('inf')):
    if not nodo:
        return True

    if nodo.valor <= minimo or nodo.valor >= maximo:
        return False

    return (es_bst_valido(nodo.izquierdo, minimo, nodo.valor) and
            es_bst_valido(nodo.derecho, nodo.valor, maximo))
```

Lower Common Ancestor (LCA):

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

### 3.2 Heaps (Mounds)

Special binary tree that maintains the minimum (or maximum) always at the root.

#### Use in Python

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

#### Application - Median data stream

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

### 3.3 Graphs

Set of nodes connected by edges. They can be directed or not directed.

#### Representations

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

#### Fundamental algorithms

DFS (Deep search):

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

BFS (Width Search):

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

Dijkstra (shortest path):

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

Detect cycle in directed graph:

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

### 3.4 Tries (trees of prefixes)

Optimized structure to store and search strings by prefixes.

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

## Part 4: Algorithmic Complexity (Big O)

Understanding Big O is what separates someone who "codes" from someone who understands what they do.

### 4.1 What is Big O?

Big O describes how an algorithm scales when the input grows. It does not measure exact time, but how time/space grows with larger inputs.

### 4.2 Common complexities

|Notation|Name|Example|
|----------|--------|---------|
|O(1)|Constant|Index array access|
|O(log n)|Logarithmic|Binary search|
|O(n)|Linear|Go through array|
|O(n log n)|Linearithmic|Merge sort, quick sort|
|O(n2)|Quadratic|Two nested loops|
|O(2n)|Exponential|Recursive Fibonacci without memo|
|O(n!)|Factorial|Permutations|

### 4.3 How to calculate Big O

Basic rules:

1. Ignorance constants: O(2n)  O O(n)
2. Ignores minor terms: O(n2 + n) = O(n2)
3. Nested loops multiply: Loop inside loop  O O(n  m m)
4. Sequential loops sum: Loop followed by loop  lo O(n + m) = O(n)

Practical examples:

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

### 4.4 Spatial complexity

Not only time matters, but also memory.

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

## Part 5: Recommended Study Plan

### Weeks 1-2: Fundamentals of logic
- Variables, types, operators
- Conditional and loops
- Functions
- Practice: 30 easy problems in LeetCode

### Weeks 3-4: Arrays and Strings
- Basic operations
- Two pointers
- Sliding window
- Practice: 40 array/string problems

### Weeks 5-6: Hash Tables and Sets
- When using each one
- Frequency patterns
- Practice: 30 problems with hashmaps

### Weeks 7-8: Stacks, Queues, Linked Lists
- Implementations from scratch
- Classical problems
- Practice: 30 problems

### Weeks 9-10: Recursion and trees
- Recursive thinking
- Binary trees and BST
- Routes
- Practice: 40 tree problems

### Weeks 11-12: Graphs and advanced algorithms
- DFS, BFS
- Basic Dijkstra
- Cycle detection
- Practice: 30 graph problems

### Continuous: Maintenance
- 1-2 daily problems
- Participate in contests
- Review solutions from others

---

## Recommended Resources

### Practice platforms
1. LeetCode - The standard for interviews
2. HackerRank - Good initial tutorials
3. Codewars - Fun Katas
4. NeetCode - Pattern-Organized Problems

### Books
1. "Grokking Algorithms" - Perfect for beginners
2. Cracking the Coding Interview
3. "Introduction to Algorithms" (CLRS) - The Academic Bible

### Videos
1. NeetCode on YouTube - Clear explanations
2. CS Dojo - Well explained foundations
3. MIT OpenCourseWare - If you want to deepen

---

## Common mistakes to avoid

1. skip the fundamentals: Don't go to graphs without mastering arrays
2. Memorize without understanding: Understand why, not just the code
3. Not practicing enough: Theory without practice is useless
4. Surrender very soon: The first problems are frustrating, it is normal
5. Compare yourself with others: Your rhythm is valid
6. Not implementing from scratch: Use built-in structures after implementing them yourself

---

## Frequently asked questions

Do I need to know advanced mathematics for this?
No. You need logical thinking, not advanced calculation. Big O uses some notation, but 90% is reasoning about how your code behaves, not solving integrals.

In what language do I practice logic and data structures?
In which you want: the concepts are universal. Here we use Python for its readability; if you don't know it, it starts with my [Python tutorial for beginners](/en/python-tutorial-for-beginners-with-a-project) and then returns to this guide.

Does this help me for technical interviews?
A lot. Most technical interviews evaluate exactly this. And if you doubt which stack to accompany, look at the most demanded [languages](/en/programming-languages-and-starter-projects) and [frameworks](/en/popular-frameworks-and-learning-paths) in 2026.

## Conclusion

Mastering programming logic and data structures is not something that happens in a week. It is a process that requires consistency and deliberate practice. But it is the most profitable investment you can make in your career as a developer.

You don't need to be a math genius or have studied computer science. You need curiosity, persistence and a clear plan. This article gives you the plan, the rest depends on you.

It begins today. One problem at a time. In 3 months you will be surprised how much progress you have made.

And remember: every senior you admire went through exactly the same process. The difference is that they started earlier. Your time to start is now.

## Choose a structure from the operations you need

A list keeps a sequence, a set supports membership and uniqueness, and a dictionary associates keys with values. The right choice depends on operations, ordering, memory and implementation guarantees.

For expenses, keep capture order in a list, unique categories in a set and category totals in a dictionary. The example uses Spanish names to match the source:

```python
gastos = [("comida", 50), ("transporte", 20), ("comida", 30)]
totales = {}
for categoria, importe in gastos:
    totales[categoria] = totales.get(categoria, 0) + importe
print(totales)  # {'comida': 80, 'transporte': 20}
```

With expected constant-time dictionary operations, the traversal takes expected O(n) time and O(k) additional space for k distinct categories. These bounds do not predict milliseconds or server capacity. Try an empty list, a new category and an invalid amount, defining expected behavior first.
