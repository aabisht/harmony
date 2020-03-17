var url = new URL(window.location.href),
        paramName = url.searchParams.get("upc"),
        itemData;
$(document).ready(function() {

    if(paramName === "UPC000000001") {
        $('.footer-pre-btn').addClass('disabled');
    }
    if(paramName === "UPC00000000100") {
        $('.footer-next-btn').addClass('disabled');
    }
    
    $.get("data/view-item.json", function(data, status){
        $(data).each(function(){
            if(this.upc === paramName) {
            itemData = this;
            return false;
            }
        });

        $('.pluValue').text(itemData.plu);
        $('.description').text(itemData.description);
        

    // Item Master 1 Input data
    $('#tabItemMaster1_UPC').attr('value', paramName);
    $('#tabItemMaster1_UPC').siblings('label').addClass('active');
    $('#tabItemMaster1_PLU').attr('value', itemData.plu);
    $('#tabItemMaster1_PLU').siblings('label').addClass('active');
    $('#tabItemMaster1_UnitPriceUPC').attr('value', itemData.unit_price_upc);
    $('#tabItemMaster1_UnitPriceUPC').siblings('label').addClass('active');
    $('#tabItemMaster1_CaseUPC').attr('value', itemData.case_upc);
    $('#tabItemMaster1_CaseUPC').siblings('label').addClass('active');
    $('#tabItemMaster1_StockCode').attr('value', itemData.stockcode);
    $('#tabItemMaster1_StockCode').siblings('label').addClass('active');
    $('#tabItemMaster1_Description').attr('value', itemData.description);
    $('#tabItemMaster1_Description').siblings('label').addClass('active');
    $('#tabItemMaster1_POSDescription').attr('value', itemData.pos_description);
    $('#tabItemMaster1_POSDescription').siblings('label').addClass('active');
    $('#tabItemMaster1_AdvertisingDescription').attr('value', itemData.advertising_description);
    $('#tabItemMaster1_AdvertisingDescription').siblings('label').addClass('active');
    $('#tabItemMaster1_Brand').attr('value', itemData.brand);
    $('#tabItemMaster1_Brand').siblings('label').addClass('active');
    $('#tabItemMaster1_UnitSize').attr('value', itemData.unit_size);
    $('#tabItemMaster1_UnitSize').siblings('label').addClass('active');
    $('#tabItemMaster1_RetailPack').attr('value', itemData.retail_pack);
    $('#tabItemMaster1_RetailPack').siblings('label').addClass('active');
    $('#tabItemMaster1_CasePack').attr('value', itemData.case_pack);
    $('#tabItemMaster1_CasePack').siblings('label').addClass('active');
    $('#tabItemMaster1_PriceRule').attr('value', itemData.price_rule);
    $('#tabItemMaster1_PriceRule').siblings('label').addClass('active');
    $('#tabItemMaster1_MixMatchCode').attr('value', itemData.mix_match_code);
    $('#tabItemMaster1_MixMatchCode').siblings('label').addClass('active');
    $('#tabItemMaster1_TargetGM').attr('value', itemData.target_gm);
    $('#tabItemMaster1_TargetGM').siblings('label').addClass('active');
    $('#tabItemMaster1_LabelCode').attr('value', itemData.labelcode);
    $('#tabItemMaster1_LabelCode').siblings('label').addClass('active');
    $('#tabItemMaster1_Yield').attr('value', itemData.yield);
    $('#tabItemMaster1_Yield').siblings('label').addClass('active');
    if(itemData.out_of_season === 'True') {
        $( "#tabItemMaster1_OutOfSeason" ).prop( "checked", true );
    }
    if(itemData.coupon_ind === 'True') {
        $( "#tabItemMaster1_CouponInd" ).prop( "checked", true );
    }

    // Item Master 2 Input data
    $('#tabItemMaster2_AlternateUPC').attr('value', itemData.alternate_upc);
    $('#tabItemMaster2_AlternateUPC').siblings('label').addClass('active');
    $('#tabItemMaster2_AlternateCountRatio').attr('value', itemData.alternate_count_ratio);
    $('#tabItemMaster2_AlternateCountRatio').siblings('label').addClass('active');
    $('#tabItemMaster2_Store').attr('value', itemData.store);
    $('#tabItemMaster2_Store').siblings('label').addClass('active');
    $('#tabItemMaster2_Aisle').attr('value', itemData.aisle);
    $('#tabItemMaster2_Aisle').siblings('label').addClass('active');
    $('#tabItemMaster2_Section').attr('value', itemData.section);
    $('#tabItemMaster2_Section').siblings('label').addClass('active');
    $('#tabItemMaster2_Shelf').attr('value', itemData.shelf);
    $('#tabItemMaster2_Shelf').siblings('label').addClass('active');
    $('#tabItemMaster2_Position').attr('value', itemData.position);
    $('#tabItemMaster2_Position').siblings('label').addClass('active');
    $('#tabItemMaster2_Placement_Date').attr('value', itemData.placement_date);
    $('#tabItemMaster2_Placement_Date').siblings('label').addClass('active');
    $('#tabItemMaster2_User_ID').attr('value', itemData.user_id);
    $('#tabItemMaster2_User_ID').siblings('label').addClass('active');
    $('#tabItemMaster2_Facing').attr('value', itemData.facing);
    $('#tabItemMaster2_Facing').siblings('label').addClass('active');
    if(itemData.bf_seasonal_promo === 'True') {
        $( "#tabItemMaster2_BFSeasonalPromo" ).prop( "checked", true );
    }
    if(itemData.cbd === 'True') {
        $( "#tabItemMaster2_CBD" ).prop( "checked", true );
    }
    if(itemData.core_set === 'True') {
        $( "#tabItemMaster2_CoreSet" ).prop( "checked", true );
    }
    if(itemData.customer_request === 'True') {
        $( "#tabItemMaster2_CustomerRequest" ).prop( "checked", true );
    }
    if(itemData.fair_trade === 'True') {
        $( "#tabItemMaster2_FairTrade" ).prop( "checked", true );
    }
    if(itemData.food_stamp === 'True') {
        $( "#tabItemMaster2_Foodstamp" ).prop( "checked", true );
    }
    if(itemData.gluten_free === 'True') {
        $( "#tabItemMaster2_GlutenFree" ).prop( "checked", true );
    }
    if(itemData.insta_cart === 'True') {
        $( "#tabItemMaster2_Instacart" ).prop( "checked", true );
    }
    if(itemData.insta_cart_trp === 'True') {
        $( "#tabItemMaster2_InstacartTPR" ).prop( "checked", true );
    }
    if(itemData.la_seasonal_promo === 'True') {
        $( "#tabItemMaster2_LASeasonalPromo" ).prop( "checked", true );
    }
    if(itemData.local === 'True') {
        $( "#tabItemMaster2_Local" ).prop( "checked", true );
    }
    if(itemData.organic === 'True') {
        $( "#tabItemMaster2_Organic" ).prop( "checked", true );
    }
    if(itemData.organically_grown === 'True') {
        $( "#tabItemMaster2_OrganicallyGrown" ).prop( "checked", true );
    }
    if(itemData.override_required === 'True') {
        $( "#tabItemMaster2_OverrideRequired" ).prop( "checked", true );
    }
    if(itemData.plant_based === 'True') {
        $( "#tabItemMaster2_PlantBased" ).prop( "checked", true );
    }
    if(itemData.price_required === 'True') {
        $( "#tabItemMaster2_PriceRequired" ).prop( "checked", true );
    }
    if(itemData.private_label === 'True') {
        $( "#tabItemMaster2_PrivateLabel" ).prop( "checked", true );
    }
    if(itemData.produce_fifo === 'True') {
        $( "#tabItemMaster2_ProduceFIFO" ).prop( "checked", true );
    }
    if(itemData.qty_allowed === 'True') {
        $( "#tabItemMaster2_QtyAllowed" ).prop( "checked", true );
    }
    if(itemData.qty_required === 'True') {
        $( "#tabItemMaster2_QtyRequired" ).prop( "checked", true );
    }
    if(itemData.raw === 'True') {
        $( "#tabItemMaster2_Raw" ).prop( "checked", true );
    }
    if(itemData.remote_printer === 'True') {
        $( "#tabItemMaster2_RemotePrinter" ).prop( "checked", true );
    }
    if(itemData.rpd === 'True') {
        $( "#tabItemMaster2_RPD" ).prop( "checked", true );
    }
    if(itemData.seasonal === 'True') {
        $( "#tabItemMaster2_Seasonal" ).prop( "checked", true );
    }
    if(itemData.tax_a === 'True') {
        $( "#tabItemMaster2_TaxA" ).prop( "checked", true );
    }
    if(itemData.tax_b === 'True') {
        $( "#tabItemMaster2_TaxB" ).prop( "checked", true );
    }
    if(itemData.tax_c === 'True') {
        $( "#tabItemMaster2_TaxC" ).prop( "checked", true );
    }
    if(itemData.tax_d === 'True') {
        $( "#tabItemMaster2_TaxD" ).prop( "checked", true );
    }
    if(itemData.tax_e === 'True') {
        $( "#tabItemMaster2_TaxE" ).prop( "checked", true );
    }
    if(itemData.tax_f === 'True') {
        $( "#tabItemMaster2_TaxF" ).prop( "checked", true );
    }
    if(itemData.tax_g === 'True') {
        $( "#tabItemMaster2_TaxG" ).prop( "checked", true );
    }
    if(itemData.tax_h === 'True') {
        $( "#tabItemMaster2_TaxH" ).prop( "checked", true );
    }
    if(itemData.value_bf === 'True') {
        $( "#tabItemMaster2_ValueBF" ).prop( "checked", true );
    }
    if(itemData.value_lam === 'True') {
        $( "#tabItemMaster2_ValueLAM" ).prop( "checked", true );
    }
    if(itemData.vegan === 'True') {
        $( "#tabItemMaster2_Vegan" ).prop( "checked", true );
    }
    if(itemData.scale_flag === 'True') {
        $( "#tabItemMaster2_ScaleFlag" ).prop( "checked", true );
    }

    // Item Master 3 Input data
    $('#tabItemMaster3_SchematicName1').attr('value', itemData.schematic_name_1);
    $('#tabItemMaster3_SchematicName1').siblings('label').addClass('active');
    $('#tabItemMaster3_SchematicName2').attr('value', itemData.schematic_name_2);
    $('#tabItemMaster3_SchematicName2').siblings('label').addClass('active');
    $('#tabItemMaster3_Height').attr('value', itemData.height);
    $('#tabItemMaster3_Height').siblings('label').addClass('active');
    $('#tabItemMaster3_Depth').attr('value', itemData.depth);
    $('#tabItemMaster3_Depth').siblings('label').addClass('active');
    $('#tabItemMaster3_Width').attr('value', itemData.width);
    $('#tabItemMaster3_Width').siblings('label').addClass('active');
    $('#tabItemMaster3_MOQ').attr('value', itemData.moq);
    $('#tabItemMaster3_MOQ').siblings('label').addClass('active');
    $('#tabItemMaster3_MMVendPack').attr('value', itemData.mm_vend_pack);
    $('#tabItemMaster3_MMVendPack').siblings('label').addClass('active');
    $('#tabItemMaster3_MMVendSize').attr('value', itemData.mm_vend_size);
    $('#tabItemMaster3_MMVendSize').siblings('label').addClass('active');
    $('#tabItemMaster3_MMVendUOM').attr('value', itemData.mm_vend_uom);
    $('#tabItemMaster3_MMVendUOM').siblings('label').addClass('active');
    $('#tabItemMaster3_InstacartBrandName').attr('value', itemData.brand_name);
    $('#tabItemMaster3_InstacartBrandName').siblings('label').addClass('active');
    $('#tabItemMaster3_WarehousePack').attr('value', itemData.warehouse_pack);
    $('#tabItemMaster3_WarehousePack').siblings('label').addClass('active');
    $('#tabItemMaster3_FrontEndTare').attr('value', itemData.front_end_tare);
    $('#tabItemMaster3_FrontEndTare').siblings('label').addClass('active');

    // Authorization Input data
    $('#tabAuthorization_TagQuantity').attr('value', itemData.tag_count);
    $('#tabAuthorization_TagQuantity').siblings('label').addClass('active');
    if(itemData.tag_eligible === 'True') {
        $( "#tabAuthorization_Tag" ).prop( "checked", true );
    }

    // Sacle Input data
    $('#tabSacle_PLU').attr('value', itemData.plu);
    $('#tabSacle_PLU').siblings('label').addClass('active');
    $('#tabSacle_Description1').attr('value', itemData.description_1);
    $('#tabSacle_Description1').siblings('label').addClass('active');
    $('#tabSacle_Description2').attr('value', itemData.description_2);
    $('#tabSacle_Description2').siblings('label').addClass('active');
    $('#tabSacle_TareA').attr('value', itemData.tare_a);
    $('#tabSacle_TareA').siblings('label').addClass('active');
    $('#tabSacle_TareB').attr('value', itemData.tare_b);
    $('#tabSacle_TareB').siblings('label').addClass('active');
    $('#tabSacle_ShelfLife').attr('value', itemData.shelf_life);
    $('#tabSacle_ShelfLife').siblings('label').addClass('active');
    $('#tabSacle_ProductLife').attr('value', itemData.shelf_life);
    $('#tabSacle_ProductLife').siblings('label').addClass('active');
    $('#tabSacle_Ingredients').attr('value', itemData.ingredients);
    $('#tabSacle_Ingredients').siblings('label').addClass('active');
    if(itemData.force_a === 'True') {
        $( "#tabSacle_ForceA" ).prop( "checked", true );
    }
    if(itemData.force_b === 'True') {
        $( "#tabSacle_ForceB" ).prop( "checked", true );
    }
    if(itemData.self_service === 'True') {
        $( "#tabSacle_SelfService" ).prop( "checked", true );
    }
    if(itemData.full_service === 'True') {
        $( "#tabSacle_FullService" ).prop( "checked", true );
    }

        // Sign Input data
    $('#tabSign_SignAdText1').attr('value', itemData.sign_ad_text_1);
    $('#tabSign_SignAdText1').siblings('label').addClass('active');
    $('#tabSign_SignAdText2').attr('value', itemData.sign_ad_text_2);
    $('#tabSign_SignAdText2').siblings('label').addClass('active');
    $('#tabSign_SignAdText3').attr('value', itemData.sign_ad_text_3);
    $('#tabSign_SignAdText3').siblings('label').addClass('active');
    $('#tabSign_SignProdName').attr('value', itemData.sign_prod_name);
    $('#tabSign_SignProdName').siblings('label').addClass('active');
    $('#tabSign_SignTagline').attr('value', itemData.sign_tagline);
    $('#tabSign_SignTagline').siblings('label').addClass('active');
    $('#tabSign_SignOrigin').attr('value', itemData.sign_origin);
    $('#tabSign_SignOrigin').siblings('label').addClass('active');
    $('#tabSign_SignVinyard').attr('value', itemData.sign_vinyard);
    $('#tabSign_SignVinyard').siblings('label').addClass('active');
    $('#tabSign_SignVintage').attr('value', itemData.sign_vintage);
    $('#tabSign_SignVintage').siblings('label').addClass('active');
    $('#tabSign_SignMilk').attr('value', itemData.sign_milk);
    $('#tabSign_SignMilk').siblings('label').addClass('active');
    $('#tabSign_Serves').attr('value', itemData.sign_serves);
    $('#tabSign_Serves').siblings('label').addClass('active');
    $('#tabSign_USDA').attr('value', itemData.sign_usda);
    $('#tabSign_USDA').siblings('label').addClass('active');
    $('#tabSign_SignProdDesc').attr('value', itemData.sign_prod_desc);
    $('#tabSign_SignProdDesc').siblings('label').addClass('active');
    $('#tabSign_SignDirect').attr('value', itemData.sign_direct);
    $('#tabSign_SignDirect').siblings('label').addClass('active');
    });

    $('.upcValue').text(paramName);

    $('body').on('click', '.footer-next-btn', function(event) {
        event.preventDefault();
        if(paramName === 'UPC00000000100') {
            return false;
        } else {
            if(parseInt(paramName.split('UPC')[1]) < 10) {
                console.log('/item-view.html?upc=UPC00000000'+(parseInt(paramName.split('UPC')[1])+1));
                window.location.href = '/item-view.html?upc=UPC00000000'+(parseInt(paramName.split('UPC')[1])+1);
            }
            if(parseInt(paramName.split('UPC')[1]) > 9 && parseInt(paramName.split('UPC')[1]) < 100) {
                window.location.href = '/item-view.html?upc=UPC00000000'+(parseInt(paramName.split('UPC')[1])+1);
            } else if(paramName === 'UPC0000000099') {
                window.location.href = '/item-view.html?upc=UPC00000000100';
            } 
        }
    });

    $('body').on('click', '.footer-pre-btn', function(event) {
        event.preventDefault();
        if(paramName === 'UPC000000001') {
            return false;
        } else {
            if(parseInt(paramName.split('UPC')[1]) < 10) {
                window.location.href = '/item-view.html?upc=UPC00000000'+(parseInt(paramName.split('UPC')[1])-1);
            }
            if(parseInt(paramName.split('UPC')[1]) > 9 && parseInt(paramName.split('UPC')[1]) < 100) {
                window.location.href = '/item-view.html?upc=UPC00000000'+(parseInt(paramName.split('UPC')[1])-1);
            } else if(paramName === 'UPC00000000100') {
                window.location.href = '/item-view.html?upc=UPC0000000099';
            }
        }

    });
    

});

