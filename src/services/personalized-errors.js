//Used when client does not provide correct parameters
exports.clientError = class ClientError extends Error{}

//Used when database retrieve an error
exports.databaseError = class DatabaseError extends Error{}

//Used when existent data is detected
exports.existentData = class ExistentData extends Error{}

//Used when user is not authorized
exports.notAuthorized = class NotAuthorized extends Error{}