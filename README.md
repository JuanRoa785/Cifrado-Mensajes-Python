# Cifrado de Mensajes en Python - Seguridad Informática F1 - UIS:

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
> ⚠ **Importante:** Antes de acceder a la URL de alguno de los dos fronts (puertos 8080 y 8081) esperar que los contenedores esten en este estado:
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

## Créditos y código fuente original

Este proyecto fue adaptado a partir del repositorio original de Juan Diego Roa:

🔗 [JuanRoa785/Taller-RabbitMQ](https://github.com/JuanRoa785/Taller-RabbitMQ)

Se realizaron modificaciones sobre el código original para ajustarlo a los requerimientos específicos de este taller.