var priceGridOption, priceGridCurrentOption, costGridOption, allowancesGridOption;
var columnDefsPrice = [
    {headerName: "Store/Zone", field: "store", cellRenderer: 'priorityAction', editable: true},
    {headerName: "Price Multi.", field: "price_multi", editable: true},
    {headerName: "Price", field: "price", editable: true},
    {headerName: "Effective Date", field: "eff_date", editable: true},
    {headerName: "Action", field: "action", cellRenderer: 'gridAction'},
],
columnDefsPriceCurrent = [
    {headerName: "Store/Zone", field: "store"},
    {headerName: "Price Multi.", field: "price_multi"},
    {headerName: "Price", field: "price"},
    {headerName: "Start Date", field: "start_date"},
    {headerName: "End Date", field: "end_date"},
    {headerName: "Type", field: "type"},
],
columnDefsCost = [
    {headerName: "Vendor", field: "vendor", cellRenderer: 'priorityAction', editable: true},
    {headerName: "Case Pack", field: "case_pack", editable: true},
    {headerName: "Case Cost", field: "case_cost", editable: true},
    {headerName: "Vendor Item", field: "vendor_item", editable: true},
    {headerName: "Action", field: "action", cellRenderer: 'gridAction'},
],
columnDefsAllowances = [
    {headerName: "Vendor", field: "vendor"},
    {headerName: "Type", field: "type"},
    {headerName: "Case $", field: "case"},
    {headerName: "Start Date", field: "start_date"},
    {headerName: "End Date", field: "end_date"},
];

