const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: 'DELETE',
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}contacts/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.log(response.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Contact Manager</h2>
        { contacts.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <button onClick={() => updateContact(contact)}>Update</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            :
            <h3>No contact yet. Create a new contact!</h3>
        }
    </div>
}

export default ContactList
