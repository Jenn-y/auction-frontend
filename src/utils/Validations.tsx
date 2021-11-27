import { EMAIL_EMPTY, EMAIL_INVALID, FIRST_NAME_EMPTY, LAST_NAME_EMPTY, PASSWORD_EMPTY, PASSWORD_LENGTH } from "constants/ErrorMessages";
import { LoginError } from "interfaces/LoginError";
import { RegistrationError } from "interfaces/RegistrationError";

export const validateEmail = (email: string) => {
	return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)
}

export const isValidLoginInput = (loginData: any) => {
	if (validateLoginData(loginData).isError) {
		return false
	}
	return true
}

export const isValidRegisterInput = (registerData: any) => {
	if (validateRegisterData(registerData).isError) {
		return false
	}
	return true
}

export const validateRegisterData = (registerData: any) => {

	const validateErrors: RegistrationError = { firstName: '', lastName: '', email: '', password: '', isError: false };

	if (!registerData.firstName || registerData.firstName.length === 0) {
		validateErrors.firstName = FIRST_NAME_EMPTY
		validateErrors.isError = true
	}

	if (!registerData.lastName || registerData.lastName.length === 0) {
		validateErrors.lastName = LAST_NAME_EMPTY
		validateErrors.isError = true
	}

	if (!registerData.email || registerData.email.length === 0) {
		validateErrors.email = EMAIL_EMPTY
		validateErrors.isError = true
	} else if (!validateEmail(registerData.email)) {
		validateErrors.email = EMAIL_INVALID
		validateErrors.isError = true
	}

	if (!registerData.password || registerData.password.length === 0) {
		validateErrors.password = PASSWORD_EMPTY
		validateErrors.isError = true
	} else if (registerData.password.length < 6) {
		validateErrors.password = PASSWORD_LENGTH
		validateErrors.isError = true
	}

	return validateErrors;
}

export const validateLoginData = (loginData: any) => {

	const validateErrors: LoginError = { email: '', password: '', isError: false }

	if (!loginData.email || loginData.email.length === 0) {
		validateErrors.email = EMAIL_EMPTY
		validateErrors.isError = true
	} else if (!validateEmail(loginData.email)) {
		validateErrors.email = EMAIL_INVALID
		validateErrors.isError = true
	}

	if (!loginData.password || loginData.password.length === 0) {
		validateErrors.password = PASSWORD_EMPTY
		validateErrors.isError = true
	} else if (loginData.password.length < 6) {
		validateErrors.password = PASSWORD_LENGTH
		validateErrors.isError = true
	}

	return validateErrors
}

export const validateBidAmount = (bidAmount: number, highestBid: any) => {
	return bidAmount > highestBid;
}
