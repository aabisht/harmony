$(document).ready(function() {
    var groupData, groupUsersData, userGridOptions;

    var columnDefs = [
        {headerName: "First Name", field: "name.first"},
        {headerName: "Last Name", field: "name.last"},
        {headerName: "Email", field: "email", minWidth: 350},
        {headerName: "Primary Banner", field: "primary_banner"},
        {headerName: "Action", field: "action", cellRenderer: 'userAction'},
    ];

    userGridOptions = {
        defaultColDef: {
            resizable: true,
            sortable:true,
            filter: true
        },
        columnDefs: columnDefs,
        suppressContextMenu:true,
        pagination: true,
        paginationPageSize: 10,
        paginationNumberFormatter: function(params) {
            return '' + params.value.toLocaleString() + '';
        },
        onGridReady: function(params) {
          params.api.sizeColumnsToFit();
        },
        components: {
          'userAction': UserAction
        }
    };

    // cell renderer class
    function UserAction() {}

    // init method gets the details of the cell to be rendere
    UserAction.prototype.init = function(params) {
      // debugger;
      this.eGui = document.createElement('div');
      this.eGui.classList.add('datatabel-action-btn-wrapper');
      this.eGui.classList.add('text-right');
      this.eGui.innerHTML = '<a href="javascript:;" title="Delete User" class="deleteUser"><i class="fas fa-trash-alt"></i></a>';
    };

    UserAction.prototype.getGui = function() {
        return this.eGui;
    };
    
    var gridDiv = document.querySelector('#userDataTable');
    new agGrid.Grid(gridDiv, userGridOptions);   


    $.get("data/groups-management.json", function(data, status){
        groupData = data;
        $(data).each(function(i) {
            $('.groups-name-list').append('<li><a href="javascript:;"><i class="fas fa-user-friends"></i> '+ this.groups +'</a></li>');

            if(i === 0) {
                $('.groups-name-list li').addClass('active');
                activeGpData(this);
            }
        });
    });

    
    $('body').on('click', '.groups-name-list a', function(event) {
        event.preventDefault();
        var gpName = $(this).text().trim();
        var gpData = {};
        $(groupData).each(function() {
            if(this.groups === gpName) {
                gpData = this;
            }
        });
        activeGpData(gpData);
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');

    });

    function activeGpData(gpData) {

        userGridOptions.api.setRowData(gpData.users);

        if(gpData.view_item === true) {
            $('#group_management_view_item').prop("checked", true);
        } else {
            $('#group_management_view_item').prop("checked", false);
        }

        if(gpData.add_item === true) {
            $('#group_management_add_item').prop("checked", true);
        } else {
            $('#group_management_add_item').prop("checked", false);
        }

        if(gpData.update_item === true) {
            $('#group_management_update_item').prop("checked", true);
        } else {
            $('#group_management_update_item').prop("checked", false);
        }

        if(gpData.view_promo === true) {
            $('#group_management_view_promo').prop("checked", true);
        } else {
            $('#group_management_view_promo').prop("checked", false);
        }

        if(gpData.add_promo === true) {
            $('#group_management_add_promo').prop("checked", true);
        } else {
            $('#group_management_add_promo').prop("checked", false);
        }
    }
});