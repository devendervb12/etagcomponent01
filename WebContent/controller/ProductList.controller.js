sap.ui.controller("smax.etag.PRODUCT.controller.ProductList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductList
*/
	onInit: function() {
		
		var url = "proxy/http/122.180.87.238:8000/sap/opu/odata/SAP/ZETAG_SRV/"
		var oModel = new sap.ui.model.odata.v2.ODataModel(url);
		this.getView().setModel(oModel);
	},
	onSearch : function(oEvent){
		// get the value inserted in searchbox
		var query = oEvent.getSource().getValue(); 
		debugger;
		// filter List
		
		if(query.length > 2){
			
		var filters = [];
		
		//creating filter object
		var ofilter1 = new sap.ui.model.Filter({
		            path : "ProductID",
		            operator : sap.ui.model.FilterOperator.StartsWith,
		            value1 : query
		});
		
		var ofilter2 = new sap.ui.model.Filter({
            path : "Category",
            operator : sap.ui.model.FilterOperator.StartsWith,
            value1 : 'PCs'
});
		
		
		filters.push(ofilter1);
		filters.push(ofilter2);
		
		this.getView().byId("idList").getBinding("items").filter(filters);
		
		}
	}

});