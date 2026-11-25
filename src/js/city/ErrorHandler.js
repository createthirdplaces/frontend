class ErrorHandler {
		
	handleError({errorData,message,intervalPid}) {

		console.error(message);		
		if(intervalPid){
			clearInterval(intervalPid);
		}

		throw errorData;
	}
}

export function createErrorHandler(){
	return new ErrorHandler();
}
