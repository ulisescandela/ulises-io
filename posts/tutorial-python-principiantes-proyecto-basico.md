---
title: "Tutorial de Python para Principiantes: Lo Básico + Calculadora Interactiva"
date: "2026-01-19"
excerpt: "Aprende Python desde cero con este tutorial práctico. Cubrimos lo esencial que necesitas saber y construimos juntos una calculadora interactiva que puedes agregar a tu portafolio."
readTime: "15 min"
tags: ["Python", "Tutorial", "Principiantes", "Proyecto", "Programación"]
published: true
coverImage: ""
---

Python es uno de los mejores lenguajes para empezar a programar. Su sintaxis es limpia, legible, y te permite enfocarte en resolver problemas en lugar de pelear con el lenguaje.

En este tutorial vamos a cubrir lo esencial de Python y al final construiremos una calculadora interactiva juntos. No necesitas experiencia previa.

## Instalación

### Windows
1. Ve a [python.org/downloads](https://www.python.org/downloads/)
2. Descarga la última versión (3.12+)
3. **Importante:** Marca la casilla "Add Python to PATH" durante la instalación

### macOS
Python viene preinstalado, pero te recomiendo instalar la versión más reciente:

```bash
brew install python
```

### Linux

```bash
sudo apt update
sudo apt install python3 python3-pip
```

### Verificar instalación

Abre tu terminal y escribe:

```bash
python --version
```

Deberías ver algo como `Python 3.12.x`.

---

## Lo Básico de Python

### Variables y Tipos de Datos

En Python no necesitas declarar el tipo de variable:

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

### Imprimir en consola

```python
print("Hola, mundo!")
print(f"Me llamo {nombre} y tengo {edad} años")  # f-strings
print("Precio:", precio)
```

### Operaciones básicas

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

### Input del usuario

```python
nombre = input("¿Cómo te llamas? ")
print(f"Hola, {nombre}!")

# Convertir input a número
edad = int(input("¿Cuántos años tienes? "))
```

---

## Estructuras de Control

### Condicionales (if/elif/else)

```python
edad = 18

if edad >= 18:
    print("Eres mayor de edad")
elif edad >= 13:
    print("Eres adolescente")
else:
    print("Eres menor de edad")
```

**Nota importante:** En Python la indentación (espacios al inicio) es obligatoria. Usa 4 espacios o tab.

### Operadores de comparación

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

## Bucles (Loops)

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

### Break y Continue

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

## Listas y Diccionarios

### Listas

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

### Diccionarios

Son como objetos en JavaScript - pares clave-valor:

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

## Funciones

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

## Manejo de Errores

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

## Trabajar con Archivos

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

## Proyecto: Calculadora Interactiva

Ahora vamos a construir algo útil: una calculadora que funciona en la terminal.

Crea un archivo llamado `calculadora.py`:

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

### Ejecutar el proyecto

```bash
python calculadora.py
```

### ¿Qué aprendiste con este proyecto?

- **Funciones** para organizar código
- **Condicionales** para las opciones
- **Loops** para el menú interactivo
- **Manejo de errores** con try/except
- **Entrada de usuario** con input()

---

## Próximos Pasos

Una vez que domines lo básico, explora:

1. **POO (Programación Orientada a Objetos)** — clases, herencia, métodos
2. **Módulos y paquetes** — organizar código en archivos
3. **Virtual environments** — `python -m venv env`
4. **pip** — instalar librerías externas
5. **Frameworks** — Flask/FastAPI para web, Pandas para datos

---

## Recursos Recomendados

- [Documentación oficial de Python](https://docs.python.org/3/)
- [Python para todos (libro gratuito)](https://www.py4e.com/)
- [Ejercicios en Codewars](https://www.codewars.com/?language=python)
- [Automate the Boring Stuff](https://automatetheboringstuff.com/)

---

## Conclusión

Python es un lenguaje que escala contigo. Lo que aprendiste hoy te servirá cuando hagas web scraping, APIs, machine learning, o automatización.

El secreto es practicar. No solo leas — escribe código, rompe cosas, y construye proyectos. La calculadora que hicimos es solo el inicio.

¿Qué proyecto vas a construir con Python? Cuéntame en mis redes.

---

*¿Te sirvió este tutorial? Compártelo con alguien que quiera aprender Python. Y sígueme para más tutoriales prácticos.*
