$(document).ready(function() {
    var groupData, groupUsersData = [];
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
        // debugger;
        groupUsersData = gpData.users;
        $('.groups-users-list').children().remove();
        $(gpData.users).each(function(i) {
            $('.groups-users-list').append('<li><i class="fas fa-user"></i> '+this.name.first+' '+this.name.last+'</li>');
        });

        // $('.groups-description-wrapper p').text(gpData.description);

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