$.get("data/view-item-price.json", function(data, status){
    priceGridOption = {
        defaultColDef: {
            resizable: true,
            sortable:true,
            filter: true
        },
        columnDefs: columnDefsPrice,
        rowData: data,
        suppressContextMenu:true,
        pagination: true,
        paginationPageSize: 10,
        editType: 'fullRow',
        components: {
            'gridAction': GidAction,
            'priorityAction': PriorityAction
        },
        paginationNumberFormatter: function(params) {
            return '[' + params.value.toLocaleString() + ']';
        },
        onGridReady: function(params) {
            params.api.sizeColumnsToFit();
        },
        onRowEditingStarted: function(event){
            var _this = this;
            $('.saveRowPrice').css({'display': 'inline-block'});
        }
    };
    var gridPriceDiv = document.querySelector('#datatablePrice');
    new agGrid.Grid(gridPriceDiv, priceGridOption); 
});

$.get("data/view-item-price-current.json", function(data, status){
    priceGridCurrentOption = {
    defaultColDef: {
        resizable: true,
        sortable:true,
        filter: true
    },
    columnDefs: columnDefsPriceCurrent,
    rowData: data,
    suppressContextMenu:true,
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function(params) {
        return '[' + params.value.toLocaleString() + ']';
    },
    onGridReady: function(params) {
        params.api.sizeColumnsToFit();
    }
    };
    var gridPriceCurrentDiv = document.querySelector('#datatablePriceCurrent');
    new agGrid.Grid(gridPriceCurrentDiv, priceGridCurrentOption); 
});

