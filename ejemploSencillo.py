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