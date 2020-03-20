$(document).ready(function() {
    $('#adPlannerTemplates').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
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


    var gridOptions;

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
                'gridAction': GidAction
            },
            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
            }
        }

        var gridDiv = document.querySelector('#datatableAdPlanerCustomTemplate');
        new agGrid.Grid(gridDiv, gridOptions);  
    });

    function onRowSelected(event) {
      console.log("row " + event.node.data.upc + " selected = " + event.node.selected);
    }

    function onSelectionChanged(event) {
      var rowCount = event.api.getSelectedNodes().length;
      console.log('selection changed, ' + rowCount + ' rows selected');
      if(rowCount > 0) {
        $('#select-row-num').html('('+rowCount + ' <span>selected</span>'+')');
      } else {
        $('#select-row-num').html('');
      }
    }

    // cell renderer class
    function GidAction() {}

    // init method gets the details of the cell to be rendere
    GidAction.prototype.init = function(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add('table-action-wrapper');
        this.eGui.classList.add('button-wrapper');
        var html = '';
        html = '<a href="/add-promo-item-detail.html" title="Edit" class="button-primary button-stroked" ><i class="far fa-edit"></i></a><a href="javascript:;" title="Save" class="button-primary button-stroked" ><i class="far fa-save"></i></a>';
        this.eGui.innerHTML = html;
    };

    GidAction.prototype.getGui = function() {
        return this.eGui;
    };
});