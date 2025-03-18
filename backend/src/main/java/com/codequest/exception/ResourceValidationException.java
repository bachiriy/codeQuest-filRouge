package com.codequest.exception;

public class ResourceValidationException extends RuntimeException {


    public ResourceValidationException() {
	    super();
    }

    public ResourceValidationException(String message) {
	    super(message);
    }
}
