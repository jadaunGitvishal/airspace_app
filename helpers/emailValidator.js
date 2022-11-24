export function emailValidator(email) {
	const pattern = /\S+@\S+\.\S+/;
	if (!email) return "Email can't be empty.";
	if (!pattern.test(email)) return "Ooops! We need a valid email address.";
	return "";
}
