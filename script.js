//mixing function-------------------------------------------
var arr = [];
var box, ei,ej;
function swap(arr,i1,j1,i2,j2){				
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
//It runs after loading-------------------------------------
window.onload = function() {				
	box = document.getElementById("field"); // returns the element that has the ID attribute with the specified value
	newGame();				
	document.getElementById("start").onclick = newGame;						
}

//processing function click on the cell-----------------------------

function cellClick(event) {
	var event = window.event,   //what event
		el =  event.target,     //target of event
		i = el.id.charAt(0),    //method returns the character at the specified index in a string.
		j = el.id.charAt(2);
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){					
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		ei = i;
		ej = j;
		var q = true;
		for(i = 0; i < 4; ++i)
			for(j = 0; j < 4; ++j)
				if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
					q = false;
					break;
				}
				if(q) alert("Victory!");
			}
}

//------------------------------------------------------------------------
// filling an array
function newGame(){			
	for(i = 0; i < 4; ++i){
		arr[i] = []
		for(j = 0; j < 4; ++j){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = "";
		}
	}
	ei = 3; // edges of rows and columns
	ej = 3;
	//mix this f**king field
	for(i = 0; i < 1600; ++i)   //1600- any number of
		switch(Math.round(3*Math.random())){
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != 3) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != 3) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
		
	
	var table = document.createElement("TABLE"),    //create elemnt "table"
		tbody = document.createElement("TBODY");					
	table.appendChild(tbody);   //fill table by tbody
	for(i = 0; i < 4; ++i){
		var row = document.createElement("tr");
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.onclick = cellClick;
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);
		}
		tbody.appendChild(row);					
	}
	if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);	
}