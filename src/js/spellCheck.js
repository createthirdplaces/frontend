import {dictionary} from './dictionary.js'
import {otherWords} from './otherWords.js'

export function runGlobal(){
 
  let words = new Set(Object.keys(dictionary));
  words = new Set([...words, ...otherWords]);	

	const spellError = `
	 <span style="color:red;font-weight:bold">`; 
 

  const redBackground = `
	 <span style="background-color:red;font-weight:bold">`; 
  
	let text = document.getElementById("article-text").innerHTML;

  if(!text || text.length === 0){
    console.log("Page is not an article");
		return;
	}
  
	let htmlTag = false; 
  let word = ''; 

  let lastErrorPos = text.length;
	
	for(let i=text.length-1;i>0;i--){
    
		const item = text.charAt(i);  
    if(item === '>'){
      htmlTag = true;
		}
    
		if(!htmlTag){ 
			let code = item.charCodeAt(0);
		 
      //Check for space at end of sentence and capital letter for next word.
			if(code === 46){
        if(i < text.length - 2){
          if(text.charCodeAt(i+1) !== 32 || text.charCodeAt(i+2)<65 ||
						text.charCodeAt(i+2) > 90) {
 
              //Newlines and opening html tags should not be considered as
							//missing space. Same for numbers 
					    if(text.charCodeAt(i+1) !== 10 && text.charCodeAt(i+1) !== 60 &&
								text.charCodeAt(i+1)< 48 && text.charCodeAt(i+1) > 57){
								const wordToAdd = `${redBackground}End of sentence syntax error</span>`; 		
								text = text.substring(0,i+1) + wordToAdd + text.substring(i+1);	
              }
						}
				}
			}
			
			else if (false && !(code === 39) && !(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
			
		      if(word.length > 0){	
					  let skipSpellCheck = false;	
				
				    //Word represents a title and should not be part of spell check	
						if(word.toUpperCase() === word){
              skipSpellCheck = true;
						}	
						if(!skipSpellCheck && !checkSpelling(words, word)){
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
	 
			if(item === '<'){
				htmlTag= false;
			}
	 }
   document.getElementById("article-text").innerHTML = text; 	
	}

	function checkSpelling(words, word){
		return words.has(word.toLowerCase()); 

	}

