// client-side js
// run by the browser each time your view template is loaded

var config = {};
var pluginId = null;

function clearFunction()
{
  document.getElementById("productPrice").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("deliveryTime").value = "";
}

function invoiceFunction()
{
  var message = { type: "invoice"};
  if(document.getElementById("productPrice").value == "")
  {
	  alert("The price field must be filled out");
	  return;
  }
  
  if(isNaN(document.getElementById("productPrice").value))
  {
	  alert("The price field should contains digits only");
	  return;
  }
  if(document.getElementById("productDescription").value == "")
  {
	  alert("The description field must be filled out");
	  return;
  }
  
  message.info = { description: document.getElementById("productDescription").value, 
				  price: document.getElementById("productPrice").value,
				  deliveryTime: document.getElementById("deliveryTime").value};
	  
  putMessage(JSON.stringify(message));
}

function onTrackingNumber(){
	var message = { type: "tracking"};
	message.info = { trackingNumber: document.getElementById("trackingNumber").value};
	putMessage(JSON.stringify(message));
}

function onFeedbackRequest(){
	var message = { type: "feedback"};
	putMessage(JSON.stringify(message));
}

function onStartChat(){
	var message = { type: "chat"};
	putMessage(JSON.stringify(message));
}

function getCurrentUrl() {
  return window.location.href;
}


function init() { 
  // init LiveChat integration
  sendMessage({ message: 'plugin_inited' });
}

function setPluginId() {
  if (!pluginId) {
    pluginId = getUrlParam('plugin_id');
  }
  return pluginId;
};

function sendMessage(message) {
  var e = message;
  e.plugin_id = setPluginId();
  return parent.postMessage(e, config.targetOrigin || '*');
};

 function getUrlParam(name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results) {
    return results[1] || 0;
  } else {
    return null;
  }
};

function putMessage(message) {
    return sendMessage({ message: 'put_message', data: message });
  }


init()

