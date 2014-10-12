

(function () {

  
    function Contact(contact) {

        this.id = ko.observable(contact.id);
        this.orgType = ko.observable(contact.orgType);
        this.orgName = ko.observable(contact.orgName);
        this.contactName = ko.observable(contact.contactName);
        this.jobTitle = ko.observable(contact.jobTitle);
        this.email = ko.observable(contact.email);
        this.active = ko.observable(contact.active);
    }


    function ContactViewModel() {

        var self = this;

        self.contact = {

            id: ko.observable(),
            orgType: ko.observable(),
            orgName: ko.observable(),
            contactName: ko.observable(),
            jobTitle: ko.observable(),
            email: ko.observable(),
            active: ko.observable(true)
        };


        self.contacts = ko.observableArray([]);
        self.contactButtonText = ko.observable('Create');
        self.isListView = ko.observable(true);

       
        self.addNewContact = function () {
            self.isListView(false);
        };

        self.cancelChanges = function () {
            self.isListView(true);
            self.contactButtonText('Create');
            clearBindings();
        };

        self.saveNewContact = function () {
           
            var dataToSend = ko.toJSON(self.contact);

            makeAjaxCall('POST', '/Home/SaveContact', dataToSend, function (data) {
                
                self.contact.id(data.savedContact.id);
                self.contacts.push(new Contact($.parseJSON(ko.toJSON(self.contact))));
                self.isListView(true);
                clearBindings();
            });
        };

        //KoGrid Configuration
        self.gridOptions = {
            data: self.contacts,
            multiSelect: false,
            canSelectRows: false,
            showColumnMenu: false,
            showFilter: false,
            selectedItem: self.contact,
            columnDefs: [
                { field: 'orgType', displayName: 'Organization Type' },
                { field: 'orgName', displayName: 'Organization Name' },
                { field: 'contactName', displayName: 'Contact Name' },
                { field: 'jobTitle', displayName: 'Job Title' },
                { field: 'email', displayName: 'Email Address' },
                { field: 'active', displayName: 'Active' },
                {
                    field: 'id',
                    displayName: 'Update',
                    cellTemplate: '<button data-bind="click: function(){ $userViewModel.editContact($parent.entity); }">Edit</button>'
                },
                {
                    field: 'id',
                    displayName: 'Remove',
                    cellTemplate: '<button data-bind="click: function(){ $userViewModel.removeContact($parent.entity); }">Delete</button>'
                }
            ]
        };

        self.editContact = function (rowItem) {
            var selectedContact = $.parseJSON(ko.toJSON(rowItem));
            self.contact.id(selectedContact.id);
            self.contact.orgType(selectedContact.orgType);
            self.contact.orgName(selectedContact.orgName);
            self.contact.contactName(selectedContact.contactName);
            self.contact.jobTitle(selectedContact.jobTitle);
            self.contact.email(selectedContact.email);
            self.contact.active(selectedContact.active);
            self.contactButtonText('Update');
            self.isListView(false);
        };

        self.updateContact = function () {

            var dataToSend = ko.toJSON(self.contact);

            makeAjaxCall('PUT', '/Home/UpdateContact', dataToSend, function (data) {

                self.contacts().forEach(function (c) {
                    if (c.id() == self.contact.id()) {
                        c.orgType(self.contact.orgType());
                        c.orgName(self.contact.orgName());
                        c.contactName(self.contact.contactName());
                        c.jobTitle(self.contact.jobTitle());
                        c.email(self.contact.email());
                        c.active(self.contact.active());
                    }
                });

                self.isListView(true);
                self.gridOptions.data(self.contacts());
                self.contactButtonText('Create');
                clearBindings();
            });
        };

        self.removeContact = function (rowItem) {

            var dataToSend = ko.toJSON(rowItem);

            makeAjaxCall('DELETE', '/Home/DeleteContact', dataToSend, function (data) {

                self.contacts.remove(rowItem);
            });
        };
    };


    var contactViewModel = new ContactViewModel();

    ko.applyBindings(contactViewModel);


    //Helper functions
    var dataStoreUrl = '/Scripts/datastore.json',

        clearBindings = function () {
            contactViewModel.contact.id(null);
            contactViewModel.contact.orgType(null);
            contactViewModel.contact.orgName(null);
            contactViewModel.contact.contactName(null);
            contactViewModel.contact.jobTitle(null);
            contactViewModel.contact.email(null);
            contactViewModel.contact.active(true);
        },

        init = function () {

            getContacts();
        },

        getContacts = function () {

            $.getJSON(dataStoreUrl, {}, onSuccess);

            function onSuccess(data) {

                data.forEach(function (c) {
                    contactViewModel.contacts.push(new Contact(c));
                });
            }
        },

        makeAjaxCall = function (method, url, dataToSend, callback) {

            $.ajax({
                type: method,
                url: url,
                data: dataToSend,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    callback(data);
                },
                error: function (error) {
                    alert('something wen wrong on the during update');
                }
            });
        };

    init();

})();