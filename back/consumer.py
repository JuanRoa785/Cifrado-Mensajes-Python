import pika
from env import RABBIT_URL, SECRET_KEY
from fastapi import APIRouter
from fastapi import Body
from typing import List
from cryptography.fernet import Fernet, InvalidToken
import json, random

router = APIRouter()

#Conexion a RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBIT_URL))
channel = connection.channel()

#Creación de cola temporal especifica para cada cliente
result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='amq.direct', queue=queue_name, routing_key="cifrar")

#Instanciamos el encriptador correcto:
fernet = Fernet(SECRET_KEY.encode())

#Instanciamos un encriptador "falso":
wrongKey = "iYaatqlDEZQh8BnYFBkMu2H5LQtiZstigq1m0uJYnqA=" #Es valida para Fernet pero es erronea
fernet_false = Fernet(wrongKey.encode())

@router.get("/getMessages")
async def getMessages(): 
    mensajes = []

    while True:
        method_frame, header_frame, body = channel.basic_get(queue=queue_name, auto_ack=True)
        if method_frame:
            try:
                #20% de probabilidad de que se desencripte erroneamente 
                if random.random() > 0.8: 
                    # Intenta desencriptar con la clave incorrecta (Lanzará una Excepcion)
                    body_decrypted = fernet_false.decrypt(body)
                else:
                    # Desencripta normalmente
                    body_decrypted = fernet.decrypt(body)

                body_str = body_decrypted.decode("utf-8")
                mensaje = json.loads(body_str)
                mensajes.append(mensaje)

            except InvalidToken:
                # Clave incorrecta: agregar mensaje simulado
                mensajes.append({
                    "autor": "N.A",
                    "fecha": "N.A",
                    "routing_key": "Cifrar",
                    "exchange": "Direct",
                    "mensaje": "Se trató de descifrar el mensaje con una SECRET_KEY inválida"
                })
        break  # No hay más mensajes en la cola
    return {"mensajes": mensajes}