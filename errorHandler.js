const pageNotFound = (req, res, next) => {
    const err = new Error('404 page not found');
    err.status(404);
    next(err);
}

function errorHandler (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
    });
}

module.exports={pageNotFound, errorHandler}