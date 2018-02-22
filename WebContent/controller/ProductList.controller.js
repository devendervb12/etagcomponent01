sap.ui.controller("smax.etag.PRODUCT.controller.ProductList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductList
*/
	onInit: function() {
		
		var url = "proxy/http/122.180.87.238:8000/sap/opu/odata/SAP/ZETAG_SRV"
		var oModel = new sap.ui.model.odata.v2.ODataModel(url); 
		this.getView().setModel(oModel);
		
		//this.getView().getModel()
		
	},
	onSearch : function(oEvent){
		// get the value inserted in search box
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
	},
	onItemPress : function(oEvent){
		// first get ProductID
		 var prodID =  oEvent.getSource().getTitle(); 
	//	debugger;
		
		//go and get the data
		this.getView().byId("idSf").setVisible(true);
		
		// model url + 
		this.getView().byId("idSf").bindElement("/ProductSet('" +prodID+  "')");
		// get productDetails and mapp it to Simpleform
		//show the simpleform with data
		
	},
	onCreate : function(){
	   
		var oController = this;
		
		var odialog = new sap.m.Dialog({
			title : "Enter Product Details",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input()				
			],
			buttons : [
				new sap.m.Button({ text : "Save", press : function(){
					// implement code for save in SAP
					var data = {
							ProductID : this.getParent().getContent()[1].getValue(),
							Name : this.getParent().getContent()[3].getValue(),
							Category : this.getParent().getContent()[5].getValue()
					}
					
			
					var oModel = this.getParent().getModel();
					
					oModel.create("/ProductSet", data, {
						success : function(){ //callback function
							//debugger;
							sap.m.MessageToast.show("Data Created");
								
						},
						error : function(){
							sap.m.MessageToast.show("Data not Created");
						//	debugger;
						}
					});
					
					
				}}),
				new sap.m.Button({text : "Cancel", press : function(){
					odialog.close();
				}})
			]
		});
	var oModel = 	this.getView().getModel();
	odialog.setModel(oModel);
		odialog.open();
		
	},
	onUpdate : function(oEvent){
		
		var oController = this;
		
		var odialog = new sap.m.Dialog({
			title : "Update Product Name",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Text({ text : oController.getView().byId("idSf").getContent()[1].getText()}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({ value : oController.getView().byId("idSf").getContent()[3].getText()})
			],
			buttons : [
				new sap.m.Button({
					text : "Update and Close",
					press : function(){
						
						var prodId = oController.getView().byId("idSf").getContent()[1].getText();
						// update logic
						
						var data = {
								Name : this.getParent().getContent()[3].getValue()
						}
						
						odialog.getModel().update("/ProductSet('"+oController.getView().byId("idSf").getContent()[1].getText()+"')", data, {
							success : function(){
								sap.m.MessageToast.show("Data updated");
							},
							error : function(){
								sap.m.MessageToast.show("Data updated");
							}
						} )
						
						odialog.close();
					}
				})
				
				
			]
		});
		
		odialog.setModel(this.getView().getModel()).open();
		
	//  odialog.open();
		
		
	}
	
});
















