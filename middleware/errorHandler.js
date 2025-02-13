const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "validation échouée",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Page non trouvé",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.FORBIDDEN:
                res.json({
                    title: "Forbidden",
                    message: err.message,
                    stackTrace: err.stack
                });
                break;

        case constants.UNAUTHORIZE:
            res.json({
                title: "Unauthorize",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "erreur serveur",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            console.log("Tous va bien");
            break;
    }
}

module.exports = errorHandler;