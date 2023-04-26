export function passwordValidator(password) {
	if (!password) return "This field can't be empty.";
	if (password.length < 8)
		return "Password must be at least 8 characters long.";
	return "";
}
