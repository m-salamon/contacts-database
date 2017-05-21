/* global $*/

(function () {
    "use strict";

    var theTableBody = $('#contacts tbody'),
        contacts = [],
        dialog = $('#dialog'),
        firstNameInput = $('#firstName'),
        lastNameInput = $('#lastName'),
        emailInput = $('#email'),
        phoneInput = $('#phone'),
        addContactForm = $('#addContactForm');


    function addContact(contact) {
        if(contacts.find(function(c){
           return c.id === contact.id; 
        })){
            return;   
        }     
        contacts.push(contact);
        
        console.log(contact);
        
        if (contacts.length === 1) {
            theTableBody.empty();
        }

        theTableBody.append(
            '<tr>' +
            '<td>' + contact.firstName + '</td>' +
            '<td>' + contact.lastName + '</td>' +
            '<td>' + contact.email + '</td>' +
            '<td>' + contact.phone + '</td>' +
            '<td><button id=' + contact.id + '  class="deleteIcon">delete</button></td>' +
            '</tr>'
        );

        $('#' + contact.id).click(function () {
                var that = this;
            $.post('deleteContacts.php', {
                id: contact.id
            }, function (data) {
                console.log(data, 'contact deleted');
                $(that).closest('tr').remove();
                var index = contacts.findIndex(function (elem){
                return elem.id === contact.id;
            });   
                contacts.slice(index, 1);
                console.log('deleted contacts',contacts);
            }).fail(function (jqxhr) {
                alert(jqxhr.statusText);
            });
            
            
            
        });

    }




    $('#addContact').click(function () {
        dialog.show();
    });

    function hideDialog() {
        dialog.hide();
        addContactForm[0].reset();
    }

    addContactForm.submit(function (event) {
        var contact = {
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            email: emailInput.val(),
            phone: phoneInput.val()
        };
        
        $.post('addContacts.php', {
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            email: emailInput.val(),
            phone: phoneInput.val()
        }, function (id) {
            contact.id = id;
            addContact(contact);

        }).fail(function(jqXHR,a,b) {
            console.log('Error:', jqXHR, a, b);
            pcs.messagebox.show('Error: ' + jqXHR.responseText);
        });
        
        
        hideDialog();
        event.preventDefault();
    });

    $('#cancel').click(function () {
        hideDialog();
    });

    var  loadContacts = $('#loadContacts');
    loadContacts.click(function () {
        load();
     });
    
    function load() {
    
        
        /*$.get('contacts.data', function (loadedContactsString) {
            console.log(loadedContactsString);
            var loadedContacts = JSON.parse(loadedContactsString);
            loadedContacts.forEach(function (contact) {
                addContact(contact);
            });*/
        /*$.getJSON('contacts.data', function (loadedContacts) {
            console.log(loadedContacts);
            loadedContacts.forEach(function (contact) {
                addContact(contact);
            });*/
        $.getJSON('getContacts.php', function (loadedContacts) {
            console.log(loadedContacts);
            loadedContacts.forEach(function (contact) {
                addContact(contact);
            });
        }).fail(function (jqxhr) {
            alert(jqxhr.statusText);
        });
       
   
    
    }
    //its called "polling", the browser is responsible to get updated data
    setInterval(load, 2000);
    
    
    
    
}());
