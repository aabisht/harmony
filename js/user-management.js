$(document).ready(function() {

    var userTableWrapper = $('#usersCards');
    userTableWrapper.addClass('user-cards-wrapper');
    var fNameData = {}, lNameData = {}, userEmailData = {};

    var gridOptions;
    var columnDefs = [
      {headerName: "", field: "icon", width: 70, cellRenderer: 'userTypeIcon', editable: false},
      {headerName: "First Name", field: "name.first", editable: true},
      {headerName: "Last Name", field: "name.last", editable: true},
      {headerName: "Email", field: "email", editable: true, minWidth: 330},
      {headerName: "Primary Banner", field: "banner", editable: true},
      {headerName: "Department", field: "department", editable: true},
      {headerName: "Supervisor", field: "supervisor", editable: true},
      {headerName: "Group", field: "group", editable: true},
      {headerName: "Action", field: "action", cellRenderer: 'userAction', editable: false},
    ];

    $.get("data/users.json", function(data, status){
      $(data).each(function(i) {
        userEmailData[this.email] = null;
        // searchData[this.name.first+' '+this.name.last] = null;
        fNameData[this.name.first] = null;
        lNameData[this.name.last] = null;
      });

      gridOptions = {
        defaultColDef: {
          editable: true,
          resizable: true,
          sortable:true,
          filter: true
        },
        stopEditingWhenGridLosesFocus: false,
        columnDefs: columnDefs,
        rowData: data,
        editType: 'fullRow',
        pagination: true,
        paginationPageSize: 10,
        onRowEditingStarted: function(event){
          $('.saveRow').removeClass('disabled');
        },
        paginationNumberFormatter: function(params) {
            return '' + params.value.toLocaleString() + '';
        },
        components: {
          'userTypeIcon': UserTypeIcon,
          'userAction': UserAction
        },
      };

      var gridDiv = document.querySelector('#datatable');
      new agGrid.Grid(gridDiv, gridOptions);  


      // cell renderer class
      function UserTypeIcon() {}

      // init method gets the details of the cell to be rendere
      UserTypeIcon.prototype.init = function(params) {
        // debugger;
        this.eGui = document.createElement('div');
        this.eGui.classList.add('user-type-icon-wrapper');
        this.eGui.classList.add('datatabel-action-btn-wrapper');
        this.eGui.innerHTML = '<a href="javascript:;" class="userBannerTrigger"><i class="far fa-user-circle"></i></a>';
      };

      UserTypeIcon.prototype.getGui = function() {
          return this.eGui;
      };

      // cell renderer class
      function UserAction() {}

      // init method gets the details of the cell to be rendere
      UserAction.prototype.init = function(params) {
        // debugger;
        this.eGui = document.createElement('div');
        this.eGui.classList.add('datatabel-action-btn-wrapper')
        this.eGui.innerHTML = '<a href="javascript:;" title="Reset Password" class="resetPassword"><i class="fas fa-key"></i></a><a href="javascript:;" title="Delete User" class="deleteUser"><i class="fas fa-trash-alt"></i></a>';
      };

      UserAction.prototype.getGui = function() {
          return this.eGui;
      };

      $('.dropdown-trigger').dropdown();
      $('select').formSelect();

      $('#first_name').autocomplete({
        data: fNameData,
      });
      $('#last_name').autocomplete({
        data: lNameData,
      });
      $('#user_email').autocomplete({
        data: userEmailData,
      });
    });
      
    var userBannerModalInstanse = M.Modal.getInstance(document.querySelector('#userBannerModal')),
        resetPasswordModalInstanse = M.Modal.getInstance(document.querySelector('#resetPasswordModal')),
        updateItemRowModalInstanse = M.Modal.getInstance(document.querySelector('#updateItemRowModal'));;

    $('body').on('click', '.userBannerTrigger', function(event) {
      event.preventDefault();
      userBannerModalInstanse.open();
    });

    $('body').on('click', '.resetPassword', function(event) {
      event.preventDefault();
      resetPasswordModalInstanse.open();
    });
    
    $('body').on('click', '.deleteUser', function(event) {
      event.preventDefault();
      updateItemRowModalInstanse.open();
    });

    $('body').on('click', '.saveRow', function(event) {
        event.preventDefault();
        $(this).addClass('disabled');
        gridOptions.api.stopEditing();
    });

  });