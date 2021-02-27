const {exec}= require("child_process");
var path = require("path")                                                                                            

var script_path = path.join(__dirname, "anyproxy_rule.js");
console.log("hcc>>path>> " + script_path);

//use web 
var start_str = "anyproxy -i --ignore-unauthorized-ssl -p 8001 -s --ws-intercept -r " + script_path
// var start_str = "anyproxy -i --ignore-unauthorized-ssl -p 8001 --ws-intercept -r " + script_path
// var start_str = "anyproxy -i --ignore-unauthorized-ssl -p 8001 --ws-intercept -r ./anyproxy_rule.js"

exec(start_str,(error,stdout,stderr)=>{
    if(error){
        console.log("hcc>> start anyproxy server error:" + error);
		return;
    }
	console.log("hcc>> start anyproxy server success!! , stdout:" , stdout);
	console.log("hcc>> start anyproxy server success!! , stderr:" , stderr);
});