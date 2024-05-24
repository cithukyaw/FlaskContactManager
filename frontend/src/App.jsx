import './App.css'
import {useEffect, useState} from "react";
import ContactList from "./ContactList.jsx";
import ContactForm from "./ContactForm.jsx";

function App() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}contacts`)
        const data = await response.json();
        setContacts(data.contacts)
    }

    const closeModel = () => {
        setIsModalOpen(false);
    }

    const openCreateModel = () => {
        setCurrentContact({})
        if (!isModalOpen) setIsModalOpen(true);
    }

    const openEditModel = (contact) => {
        if (isModalOpen) return
        setCurrentContact(contact)
        setIsModalOpen(true)
    }

    const onUpdate = () => {
        closeModel()
        fetchContacts()
    }

    return (
        <>
            <ContactList contacts={contacts} updateContact={openEditModel} updateCallback={onUpdate} />
            <button onClick={openCreateModel}>Create New Contact</button>
            { isModalOpen &&
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModel}>&times;</span>
                        <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
                    </div>
                </div>
            }
        </>
    )
}

export default App
