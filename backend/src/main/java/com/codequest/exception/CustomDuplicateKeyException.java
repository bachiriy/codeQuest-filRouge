package com.codequest.exception;

public class CustomDuplicateKeyException extends RuntimeException {
    public CustomDuplicateKeyException() {
	super();
    }

    public CustomDuplicateKeyException(String msg) {
	super(msg);
    }
}
