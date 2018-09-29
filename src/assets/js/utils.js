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

	function formatDate (date, fmt) {
	    if (/(y+)/.test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	    }
	    let o = {
	        'M+': date.getMonth() + 1,
	        'd+': date.getDate(),
	        'h+': date.getHours(),
	        'm+': date.getMinutes(),
	        's+': date.getSeconds()
	    };
	    for (let k in o) {
	        if (new RegExp(`(${k})`).test(fmt)) {
	            let str = o[k] + '';
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
	        }
	    }
	    return fmt;
	}

	function padLeftZero (str) {
	    return ('00' + str).substr(str.length);
	}

	return {
		handleParamInUrl : handleParamInUrl,
		formatDate: formatDate
	}
}()

export default utils;