// Initialize contacts array
let contacts = [];

// Function to add a contact
function addContact(name, contact) {
    // Check if the contact already exists
    const existingContact = contacts.find(c => c.name === name || c.contact === contact);
    if (existingContact) {
        alert("This contact already exists!");
        return;
    }

    // Add the new contact
    contacts.push({ name, contact });

    // Sort the contacts by name
    sortContacts();

    // Clear the form inputs
    $('#name').val('');
    $('#contact').val('');

    // Update the contacts table
    updateContactsTable();
}

// Function to update the contacts table
function updateContactsTable() {
    const tbody = $('#contactsTable tbody');
    tbody.empty();


    // Loop through the contacts and add them to the table
    for (const contact of contacts) {
        const tr = $('<tr>');

        // Add the name and contact columns
        tr.append($('<td>').text(contact.name));
        tr.append($('<td>').text(contact.contact));

        // Add the delete button column
        const deleteBtn = $('<button>').addClass('deleteBtn').text('Delete');
        deleteBtn.click(() => {
            if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
                contacts = contacts.filter(c => c !== contact);
                updateContactsTable();
            }

        });

        tr.append($('<td>').addClass('action').append(deleteBtn));
        tbody.append(tr);
    }
}

// Function to sort the contacts by name
function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

// Function to filter the contacts by name
function filterContacts(name) {
    return contacts.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
}

// Initialize the contacts table
updateContactsTable();

// Add event listener for the form submit
$('form').submit(e => {
    e.preventDefault();
    const name = $('#name').val().trim();
    const contact = $('#contact').val().trim();

    if (name && contact) {
        addContact(name, contact);
    }
});

// Add event listener for the search button
$('#searchBtn').click(() => {
    const name = $('#search').val().trim();
    const filteredContacts = filterContacts(name);
    // Update the contacts table with the filtered contacts
    contacts = filteredContacts;
    updateContactsTable();
});

// Add event listener for the sort button
$('#contactsTable thead th:first-child').click(() => {
    sortContacts();
    updateContactsTable();
});