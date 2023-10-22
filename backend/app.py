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

#pickletype es un objeto de python, en nuestro caso sería un diccionario de {ingrediente: cantidad}
class Receta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredientes = db.Column(db.PickleType, nullable=False)
    preparacion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"Event: {self.ingredientes}"
    
    def __init__(self, ingredientes, preparacion):
        self.ingredientes = ingredientes
        self.preparacion = preparacion

def format_receta(receta):
    return {
        "ingredientes": receta.ingredientes,
        "id": receta.id,
        "preparacion": receta.preparacion
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

#crear una receta
@app.route('/recetas', methods = ['POST'])
def crear_recetas():
    ingredientes = request.json['ingredientes']
    preparacion = request.json['preparacion']
    receta = Receta(ingredientes, preparacion)
    db.session.add(receta)
    db.session.commit()
    return format_receta(receta)

# recuperar todas las recetas
@app.route('/recetas', methods = ['GET'])
def get_recetas():
    recetas = Receta.query.order_by(Receta.id.asc()).all()
    lista_recetas = []
    for receta in recetas:
        lista_recetas.append(format_receta(receta))
    return {'recetas': lista_recetas}

# recuperar una receta
@app.route('/recetas/<id>', methods = ['GET'])
def get_receta(id):
    receta = Receta.query.filter_by(id=id).one()
    formatted_receta = format_receta(receta)
    return {'receta': formatted_receta}

# borrar una receta
@app.route('/recetas/<id>', methods = ['DELETE'])
def delete_receta(id):
    receta = Receta.query.filter_by(id=id).one()
    db.session.delete(receta)
    db.session.commit()
    return f'Receta (id: {id}) eliminada!'

# actualizar receta
@app.route('/recetas/<id>', methods = ['PUT'])
def update_receta(id):
    receta = Receta.query.filter_by(id=id)
    ingredientes = request.json['ingredientes']
    preparacion = request.json['preparacion']
    receta.update(dict(ingredientes = ingredientes, preparacion = preparacion))
    db.session.commit()
    return {'receta': format_insumo(receta.one())}

if __name__ == '__main__':
    app.run()