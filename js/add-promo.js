$(document).ready(function() {
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
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            minWidth: 200
        },
        {headerName: "Department", field: "department"},
        {headerName: "Due Date", field: "due_date"},
        {headerName: "Action", field: "action", cellRenderer: 'gridAction'},
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
            headerName: "TPOS", 
            field: "tpos",
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            minWidth: 240, 
            editable: false
          },
          {headerName: "Department", field: "department", editable: true},
          {headerName: "UPC", field: "upc", editable: true},
          {headerName: "Description", field: "description", editable: true},
          {headerName: "Unit Size", field: "unit_size", editable: true},
          {headerName: "Ad Multiplier", field: "ad_multiplier", editable: true},
          {headerName: "Ad Retail", field: "ad_retail", editable: true},
          {headerName: "Regular Retail", field: "regular_retail", editable: true},
          {headerName: "Linked Code", field: "linked_code", editable: true},
          {headerName: "Sign Text 1", field: "sign_text_1", editable: true},
          {headerName: "Sign Text 2", field: "sign_text_2", editable: true},
          {headerName: "Sign Text 3", field: "sign_text_3", editable: true},
          {headerName: "Action", field: "action", editable: false}
    ],
    colDefsPriorAd = [
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
        {headerName: "Action", field: "action", cellRenderer: 'priorAdAction'},
    ];

    if($('#datatableAdPlanerCustomTemplate').length > 0) {
        $.get("data/ad-panner-tpos-mapping.json", function(data, status){
            gridOptions = {
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                rowSelection: 'multiple',
                columnDefs: columnDefs,
                rowData: data,
                pagination: true,
                paginationPageSize: 10,
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
                }
            }

            var gridDiv = document.querySelector('#datatableAdPlanerCustomTemplate');
            new agGrid.Grid(gridDiv, gridOptions);  
        });
    }

    
    if($('#adPromoItemSearchDatatable').length > 0) {
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

    if($('#adPromoItemPriorAdsDatatable').length > 0) {
        $.get("data/add-promo-prior-item-detail.json", function(data){
            gridOptionsPriorAd = {
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable:true,
                    filter: true
                },
                columnDefs: colDefsPriorAd,
                rowData: data,
                pagination: true,
                paginationPageSize: 10,
                masterDetail: true,
                suppressContextMenu:true,
                components: {
                'priorAdAction': PriorAdAction
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

            var gridDivPriorAd = document.querySelector('#adPromoItemPriorAdsDatatable');
            new agGrid.Grid(gridDivPriorAd, gridOptionsPriorAd);   
        });
    }

    function idemDetailGridRender() {
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
            }
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
        html = '<a href="/add-promo-item-detail.html" title="Edit" class="button-primary button-stroked" ><i class="far fa-edit"></i></a><a href="javascript:;" title="Save" class="button-primary button-stroked" ><i class="far fa-save"></i></a>';
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
    
    function PriorAdAction() {}

    // init method gets the details of the cell to be rendere
    PriorAdAction.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        var status = Math.floor(Math.random() * 2) + 1;
        var html = '';
        if(status === 1) {
            html = '<a href="javascript:;" title="Approve" class="button-primary button-stroked" >Approve</a><a href="javascript:;" title="Reject" class="button-primary button-stroked" >Reject</a>';
        } else {
            html = '<a href="javascript:;" title="Re-open" class="button-primary button-stroked" >Re-open</a>';
        }
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
    
});