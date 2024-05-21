import './App.css'
import {useLayoutEffect, useState} from "react";
import ContactList from "./ContactList.jsx";

function App() {
  const [contacts, setContacts] = useState([]);

  useLayoutEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch('http://127.0.0.1:5000/contacts');
    const data = await response.json();
    setContacts(data.contacts)
  }

  return <ContactList contacts={contacts} />
}

export default App
