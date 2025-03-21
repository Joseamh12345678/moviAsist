from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/saludar', methods=['POST'])
def saludar():
    data = request.get_json()
    nombre = data.get("nombre", "Usuario")
    return jsonify({"mensaje": f"¡Hola, {nombre}! Este mensaje viene desde Python"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)  # Permite acceso desde Expo
