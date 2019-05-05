//Used when client does not provide correct parameters
exports.clientError = class ClientError extends Error{}

//Used when database retrieve an error
exports.databaseError = class DatabaseError extends Error{}