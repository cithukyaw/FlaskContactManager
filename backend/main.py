from flask import request, jsonify
from config import app, db
from models import Contact


@app.route('/')
def index():
    return '<h1>FlaskContactManager API</h1>'


# Read
@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({'contacts': json_contacts})


# Create
@app.route('/contacts', methods=['POST'])
def create_contact():
    name = request.json.get('name')
    email = request.json.get('email')

    if not name or not email:
        return jsonify({'message': 'You must include a name and email.'}), 400

    contact = Contact(name=name, email=email)
    try:
        db.session.add(contact)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Contact created'}), 201


# Update
@app.route('/contacts/<int:contact_id>', methods=['PATCH'])
# Update
def update_contact(contact_id: int):
    contact = db.session.get(Contact, contact_id)

    if not contact:
        return jsonify({'message': 'Contact not found'}), 404

    data = request.json
    contact.name = data.get('name', contact.name)
    contact.email = data.get('email', contact.email)

    db.session.commit()

    return jsonify({'message': 'Contact updated'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)