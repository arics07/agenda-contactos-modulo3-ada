const API_URL = '/api/contacts'; //URL base para las solicitiudes

const form = document.getElementById('contact-form');
// es el id del form en el archivo html
//formulario para agregar contactos

const contactsTable = document.getElementById('contacts-table');


//Función para obtener los contactos desde el back
async function fetchContacts() {
    const res = await fetch(API_URL);
    //realiza una solicitud GET al back

    const contacts = await res.json();
    //convierte la rta en un array

    renderContacts(contacts);

};

// Función que renderiza todos los contactos (en una tabla)
function renderContacts(contacts) {
    contactsTable.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="delete-btn" onclick="deleteContact('${contact.id}')">Eliminar</button>
            </td>
        </tr>
        `).join('');
};


//Manejar el evento de enviar el formulario para agregar un contacto
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //evita que la página se recargue automáticamente
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value; 
    const phone = document.getElementById('phone').value;

    //Enviar esta solicitud al backend
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), name, email, phone }),
    });

    form.reset();

    fetchContacts();

});


async function deleteContact(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchContacts();
};


fetchContacts();