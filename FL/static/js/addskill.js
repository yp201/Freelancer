var addSkill = function(){	
    var checks = new Array();
    $("input[name='skill']:checked").each(function(i) {
    	console.log($(this).val())
    	if (!($(this).prop("disabled")))
    		checks.push($(this).val());
    });
	$.ajax({
		url: 'addskill',
		method: 'GET',
		data:{
			'checks':checks
		},
		success: function(response){
			location.reload()
		},
		error: function(response){
			console.log("ERROR")
			console.log(response.responseText)
		}
	})
}