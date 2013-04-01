/****************************************************************
(C) 2008 Kishore Nallan for DesignShack
http://www.kishorelive.com
kishore.nc@gmail.com
*****************************************************************/

$(document).ready(function(){
    
	var shifton = false;
	
	// toggles the keyboard to show or hide when button is clicked
	$("#keyboard").click(function(e) {
		leftVal=105+"px";
		topVal=215+"px";
		$('#keyboard').css({left:leftVal,top:topVal}).toggle();
	});
	
	// toggles the keyboard to show or hide when 'Sair' is clicked
	$("#close").click(function(e) {
		// alert("aQUI")
		// leftVal=105+"px";
		// topVal=160+"px";
		// // $('#keyboard').css({left:leftVal,top:topVal}).toggle();
	});


	// toggles between the normal and the "SHIFT keys" on the keyboard
	function onShift(e) {
		var i;
		if(e==1) {
			for(i=0;i<4;i++) {
				var rowid = "#row" + i;
				$(rowid).hide();
				$(rowid+"_shift").show();
			}
		}
		else {
			for(i=0;i<4;i++) {
				var rowid = "#row" + i;
				$(rowid).show();
				$(rowid+"_shift").hide();
			}
		}
	 }
	
	// function thats called when any of the keys on the keyboard are pressed
	$("#keyboard input").bind("click", function(e) {
									   
		if( $(this).val() == 'Backspace' ) {
			$('#formDesc').replaceSelection("", true);
		}
		
		else if( $(this).val() == "Shift" ) {
			if(shifton == false) {
				onShift(1);	
				shifton = true;
			}
			
			else {
				onShift(0);
				shifton = false;
			} 
		}
		
		else {
		
			$('#formDesc').replaceSelection($(this).val(), true);
			
			if(shifton == true) {
				onShift(0);
				shifton = false;
			}
		}
	});
	
});


