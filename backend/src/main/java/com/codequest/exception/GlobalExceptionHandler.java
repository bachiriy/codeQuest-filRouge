package com.codequest.exception;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		return handleBindingResult(ex.getBindingResult());
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleBindException(BindException ex) {
		return handleBindingResult(ex.getBindingResult());
    }

    private ResponseEntity<ValidationErrorResponse> handleBindingResult(BindingResult bindingResult) {
		ValidationErrorResponse errors = new ValidationErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatus(HttpStatus.BAD_REQUEST.value());
		errors.setMessage("Validation Failed");

		bindingResult.getAllErrors().forEach(error -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.addError(fieldName, errorMessage);
		});
		return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleConstraintViolationException(jakarta.validation.ConstraintViolationException ex) {
		ValidationErrorResponse errors = new ValidationErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatus(HttpStatus.BAD_REQUEST.value());
		errors.setMessage("Validation Failed");

		ex.getConstraintViolations().forEach(violation -> {
			String fieldName = violation.getPropertyPath().toString();
			String errorMessage = violation.getMessage();
			errors.addError(fieldName, errorMessage);
		});

		return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ValidationErrorResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException exception) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.NOT_FOUND.value());
		error.setMessage(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> illegalArgumentExceptionHandler(IllegalArgumentException exception) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.BAD_REQUEST.value());
		error.setMessage(exception.getMessage());
		return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(ResourceValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleResourceValidationException(ResourceValidationException exception) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.BAD_REQUEST.value());
		error.setMessage(exception.getMessage());
		return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.BAD_REQUEST.value());
		error.setMessage(exception.getMessage());
		return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(CustomDuplicateKeyException.class)
    public ResponseEntity<?> handleDuplicateKeyException(CustomDuplicateKeyException ex) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body("A record with this email already exists");
    }


    @ExceptionHandler(IOException.class)
    public ResponseEntity<ValidationErrorResponse> handleIOException(IOException ex) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.setMessage("File upload failed: " + ex.getMessage());
		return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ValidationErrorResponse> handleIllegalStateException(IllegalStateException ex) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.setMessage("Illegal State Error: " + ex.getMessage());
		return ResponseEntity.internalServerError().body(error);
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ValidationErrorResponse> handleRuntimeException(RuntimeException exception) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.setMessage("Runtime Error: " + exception.getMessage());
		return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ValidationErrorResponse> handleGenericException(Exception ex) {
		ValidationErrorResponse error = new ValidationErrorResponse();
		error.setTimestamp(LocalDateTime.now());
		error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.setMessage("An unexpected error occurred: " + ex.getMessage());
		return ResponseEntity.internalServerError().body(error);
    }
}
