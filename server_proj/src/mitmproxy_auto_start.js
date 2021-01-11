const {exec}= require("child_process");
var path = require("path")                                                                                            

var script_path = path.join(__dirname, "mitmproxy_rule.py");
console.log("path>>> " + script_path);

var start_str = "mitmweb -p 8001 --web-host 0.0.0.0 --web-port 8002 --set block_global=false --no-web-open-browser -s " + script_path
exec(start_str,(error,stdout,stderr)=>{
    if(error){
        console.log("hcc>> start mitmproxy server error:" + error);
		return;
    }
	console.log("hcc>> start mitmproxy server success!! , stdout:" , stdout);
	console.log("hcc>> start mitmproxy server success!! , stderr:" , stderr);
});