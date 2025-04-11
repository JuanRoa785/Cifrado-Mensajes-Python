# Cifrado de Mensajes en Python - Seguridad Informática F1 - UIS:
## 👥 Integrantes
- **Juan Diego Roa Porras (2210086)**
- **Jesús David Ramírez Celis (2211593)**

## ❓ ¿Qué buscamos con este Laboratorio?
<p align="justify">El objetivo principal es aprender cómo aplicar técnicas básicas de cifrado simétrico utilizando Python. Con esto se pretende asegurar que los datos enviados entre dos usuarios sean privados y que no se hayan alterado durante la transmisión. En resumen, se busca garantizar la confidencialidad e integridad de los datos, lo cual se traducirá en una mayor robustez del sistema de información.</p>

## 💡 Explicación general de la solución Implementada:
📄 **[Explicación Solución](./Solucion_Seguridad_en_SI.pdf)**

## 🛠️ Tecnologías utilizadas
![image](https://github.com/user-attachments/assets/7846c41e-dfec-4ae9-bd5c-f327ee2a03c5)

| Componente      | Tecnología                                           | Descripción |
|----------------|------------------------------------------------------|-------------|
| **Frontend**   | ![HTML](https://img.shields.io/badge/HTML-orange?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-blue?logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black) ![Nginx](https://img.shields.io/badge/-NGINX-009639?style=flat-square&logo=nginx&logoColor=white) | Aplicación web con HTML, CSS y JavaScript clásico, desplegada en **NGINX**. |
| **Backend (Python)** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Fernet](https://img.shields.io/badge/Fernet-7B5BA6?style=flat&logo=lock&logoColor=white)  | Implementado con **FastAPI**, manejando las solicitudes HTTP y la comunicación con RabbitMQ. Se utilizó **Fernet** para el cifrado de los mensajes. |
| **Broker** | ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?logo=rabbitmq&logoColor=white) | Se utilizó **RabbitMQ** como sistema de mensajería basado en AMQP. |
| **Despliegue** | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?logo=docker&logoColor=white) | Contenedores gestionados con **Docker** y **Docker Compose**. |
| **Entorno de Desarrollo** | ![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?logo=visualstudiocode&logoColor=white)  | Entorno de desarrollo en **Ubuntu 22.04**, utilizando **VS Code**. |

## 🛠️ Guía de Despliegue en ![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)

### 1. Verificar que Docker y Docker Compose estan instalados:
```bash
docker --version
docker compose version #Versiones nuevas
docker-compose version #Versiones más antiguas
```
**Si Docker y Docker Compose no están instalados, puedes seguir este tutorial:**  
- 🔗 [Guía de instalación en DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-es)  **O simplemente consultar a tu IA de confianza. 😉**

### 2. Clonar el repositorio:
```bash
git clone https://github.com/JuanRoa785/Cifrado-Mensajes-Python.git

#Verificar que se clonó correctamente:

ls 
#Deberá aparecer un directorio (Carpeta) llamado: Cifrado-Mensajes-Python
```

### 3. Generar imágenes para el despliegue:
```bash
cd front/
docker build -t front_seguridad .
#El nombre es importane mantenerlo igual para evitar problemas en el docker compose

cd ../back/
docker build -t back_seguridad . 
```

### 4. Levantar los contenedores:
```bash
cd ../ #Volvemos a la raiz del proyecto

docker compose up -d
```
> ⚠ **Importante:** Antes de acceder a la URL de alguno de los dos fronts (puertos 8080 y 8081), asegúrate de que todos los contenedores se encuentren en estado **"Healthy"** o **"Started"**.:
<p align="center">
  <img src="https://github.com/user-attachments/assets/35c50a93-582c-4475-a0b3-390de6dfbbd2" />
</p>

### 5. Acceder a los contenedores en su navegador:
```bash
#Las URLs son si lo esta ejectuando en su maquina de manera local:
http://localhost:8080/ #Front con publisher Roa
http://localhost:8081/ #Front con publisher Jesus
```
**Nota:** Para detener la ejecución del software, solo se debe ejecutar el siguiente comando **`docker compose down`**

## 🚀 Software en Ejecución
<p align="center">
  <img src="https://github.com/user-attachments/assets/2d1bb4aa-e266-4c3a-a404-9a05248f7dc4" />
</p>

## 🔐 Ejemplo sencillo de encriptación y desencriptación
```python
from cryptography.fernet import Fernet
import json

secretKey = Fernet.generate_key()

print("Tu llave secreta es: " + secretKey.decode() + "\n") 

fernet = Fernet(secretKey)

mensaje = {
    "autor": "Estudiante UIS",
    "fecha": "11-04-2025", 
    "routing_key": "N.A",
    "exchange": "N.A",
    "mensaje": "Este es un mensaje de prueba para comprobar la encriptación usando Fernet:"
}

mensaje_bytes = json.dumps(mensaje).encode('utf-8')
print("El mensaje convertido a bytes es el siguiente:\n" + str(mensaje_bytes) + "\n")

mensaje_encriptado = fernet.encrypt(mensaje_bytes)
print("El mensaje encriptado es el siguiente:\n" + str(mensaje_encriptado) + "\n")

mensaje_desencriptado = fernet.decrypt(mensaje_encriptado)
print("El mensaje desencriptado es el siguiente:\n" + str(json.loads(mensaje_desencriptado)) + "\n")
```
**Al  ejecutarlo con `python3 ejemploSencillo.py` se obtendrá una salida similar a esta:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/79f35166-ee27-429e-b186-7377520348e8" />
</p>

## Créditos y Código Fuente Original
<p align="justify">Este proyecto fue adaptado a partir de un código similar desarrollado por Juan Diego Roa para la asignatura de <b>Principios de Desarrollo Orientado a Objetos</b> de la <b>Universidad Industrial de Santander</b>:</p>

🔗 [JuanRoa785/Taller-RabbitMQ](https://github.com/JuanRoa785/Taller-RabbitMQ)

Se realizaron modificaciones a esa versión original para adaptarla a los requerimientos específicos de este taller.
