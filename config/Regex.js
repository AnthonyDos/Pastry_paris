exports.REGEX_EMAIL = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

//exports.REGEX_PASSWORD = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
//Le mot de passe doit contenir au moins une lettre, au moins un chiffre et plus de six caractères.

//exports.REGEX_PASSWORD = /^([ a-zA-Z0-9_-]{8,15})$/
//Le mot de passe doit comporter au moins 8 caractères et pas plus de 15 caractères.

exports.REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
/*mot de passe entre 8 et 15 caractères contenant au moins une lettre
 minuscule, une lettre majuscule, un chiffre et un caractère spécial */