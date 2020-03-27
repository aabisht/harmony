$(document).ready(function() {
    if($('#adPlannerTemplates').length > 0) {
        var adPalnerTamplate = $('#adPlannerTemplates').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            lazyLoad: 'ondemand',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    $('body').on('click', '.templateSelectorBtn', function(event) {
        event.preventDefault();
        $(this).closest('.ad-planer-template').siblings().find('.templateSelectorBtn').removeClass('disabled');
        $(this).closest('.ad-planer-template').siblings().removeClass('selected-template');
        $(this).closest('.ad-planer-template').addClass('selected-template');
        $(this).addClass('disabled');
        window.location.href = $(this).attr('href');
    });

    $('body').on('change', '.templateSelectorRadio', function(event) {
        event.preventDefault();
        $('.ad-planer-template-selection-items-wrapper').removeClass('active');
        $('.ad-planer-template-selection-items-wrapper').hide();
        $($(this).attr('data-target')).addClass('active');
        $($(this).attr('data-target')).show();
    });


    var gridOptions, adPromoItemDetailDatatableData = [], adPromoItemSearchDatatableGridData, adPromoItemDetailDatatableGridData, gridOptionsPriorAd;

    var columnDefs = [
        {
            headerName: "TPOS", 
            field: "tpos",
            minWidth: 200, 
            editable: false
        },
        {headerName: "Department", field: "department", editable: true},
        {headerName: "Due Date", field: "due_date", editable: true},
        {headerName: "Action", field: "action", cellRenderer: 'gridAction', editable: false},
    ];

    var adPromoItemSearchDatatableColDefs = [
      {
        headerName: "UPC", 
        field: "upc",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        minWidth: 240
      },
      {headerName: "Unit Size", field: "unit_size"},
      {headerName: "Regular Retail", field: "regular_retail"},
      {headerName: "Deal Value", field: "deal_value"},
      {headerName: "Reg Unit Cost", field: "reg_unit_cost"},
      {headerName: "Deal Start Date", field: "deal_start_date"},
      {headerName: "Deal End Date", field: "deal_end_date"},
      {headerName: "Linked Code", field: "linked_code", cellRenderer: 'linkedCode'},
    ],
    adPromoItemDetailDatatable = [
        {
            headerName: "UPC", 
            field: "upc",
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            minWidth: 240,
            editable: false
        },
        //   {headerName: "TPOS", field: "tpos", editable: true},
          {headerName: "Description", field: "description", editable: true},
          {headerName: "Department", field: "department", editable: true},
          {headerName: "Unit Size", field: "unit_size", editable: true},
          {headerName: "Ad Multiplier", field: "ad_multiplier", editable: true},
          {headerName: "Ad Retail", field: "ad_retail", editable: true},
          {headerName: "Regular Retail", field: "regular_retail", editable: true},
          {headerName: "Linked Code", field: "linked_code", editable: true},
          {headerName: "Sign Text 1", field: "sign_text_1", editable: true},
          {headerName: "Sign Text 2", field: "sign_text_2", editable: true},
          {headerName: "Sign Text 3", field: "sign_text_3", editable: true},
        //   {headerName: "Action", field: "action", editable: false, cellRenderer: 'priorAdAction', minWidth: 240}
    ],
    colDefsManageTPOS = [
        {
            headerName: "TPOS", 
            field: "tpos",
            minWidth: 240,
            cellRenderer: 'agGroupCellRenderer'
        },
        {headerName: "Department", field: "department"},
        {headerName: "Ad Fee", field: "ad_fee"},
        {headerName: "Due Date", field: "due_date"},
        {headerName: "Sign Text 1", field: "sign_text_1"},
        {headerName: "Sign Text 2", field: "sign_text_2"},
        {headerName: "Sign Text 3", field: "sign_text_3"},
        {headerName: "TPOS Status", field: "tpos_Status"},
        {headerName: "Action", field: "action", cellRenderer: 'manageTPOSAction'},
    ],
    priorAdcolDefs = [
        // {
        //     headerName: "Ad", 
        //     field: "ad",
        //     minWidth: 240,
        //     headerCheckboxSelection: true,
        //     headerCheckboxSelectionFilteredOnly: true,
        //     checkboxSelection: true,
        // },
        {headerName: "TPOS", field: "tpos", minWidth: 240, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true,},
        {headerName: "UPC", field: "upc"},
        {headerName: "Description", field: "description"},
        {headerName: "Department", field: "department"},
        {headerName: "Start Date", field: "start_date"},
        {headerName: "End Date", field: "end_date"},
        {headerName: "Unit Size", field: "unit_size"},
        {headerName: "AD Multiplier", field: "ad_multiplier"},
        {headerName: "AD Retail", field: "ad_retail"},
        {headerName: "Regular Retail", field: "regular_retail"},
        {headerName: "Linked Code", field: "linked_code"},
        {headerName: "Sign text 1", field: "sign_text_1"},
        {headerName: "Sign text 1", field: "linked_code"},
        {headerName: "Sign text 1", field: "linked_code"},
        // {headerName: "Action", field: "action", cellRenderer: 'priorAdAction'},
    ];

    if($('#adPromoItemPriorAdsDatatable1').length > 0 || $('#adPromoItemPriorAdsDatatable2').length > 0 || $('#adPromoItemPriorAdsDatatable3').length > 0) {
        $.get("data/ad-promo-prior-ad.json", function(data, status){
            gridOptionsPriorAd = {
                defaultColDef: {
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                rowSelection: 'multiple',
                columnDefs: priorAdcolDefs,
                rowData: data,
                pagination: true,
                paginationPageSize: 10,
                components: {
                    'priorAdAction': PriorAdAction
                },
            };

            var gridDiv1 = document.querySelector('#adPromoItemPriorAdsDatatable1'),
                gridDiv2 = document.querySelector('#adPromoItemPriorAdsDatatable2'),
                gridDiv3 = document.querySelector('#adPromoItemPriorAdsDatatable3');

            new agGrid.Grid(gridDiv1, gridOptionsPriorAd);
            new agGrid.Grid(gridDiv2, gridOptionsPriorAd);
            new agGrid.Grid(gridDiv3, gridOptionsPriorAd);  
        });
    }

    if($('#datatableAdPlanerCustomTemplate').length > 0) {
        $.get("data/ad-panner-tpos-mapping.json", function(data, status){
            gridOptions = {
                defaultColDef: {
                    editable: true,
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                columnDefs: columnDefs,
                rowData: data,
                pagination: true,
                paginationPageSize: 10,
                editType: 'fullRow',
                onRowSelected: onRowSelected,
                onSelectionChanged: onSelectionChanged,
                paginationNumberFormatter: function(params) {
                    return '[' + params.value.toLocaleString() + ']';
                },
                components: {
                    'gridAction': GridAction
                },
                onGridReady: function(params) {
                    params.api.sizeColumnsToFit();
                },
                onRowValueChanged: function(event) {
                    M.toast({html: '<strong><i>'+ event.data.tpos +'</i></strong>&nbsp;value update.'});
                }
            };

            var gridDiv = document.querySelector('#datatableAdPlanerCustomTemplate');
            new agGrid.Grid(gridDiv, gridOptions);  
        });
    }
    
    if($('#adPromoItemSearchDatatable').length > 0 || $('#adPromoItemDetailDatatable').length>  0) {
        $.get("data/add-promo-item-detail.json", function(data){
            adPromoItemSearchDatatableGridData = {
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                stopEditingWhenGridLosesFocus: false,
                columnDefs: adPromoItemSearchDatatableColDefs,
                rowData: data,
                pagination: true,
                paginationPageSize: 10,
                rowSelection: 'multiple',
                onSelectionChanged: onSelectionChanged,
                paginationNumberFormatter: function(params) {
                    return '[' + params.value.toLocaleString() + ']';
                },
                components: {
                'linkedCode': LinkedCode
                },
                onRowSelected: onRowSelected,
                onGridReady: function(params) {
                }
            };
          var adPromoItemSearchDatatableDiv = document.querySelector('#adPromoItemSearchDatatable');
          new agGrid.Grid(adPromoItemSearchDatatableDiv, adPromoItemSearchDatatableGridData);  
          idemDetailGridRender();
        });
    }

    if($('#adPromoItemManageTPOS').length > 0) {
        $.get("data/add-promo-manage-tpos-item-detail.json", function(data){
            gridOptionsManageTPOS = {
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                columnDefs: colDefsManageTPOS,
                rowData: data,
                pagination: true,
                paginationPageSize: 20,
                masterDetail: true,
                suppressContextMenu:true,
                components: {
                'manageTPOSAction': manageTPOSAction
                },
                detailCellRendererParams: {
                    detailGridOptions: {
                        columnDefs: [
                            {headerName: "UPC", field: "upc"},
                            {headerName: "Description", field: "description"},
                            {headerName: "Unit Size", field: "unit_size"},
                            {headerName: "Ad Multiplier", field: "ad_multiplier"},
                            {headerName: "Ad Retail", field: "ad_retail"},
                            {headerName: "Regular Retail", field: "regular_retail"},
                            {headerName: "Linked Code", field: "linked_code"},
                        ],
                    },
                    getDetailRowData: function(params) {
                        params.successCallback(params.data.item_details);
                    }
                }
            };

            var gridDivManageTPOS = document.querySelector('#adPromoItemManageTPOS');
            new agGrid.Grid(gridDivManageTPOS, gridOptionsManageTPOS);   
        });
    }

    function idemDetailGridRender() {

        if(window.location.pathname === '/bulk-maintenance.html' || window.location.pathname === '/bulk-maintenance-data.html' || window.location.pathname === '/bulk-maintenance-adv-search.html') {
            adPromoItemDetailDatatable.splice(1, 0, {headerName: "TPOS", field: "tpos", editable: true});
        }

        adPromoItemDetailDatatableGridData = {
            defaultColDef: {
                editable: true,
                resizable: true,
                sortable:true,
                filter: true
            },
            stopEditingWhenGridLosesFocus: false,
            columnDefs: adPromoItemDetailDatatable,
            rowData: adPromoItemDetailDatatableData,
            editType: 'fullRow',
            pagination: true,
            paginationPageSize: 10,
            rowSelection: 'multiple',
            onSelectionChanged: onSelectionChanged,
            paginationNumberFormatter: function(params) {
                return '[' + params.value.toLocaleString() + ']';
            },
            onRowEditingStarted: function(event){
              var _this = this;
              
              $('.saveRow').css({'display': 'inline-block'});
            },
            onRowSelected: onRowSelected,
            onGridReady: function(params) {
                // params.api.sizeColumnsToFit();
            },
            components: {
                'priorAdAction': PriorAdAction
            },
        };
        var adPromoItemDetailDatatableDiv = document.querySelector('#adPromoItemDetailDatatable');
        new agGrid.Grid(adPromoItemDetailDatatableDiv, adPromoItemDetailDatatableGridData);  
    }
    
    function onRowSelected(event) {
        if($(event.columnApi.columnController.columnFactory.gridOptionsWrapper.environment.eGridDiv).attr('id') === 'adPromoItemSearchDatatable') {
            adPromoItemDetailDatatableData = adPromoItemSearchDatatableGridData.api.getSelectedRows();
            adPromoItemDetailDatatableGridData.api.setRowData(adPromoItemDetailDatatableData);
        }
    }

    function onSelectionChanged(event) {
    //   var rowCount = event.api.getSelectedNodes().length;
    //   console.log('selection changed, ' + rowCount + ' rows selected');
    //   if(rowCount > 0) {
    //     $('#select-row-num').html('('+rowCount + ' <span>selected</span>'+')');
    //   } else {
    //     $('#select-row-num').html('');
    //   }
    }

    // cell renderer class
    function GridAction() {}

    // init method gets the details of the cell to be rendere
    GridAction.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        var html = '';
        html = '<a href="/add-promo-item-detail.html" title="Edit" class="button-primary button-stroked" ><i class="far fa-edit"></i></a>';
        this.eGui.innerHTML = html;
    };

    GridAction.prototype.getGui = function() {
        return this.eGui;
    };

    // cell renderer class
    function LinkedCode() {}

    // init method gets the details of the cell to be rendere
    LinkedCode.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        var html = '';
        html = '<a href="javascript:;" title="Edit" class="button-primary button-stroked" >Link Code</a>';
        this.eGui.innerHTML = html;
    };

    LinkedCode.prototype.getGui = function() {
        return this.eGui;
    };

    $('body').on('click', '.saveRow', function(event) {
        event.preventDefault();
        adPromoItemDetailDatatableGridData.api.stopEditing();
        $(this).hide();
    });
    
    function manageTPOSAction() {}

    // init method gets the details of the cell to be rendere
    manageTPOSAction.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        var status = Math.floor(Math.random() * 2) + 1;
        var html = '';
        // if(status === 1) {
            html = '<a href="javascript:;" title="Approve" class="button-primary button-stroked" >Approve</a><a href="javascript:;" title="Reject" class="button-primary button-stroked" >Reject</a>';
        // } else {
            // html = '<a href="javascript:;" title="Re-open" class="button-primary button-stroked" >Re-open</a>';
        // }
        this.eGui.innerHTML = html;
    };

    manageTPOSAction.prototype.getGui = function() {
        return this.eGui;
    };

    function PriorAdAction() {}

    // init method gets the details of the cell to be rendere
    PriorAdAction.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        html = '<a href="" title="Submit" class="button-primary button-stroked">Save</a><a href="" title="Submit" class="button-primary button-stroked" >Submit</a>';
        this.eGui.innerHTML = html;
    };

    PriorAdAction.prototype.getGui = function() {
        return this.eGui;
    };

    $('body').on('click', '.saveRow', function(event) {
        event.preventDefault();
        adPromoItemDetailDatatableGridData.api.stopEditing();
        $(this).hide();
    });

    $('body').on('change', '#showEventInput', function(event) {
        event.preventDefault();
        // debugger;
        if($(this).prop('checked') === true) {
            $('.ad-panner-ad-search-input').hide();
        } else {
            $('.ad-panner-ad-search-input').show();
        }
    });

    $('body').on('click', '.tposAssinmentSave', function(event) {
        event.preventDefault();
        gridOptions.api.stopEditing();
        M.toast({html: '<strong><i>'+ $(this).attr('data-tpos') +'</i></strong>&nbsp;value update.'})
    });
    
    $('body').on('click', '.leftSidebarToggle', function(event) {
        event.preventDefault();
        $('.left-sidebar-wrapper').toggle();
        $('.right-content-wrapper').toggleClass('col-lg-9 col-sm-8');
        $('.right-content-wrapper').toggleClass('col-sm-12');
        // debugger;
    });
    
});