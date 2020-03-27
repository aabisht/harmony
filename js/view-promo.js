$(document).ready(function() {
  var gridOption1, gridOption2, gridOption3, adPromoItemSearchDatatableOption, 
    mainData = {
      data_1: [],
      data_2: [],
      data_3: []
    },
    collapsibleInstance = M.Collapsible.getInstance(document.querySelector('.collapsible'));;

  var columnDefs = [
    {
      headerName: "Ad Name", 
      field: "ad_name",
      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      // checkboxSelection: true,
      minWidth: 240
    },
    // {headerName: "Department", field: "department", editable: true},
    {headerName: "Start Date", field: "start_date", editable: true},
    {headerName: "End Date", field: "end_date", editable: true},
    {headerName: "Deadline", field: "deadline", editable: true},
    {headerName: "Status", field: "status", editable: true},
    {headerName: "", field: "action", editable: false, cellRenderer: 'gridAction'}
  ];

  $.get("data/view-promo.json", function(data){

    $(data).each(function() {
      if(this.event_name === "Event 1") {
        mainData.data_1.push(this);
      } else if(this.event_name === "Event 2") {
        mainData.data_2.push(this);
      } else if(this.event_name === "Event 3") {
        mainData.data_3.push(this);
      }
    });

    // Grid 1
    gridOption1 = gridOptionFunction(mainData.data_1);
    var gridDiv1 = document.querySelector('#viewPromoData1');
    new agGrid.Grid(gridDiv1, gridOption1);  

    // Grid 2
    gridOption2 = gridOptionFunction(mainData.data_2);
    var gridDiv2 = document.querySelector('#viewPromoData2');
    new agGrid.Grid(gridDiv2, gridOption2); 
    
    // Grid 2
    gridOption3 = gridOptionFunction(mainData.data_3);
    var gridDiv3 = document.querySelector('#viewPromoData3');
    new agGrid.Grid(gridDiv3, gridOption3); 

  });

  
  function gridOptionFunction(data) {
    var gridOptionsData = {
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
      onSelectionChanged: onSelectionChanged,
      paginationNumberFormatter: function(params) {
          return '[' + params.value.toLocaleString() + ']';
      },
      components: {
        'gridAction': GridAction
      },
      onRowEditingStarted: function(event){
        if(event.data.event_name === 'Event 1') {
          $('.saveRow[data-grid="grid1"]').css({'display': 'inline-block'});
        } else if(event.data.event_name === 'Event 2') {
          $('.saveRow[data-grid="grid2"]').css({'display': 'inline-block'});
        } else if(event.data.event_name === 'Event 3') {
          $('.saveRow[data-grid="grid3"]').css({'display': 'inline-block'});
        }
      },
      onGridReady: function(params) {
          params.api.sizeColumnsToFit();
      },
      onRowValueChanged: function(event) {
        M.toast({html: '<strong>'+ event.data.event_name + '</strong>&nbsp; tab with add name &nbsp;<strong class="text-capitalize"><i>' + event.data.ad_name + '</i></strong>&nbsp; updated.'});
      }
    };

    return gridOptionsData;
  }

  // cell renderer class
  function GridAction() {}

  // init method gets the details of the cell to be rendere
  GridAction.prototype.init = function(params) {
    // debugger;
    this.eGui = document.createElement('div');
    this.eGui.classList.add('button-wrapper');
    this.eGui.classList.add('table-action-wrapper');
    if(window.location.pathname === '/add-promo-template-selection.html') { 
      this.eGui.innerHTML = '<a href="#adPromoTemplate" title="Select" class="button-primary button-stroked modal-trigger">View Template</a><a href="/add-promo-custom-template.html" title="Select" class="button-primary button-stroked">Copy Template</a>';
    } else {
      this.eGui.innerHTML = '<a href="/add-promo-custom-template.html" title="View Ad" class="button-primary button-stroked">View Ad</a>';
    }
  };

  GridAction.prototype.getGui = function() {
      return this.eGui;
  };

  function getGrid(gridName) {
    if(gridName === "grid1"){
      return gridOption1;
    } else if(gridName === "grid2"){
      return gridOption2;
    } else if(gridName === "grid3"){
      return gridOption3;
    }
  }

  function onRowSelected(event) {
    console.log("row " + event.node.data.upc + " selected = " + event.node.selected);
  }

  function onSelectionChanged(event) {
    var rowCount = event.api.getSelectedNodes().length;
    console.log('selection changed, ' + rowCount + ' rows selected');
  }

  
  $('body').on('change', '.onPageSizeChanged', function(event) {
      event.preventDefault();
      var value = $(this).val(),
          gridOption = getGrid($(this).attr('data-grid'));
      gridOption.api.paginationSetPageSize(Number(value));
  });

  $('body').on('click', '.saveRow', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var gridOption = getGrid($(this).attr('data-grid'));
    gridOption.api.stopEditing()
    $(this).hide();
  });

  $('body').on('click', '.collapsible > li .collapsible-header', function() {
    gridOption1.api.sizeColumnsToFit();
    gridOption2.api.sizeColumnsToFit();
    gridOption3.api.sizeColumnsToFit();
  });
});