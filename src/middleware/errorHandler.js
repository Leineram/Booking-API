const errorHandler = (err, req, res, next) => {
    if (err.name === 'InvalidCredentials') {
        return res.status(401).json({ message: err.message });
    }
    if (err.name === 'BadRequestError')
        return res.status(400).json({ message: err.message });

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: err.message });
    }

    next(err);
};

export default errorHandler;