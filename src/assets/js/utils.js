var utils = function () {
	var handleParamInUrl = function(url, params){
		var urlTemp = url;
		var reg = /{(\w+)}/ig;
		var result = null;
		while((result = reg.exec(url))!=null) { 
			var replaceStr = params[result[1]];
			var replacedStr = result[0];
			if(typeof(replaceStr)!='undefined'&&replaceStr!=null){
				urlTemp = urlTemp.replace(replacedStr, replaceStr)
			}else{
				urlTemp = null;
				break;
			}
		}
		return urlTemp;
	}

	return {
		handleParamInUrl : handleParamInUrl
	}
}()

export default utils;