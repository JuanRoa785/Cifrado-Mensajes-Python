import pika
from env import RABBIT_URL, SECRET_KEY
from models import Message
from fastapi import APIRouter
from cryptography.fernet import Fernet

router = APIRouter()

fernet = Fernet(SECRET_KEY.encode())

#Conexión a RabbitMQ
def getConnectionInfo():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBIT_URL))
    return connection, connection.channel()

#EndPoint Para publicar mensajes:
@router.post("/publishMessage")
async def publishMessage(message: Message):
    #Encriptamos el mensaje
    mssg_str = message.model_dump_json()
    mssg_bytes = mssg_str.encode('utf-8') #Lo convertimos a bytes
    encryptedMssg = fernet.encrypt(mssg_bytes)

    #Enviamos el mensaje ecnriptado a RabbitMQ
    connection, channel = getConnectionInfo()
    channel.basic_publish(
        exchange = 'amq.' + message.exchange.lower(),
        routing_key = message.routing_key.lower(),
        body = encryptedMssg
    )
    channel.close()
    connection.close()
    return message