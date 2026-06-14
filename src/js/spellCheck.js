import {dictionary} from './dictionary.js'
import {otherWords} from './otherWords.js'

export function runGlobal(){
 
  const tldList = ["com","org"];
  
  let words = new Set(Object.keys(dictionary));
  words = new Set([...words, ...otherWords, ...tldList]);	

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
			  //Check for website url. 
        let isUrl = false;;
        if(i < text.length - 3) {
          if(text.charCodeAt(i+1) >= 97 && text.charCodeAt(i+1) <= 122){
            const tld = text.charAt(i+1)+text.charAt(i+2)+text.charAt(i+3);
            if(tldList.includes(tld)){
              isUrl = true;
              word = ``;
            }
          }
        }
        if(!isUrl && i < text.length - 2){
          if(text.charCodeAt(i+1) !== 32 || text.charCodeAt(i+2)<65 ||
						text.charCodeAt(i+2) > 90) {
 
              //Newlines and opening html tags should not be considered as
							//missing space. Same for numbers 
					    if(text.charCodeAt(i+1) !== 10 && text.charCodeAt(i+1) !== 60 &&
								text.charCodeAt(i+1)< 48 && text.charCodeAt(i+1) > 57){
                console.log("Hi");
								const wordToAdd = `${redBackground}End of sentence syntax error</span>`; 		
								text = text.substring(0,i+1) + wordToAdd + text.substring(i+1);	
            }
				  }
				}
			}
			
			else if ( !(code === 39) && !(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
		      if(word.length > 0){	
					  let skipSpellCheck = false;	
				    //Word represents a title and should not be part of spell check	
						if(word.toUpperCase() === word){
              skipSpellCheck = true;
						}	
						if(!skipSpellCheck && !checkSpelling(words, word)){
							const wordToAdd = `${spellError}${word}</span>`; 		
              console.log("Word spelling error:"+word); 
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
    if(word.charAt(word.length - 2) === "'" && word.charAt(word.length-1) === "s"){
      return words.has(word.substring(0,word.length-2).toLowerCase());
    }
		return words.has(word.toLowerCase()); 
	}

