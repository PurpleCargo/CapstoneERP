import json
import datetime
from read import data
import requests
import datetime


def create_pedido(local, detalle, estado, fecha, fecha_entrega, ultimo_registro):
    # Crea una solicitud PUT
    url = "http://127.0.0.1:5000/pedidos"

    data = {"local": local,
            "detalle": json.dumps(detalle),
            "estado": estado,
            "fecha": fecha,
            "fecha_entrega": fecha_entrega,
            "ultimo_registro": ultimo_registro}

    # Envía la solicitud
    response = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})

    # Verifica el resultado
    if response.status_code == 200:
        print("La actualización se realizó correctamente")
    else:
        print(f"La actualización falló: {response.status_code}")

now = datetime.datetime.now()
for i in data:
    if i[0] != 'Marca temporal':
        create_pedido(i[7],  # local
                      # detalle
                      {'crossaint': i[2], 'panes de molde': i[3], 'medias lunas': i[4], 'empanadas de hoja': i[5]},
                      i[9],
                      i[0],
                      i[1],
                      0)

print(data[1][9])