$.get("data/view-item-cost.json", function(data, status){
    costGridOption = {
        defaultColDef: {
            resizable: true,
            sortable:true,
            filter: true
        },
        columnDefs: columnDefsCost,
        rowData: data,
        suppressContextMenu:true,
        pagination: true,
        paginationPageSize: 10,
        editType: 'fullRow',
        components: {
            'gridAction': GidAction,
            'priorityAction': PriorityAction
        },
        paginationNumberFormatter: function(params) {
            return '[' + params.value.toLocaleString() + ']';
        },
        onGridReady: function(params) {
            params.api.sizeColumnsToFit();
        },
        onRowEditingStarted: function(event){
            var _this = this;
            $('.saveRow').css({'display': 'inline-block'});
        }
    };
    var gridCosttDiv = document.querySelector('#datatableCost');
    new agGrid.Grid(gridCosttDiv, costGridOption); 
});

$.get("data/view-item-allowances.json", function(data, status){
    allowancesGridOption = {
    defaultColDef: {
        resizable: true,
        sortable:true,
        filter: true
    },
    columnDefs: columnDefsAllowances,
    rowData: data,
    suppressContextMenu:true,
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function(params) {
        return '[' + params.value.toLocaleString() + ']';
    },
    onGridReady: function(params) {
        params.api.sizeColumnsToFit();
    }
    };
    var gridAllowancesDiv = document.querySelector('#datatableCostAllowances');
    new agGrid.Grid(gridAllowancesDiv, allowancesGridOption); 
});

    
function onPageSizeChanged() {
    var value = $(event.currentTarget).val();
    $(event.currentTarget).attr('data-table').api.paginationSetPageSize(Number(value));
}

