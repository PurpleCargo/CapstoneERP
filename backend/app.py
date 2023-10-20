from flask import Flask
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost/capstone_erp'
db = SQLAlchemy(app)
CORS(app)

class Insumo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    cantidad = db.Column(db.Float, nullable=False)
    cantidad_min = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"Event: {self.nombre}"
    
    def __init__(self, nombre, cantidad, cantidad_min):
        self.nombre = nombre
        self.cantidad = cantidad
        self.cantidad_min = cantidad_min

def format_insumo(insumo):
    return {
        "nombre": insumo.nombre,
        "id": insumo.id,
        "cantidad": insumo.cantidad,
        "cantidad_min": insumo.cantidad_min
    }

with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Hey!'

# crear un insumo
@app.route('/insumos', methods = ['POST'])
def crear_insumos():
    nombre = request.json['nombre']
    cantidad = request.json['cantidad']
    cantidad_min = request.json['cantidad_min']
    insumo = Insumo(nombre, cantidad, cantidad_min)
    db.session.add(insumo)
    db.session.commit()
    return format_insumo(insumo)

# recuperar todos los insumos
@app.route('/insumos', methods = ['GET'])
def get_insumos():
    insumos = Insumo.query.order_by(Insumo.id.asc()).all()
    lista_insumos = []
    for insumo in insumos:
        lista_insumos.append(format_insumo(insumo))
    return {'insumos': lista_insumos}

# recuperar un insumo
@app.route('/insumos/<id>', methods = ['GET'])
def get_insumo(id):
    insumo = Insumo.query.filter_by(id=id).one()
    formatted_insumo = format_insumo(insumo)
    return {'insumo': formatted_insumo}

# borrar un insumo
@app.route('/insumos/<id>', methods = ['DELETE'])
def delete_insumo(id):
    insumo = Insumo.query.filter_by(id=id).one()
    db.session.delete(insumo)
    db.session.commit()
    return f'Insumo (id: {id}) eliminado!'

# actualizar insumo
@app.route('/insumos/<id>', methods = ['PUT'])
def update_insumo(id):
    insumo = Insumo.query.filter_by(id=id)
    nombre = request.json['nombre']
    cantidad = request.json['cantidad']
    cantidad_min = request.json['cantidad_min']
    insumo.update(dict(nombre = nombre, cantidad = cantidad, cantidad_min = cantidad_min))
    db.session.commit()
    return {'insumo': format_insumo(insumo.one())}

if __name__ == '__main__':
    app.run()