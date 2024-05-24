import {useState} from "react";

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [name, setName] = useState(existingContact.name || '')
    const [email, setEmail] = useState(existingContact.email || '')
    const [phone, setPhone] = useState(existingContact.phone || '')

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            email,
            phone
        }
        const url = `${import.meta.env.VITE_API_URL}contacts` + (updating ? `/${existingContact.id}` : '' )
        const options = {
            method: updating ? 'PATCH' : 'POST',
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
            updateCallback()
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
        <button type="submit">{ updating ? 'Update' : 'Create'}</button>
        <button type="button" onClick={updateCallback}>Cancel</button>
    </form>
}

export default ContactForm