// cell renderer class
function GidAction() {}

// init method gets the details of the cell to be rendere
GidAction.prototype.init = function(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('table-action-wrapper');
    var html = '';
    html = '<a href="javascript:;" title="Make Priority" class="button-primary button-stroked makePriorityBtn"  data-row-index="'+params.rowIndex+'">Primary</a>';
    this.eGui.innerHTML = html;
};

GidAction.prototype.getGui = function() {
    return this.eGui;
};

// cell renderer class
function PriorityAction() {}

// init method gets the details of the cell to be rendere
PriorityAction.prototype.init = function(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('vendor-priority');
    var html = '';
    html = '<i class="fas fa-exclamation-circle d-none"></i> ' + params.value;
    this.eGui.innerHTML = html;
};

PriorityAction.prototype.getGui = function() {
    return this.eGui;
};

$(document).ready(function() {
    $('body').on('click', '.priceTabTigger', function(event) {
        priceGridOption.api.sizeColumnsToFit();
        priceGridCurrentOption.api.sizeColumnsToFit();
    });
    
    $('body').on('click', '.costTabTigger', function(event) {
        costGridOption.api.sizeColumnsToFit();
        allowancesGridOption.api.sizeColumnsToFit();
    });
    
    $('body').on('click', '.makePriorityBtn', function(event) {
        // debugger;
        $($(this).closest('.ag-row').siblings()).each(function() {
            if(!$(this).find('.vendor-priority').children('i').hasClass('d-none')) {
                $(this).find('.vendor-priority').children('i').addClass('d-none');
                $(this).closest('.ag-row').removeClass('primary-row');
                $(this).find('.table-action-wrapper').children('a').show();
            }
        });
        $(this).closest('.ag-row').find('.vendor-priority').children('i').removeClass('d-none');
        $(this).closest('.ag-row').addClass('primary-row');
        $(this).hide();
    });
    
    
    var cloneItemRowModalInstance  = M.Modal.getInstance(document.querySelector('#cloneItemRowModal')),
        saveItemRowModalInstance  = M.Modal.getInstance(document.querySelector('#saveItemRowModal')),
        addNewCostinstance = M.Modal.getInstance(document.querySelector('#addNewCost')),
        addNewCurrentRetail = M.Modal.getInstance(document.querySelector('#addNewCurrentRetail'));

    $('body').on('click', '.cloneButton', function(event) {
        event.preventDefault();
        cloneItemRowModalInstance.open();
    });

    $('body').on('click', '.submitButton', function(event) {
        event.preventDefault();
        saveItemRowModalInstance.open();
    });

    $('body').on('click', '.addNewCostRow', function(event) {
        event.preventDefault();
        addNewCostinstance.open();
    });

    $('body').on('click', '.addCostData', function(event) {
        event.preventDefault();
        // costGridOption
        var newItem = {
            vendor: $('#costVendor').val(),
            case_pack: $('#costCasePack').val(),
            case_cost: $('#costCaseCost').val(),
            vendor_item: $('#costVendorItem').val(),
            action: ''
        };
        costGridOption.api.updateRowData({add: [newItem], addIndex: 0});
        costGridOption.api.sizeColumnsToFit();
        M.toast({html: $('#costVendor').val() + ' has been added.'});
    });

    $('body').on('click', '.addNewCurrentRetailRow', function(event) {
        event.preventDefault();
        addNewCurrentRetail.open();
    });

    $('body').on('click', '.addNewCurrentRetail', function(event) {
        event.preventDefault();
        // costGridOption
        var newItem = {
            store: $('#addNewCurrentRetailStore').val(),
            price_multi: $('#addNewCurrentRetailPriceMulti').val(),
            price: $('#addNewCurrentRetailPrice').val(),
            eff_date: $('#addNewCurrentRetailEffectiveDate').val(),
            action: ''
        };
        priceGridOption.api.updateRowData({add: [newItem], addIndex: 0});
        priceGridOption.api.sizeColumnsToFit();
        M.toast({html: $('#addNewCurrentRetailStore').val() + ' has been added.'});
    });
    
    
    $('body').on('click', '.saveRow', function(event) {
        event.preventDefault();
        costGridOption.api.stopEditing();
        $(this).css({'display': 'none'});
    });

    $('body').on('click', '.saveRowPrice', function(event) {
        event.preventDefault();
        priceGridOption.api.stopEditing();
        $(this).css({'display': 'none'});
    });
    
});