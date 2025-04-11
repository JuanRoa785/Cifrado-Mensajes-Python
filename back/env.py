import os

#Variable de entorno con la URL de rabbitMQ, por default será localhost
RABBIT_URL = os.getenv("RABBIT_URL", "localhost")

#Variable de entorno que se utilizará como fernet key, se utilizara esta:
SECRET_KEY = os.getenv("SECRET_KEY", "AhAmNzQqSBL67zbvlXPAflI5NV5lJD6rxUjbuTC00-s=") 

#Se puede crear una clave facilmente por medio de:

#from cryptography.fernet import Fernet
#key = Fernet.generate_key()
#print(key.decode())