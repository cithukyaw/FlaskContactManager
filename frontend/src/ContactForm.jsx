import {useState} from "react";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            email,
            phone
        }
        const url = 'http://127.0.0.1:5000/contacts'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const json = await response.json()
            alert(json.message)
        } else {
            // successful
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="phone">Phone:</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </div>
        <button type="submit">Create Contact</button>
    </form>
}

export default ContactForm
