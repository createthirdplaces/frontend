
export function runGlobal(){

  console.log("Hi");
 
  const spellError = `
	 <span style="color:red;font-weight:bold">`; 
	let text = document.getElementById("container").innerHTML;

  let htmlTag = false; 
  let word = ''; 

	for(let i=text.length-1;i>0;i--){
    
		const item = text.charAt(i);  
    if(item === '>'){
      htmlTag = true;
		}
    
		if(item === '<'){
			htmlTag= false;
		}

  
    let code = item.charCodeAt(0);
			if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
		    if(word.length > 0 && !htmlTag){
				  console.log(word);
	        if(word === "landlord"){
				    const wordToAdd = `${spellError}${word}</span>`; 		
						text = text.substring(0,i) + wordToAdd + text.substring(i+word.length+1);	
					}
					
				}		
		    word = '';	
			}
			else {
		    word = item + word;	
			}
	 }
   document.getElementById("container").innerHTML = text; 	
	}
