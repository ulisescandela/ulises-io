---
updated: "2026-10-12"
title: 'Python Tutorial for Beginners: Build Your First Project'
sourceSlug: tutorial-python-principiantes-proyecto-basico
category: Programming
date: '2026-01-19'
excerpt: Learn Python basics through practical examples, then build an interactive calculator to apply variables, control flow and functions.
published: true
translated: '2026-10-10'
---

Python is a practical language for learning to program. Its readable syntax lets you focus on the problem while you learn variables, control flow, functions and other fundamentals.

In this tutorial we will cover the essence of Python and in the end we will build an interactive calculator together. You do not need previous experience.

## Installation

### Windows
1. Go to [python.org/downloads](https://www.python.org/downloads/)
2. Download the latest version (3.12+)
3. Important: Check the box "Add Python to PATH" during installation.

### MacOS
Python comes pre-installed, but I recommend installing the latest version:

```bash
brew install python
```

### Linux

```bash
sudo apt update
sudo apt install python3 python3-pip
```

### Verify installation

Open your terminal and write:

```bash
python --version
```

You should see something like `Python 3.12.x`.

---

## The Basics of Python

### Variables and Types of Data

In Python you do not need to declare the type of variable:

```python
# Strings (texto)
nombre = "Ulises"
mensaje = 'También funciona con comillas simples'

# Números
edad = 25
precio = 19.99
cantidad = -5

# Booleanos
es_programador = True
tiene_experiencia = False

# Nulo
resultado = None
```

### Print on console

```python
print("Hola, mundo!")
print(f"Me llamo {nombre} y tengo {edad} años")  # f-strings
print("Precio:", precio)
```

### Basic operations

```python
# Matemáticas
suma = 10 + 5        # 15
resta = 10 - 5       # 5
multiplicacion = 4 * 3   # 12
division = 10 / 3    # 3.333...
division_entera = 10 // 3  # 3
modulo = 10 % 3      # 1 (residuo)
potencia = 2 ** 3    # 8

# Strings
nombre_completo = "Ulises" + " " + "Rodriguez"  # Concatenar
repetir = "Hola " * 3  # "Hola Hola Hola "
```

### User input

```python
nombre = input("¿Cómo te llamas? ")
print(f"Hola, {nombre}!")

# Convertir input a número
edad = int(input("¿Cuántos años tienes? "))
```

---

## Control Structures

### Conditional (if/elif/else)

```python
edad = 18

if edad >= 18:
    print("Eres mayor de edad")
elif edad >= 13:
    print("Eres adolescente")
else:
    print("Eres menor de edad")
```

Important note: In Python indentation (initial spaces) is mandatory. Use 4 spaces or tab.

### Comparison operators

```python
# ==  igual a
# !=  diferente de
# >   mayor que
# <   menor que
# >=  mayor o igual
# <=  menor o igual

# Operadores lógicos
# and  - ambos deben ser True
# or   - al menos uno True
# not  - invierte el valor

if edad >= 18 and tiene_licencia:
    print("Puedes conducir")
```

---

## Loops

### For loop

```python
# Iterar sobre una lista
frutas = ["manzana", "banana", "naranja"]
for fruta in frutas:
    print(fruta)

# Iterar con range
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):  # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (de 2 en 2)
    print(i)
```

### While loop

```python
contador = 0
while contador < 5:
    print(contador)
    contador += 1  # No olvides incrementar o será loop infinito
```

### Break and Continue

```python
# break - sale del loop
for i in range(10):
    if i == 5:
        break
    print(i)  # Imprime 0, 1, 2, 3, 4

# continue - salta a la siguiente iteración
for i in range(5):
    if i == 2:
        continue
    print(i)  # Imprime 0, 1, 3, 4
```

---

## Lists and dictionaries

### Lists

```python
# Crear lista
numeros = [1, 2, 3, 4, 5]
mixta = [1, "dos", 3.0, True]

# Acceder elementos (índice empieza en 0)
primero = numeros[0]  # 1
ultimo = numeros[-1]  # 5

# Modificar
numeros[0] = 10

# Agregar elementos
numeros.append(6)      # Agrega al final
numeros.insert(0, 0)   # Agrega en posición específica

# Eliminar
numeros.remove(3)      # Elimina el valor 3
del numeros[0]         # Elimina por índice
ultimo = numeros.pop() # Elimina y retorna el último

# Longitud
print(len(numeros))

# Slicing (rebanadas)
primeros_tres = numeros[0:3]  # [1, 2, 3]
ultimos_dos = numeros[-2:]    # Últimos 2 elementos
```

### Dictionary

They are like objects in JavaScript - key-value pairs:

```python
persona = {
    "nombre": "Ulises",
    "edad": 25,
    "ciudad": "Torreón"
}

# Acceder
print(persona["nombre"])  # Ulises
print(persona.get("nombre"))  # Más seguro, no da error si no existe

# Modificar/Agregar
persona["edad"] = 26
persona["profesion"] = "Developer"

# Eliminar
del persona["ciudad"]

# Iterar
for clave, valor in persona.items():
    print(f"{clave}: {valor}")
```

---

## Functions

```python
# Función básica
def saludar():
    print("¡Hola!")

saludar()  # Llamar función

# Con parámetros
def saludar_a(nombre):
    print(f"¡Hola, {nombre}!")

saludar_a("Ulises")

# Con valor por defecto
def saludar_formal(nombre, titulo="Sr."):
    print(f"¡Hola, {titulo} {nombre}!")

saludar_formal("Rodriguez")  # Hola, Sr. Rodriguez
saludar_formal("Maria", "Sra.")  # Hola, Sra. Maria

# Con return
def sumar(a, b):
    return a + b

resultado = sumar(5, 3)  # 8

# Múltiples returns
def dividir(a, b):
    if b == 0:
        return None
    return a / b
```

---

## Error Management

```python
try:
    numero = int(input("Ingresa un número: "))
    resultado = 10 / numero
    print(f"Resultado: {resultado}")
except ValueError:
    print("Eso no es un número válido")
except ZeroDivisionError:
    print("No se puede dividir entre cero")
except Exception as e:
    print(f"Error inesperado: {e}")
finally:
    print("Esto siempre se ejecuta")
```

---

## Working with files

```python
# Escribir archivo
with open("archivo.txt", "w") as f:
    f.write("Hola, mundo!\n")
    f.write("Segunda línea")

# Leer archivo
with open("archivo.txt", "r") as f:
    contenido = f.read()
    print(contenido)

# Leer línea por línea
with open("archivo.txt", "r") as f:
    for linea in f:
        print(linea.strip())  # strip() quita espacios/saltos
```

---

## Project: Interactive Calculator

Now we are going to build something useful: a calculator that works in the terminal.

Create a file called `calculadora.py`:

```python
def suma(a, b):
    return a + b

def resta(a, b):
    return a - b

def multiplicacion(a, b):
    return a * b

def division(a, b):
    if b == 0:
        return "Error: No se puede dividir por cero"
    return a / b

def main():
    print("🧮 Calculadora Interactiva")
    print("Operaciones disponibles:")
    print("1. Suma")
    print("2. Resta")
    print("3. Multiplicación")
    print("4. División")
    print("5. Salir")
    
    while True:
        try:
            opcion = int(input("\nElige una operación (1-5): "))
            
            if opcion == 5:
                print("¡Hasta luego!")
                break
            
            if opcion not in [1, 2, 3, 4]:
                print("Opción inválida. Intenta de nuevo.")
                continue
            
            num1 = float(input("Ingresa el primer número: "))
            num2 = float(input("Ingresa el segundo número: "))
            
            if opcion == 1:
                resultado = suma(num1, num2)
                print(f"Resultado: {num1} + {num2} = {resultado}")
            elif opcion == 2:
                resultado = resta(num1, num2)
                print(f"Resultado: {num1} - {num2} = {resultado}")
            elif opcion == 3:
                resultado = multiplicacion(num1, num2)
                print(f"Resultado: {num1} * {num2} = {resultado}")
            elif opcion == 4:
                resultado = division(num1, num2)
                print(f"Resultado: {num1} / {num2} = {resultado}")
                
        except ValueError:
            print("Error: Ingresa un número válido.")
        except Exception as e:
            print(f"Error inesperado: {e}")

if __name__ == "__main__":
    main()
```

### Run the project

```bash
python calculadora.py
```

### What did you learn with this project?

- Functions to organize code
- Conditional options
- Loops for the interactive menu
- Error handling with try/except
- User input with input()

---

## Next steps

Once you master the basics, explore:

1. POO (Object Oriented Programming): classes, inheritance, methods
2. Modules and packages: organize code in files
3. Virtual environments: `python -m venv env`
4. pip: install external libraries
5. Frameworks: Flask/FastAPI for web, Pandas for data

---

## Recommended Resources

- [Official Python documentation](https://docs.python.org/3/)
- [Python for everyone (free book)](https://www.py4e.com/)
- [Exercises in Codewars](https://www.codewars.com/?language=python)
- [Automate the Boring Stuff](https://automatetheboringstuff.com/)

---

## Frequently asked questions

Is Python good for beginners?
Yes, it is one of the best to start with. Its syntax is close to English and avoids unnecessary complexities while learning to think as a programmer. If you still have doubts about what to learn, look at my comparison of [programming languages for 2026](/en/programming-languages-and-starter-projects).

How long does it take to learn Python?
The basics of this tutorial can be assimilated in a few weeks. For real ease, it combines syntax with [Fundamentals of logic and data structures](/en/programming-logic-and-data-structures-guide): there is the real jump.

What do I do after learning the basics?
It makes the leap to a framework. For web you have Django or FastAPI, which I cover together with others in [The most used frameworks in 2026](/en/popular-frameworks-and-learning-paths); or get into data science and AI, where Python is the king.

## Conclusion

Python is a language that scales with you. What you learned today will help you when you do web scraping, APIs, machine learning, or automation.

The secret is to practice. Not only read, write code, break things, and build projects. The calculator we made is just the beginning.

What project are you going to build with Python? Tell me in my networks.

---

Did this tutorial help you? Share it with someone who wants to learn Python. And follow me for more practical tutorials.

## Test the calculator with awkward inputs

Separate calculation from keyboard input so it can be checked without entering every value manually.

```python
def calculate(a, b, operation):
    if operation == "+":
        return a + b
    if operation == "-":
        return a - b
    if operation == "*":
        return a * b
    if operation == "/":
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    raise ValueError("Unsupported operation")

assert calculate(8, 2, "/") == 4
assert calculate(-3, 5, "+") == 2
try:
    calculate(8, 0, "/")
except ValueError as error:
    assert str(error) == "Cannot divide by zero"
else:
    raise AssertionError("Division by zero should be rejected")
```

Save this as `calculator_test.py` and run `python calculator_test.py`. Passing checks produce no output. Add a check for an unknown operation. Validate empty text and invalid numbers separately in the layer using `input()`. In your README explain execution, accepted inputs and handled errors, then explore [data structures](/en/programming-logic-and-data-structures-guide).
