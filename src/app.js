const express = require('express');
const app = express();
const port = 3000;


const STATUS_MESSAGE  = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    301: 'Moved Permanently',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Timeout',
    409: 'Conflict',
    415: 'Unsupported Media Type',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
};

app.use(express.json());

app.get('/', (req, res) => {
    const statusCode = req.query?.code;

    if (statusCode && !isNaN(statusCode)) {
        const code = parseInt(statusCode);

        const response = {
            code,
            description: STATUS_MESSAGE[code]
        };

        res.status(code).json(response);
    } else {
        res.status(200).json({ description: 'Hello, world', version: 'v1' });
    }
});

app.get('/success', (req, res) => {
    res.status(200).json({
        code: 200,
        description: STATUS_MESSAGE["200"],
        version: 'v1'
    });
});

app.get('/err4', (req, res) => {
    res.status(400).json({
        code: 400,
        description: STATUS_MESSAGE["400"],
        version: 'v1'
    });
});

app.get('/err5', (req, res) => {
    res.status(500).json({
        code: 500,
        description: STATUS_MESSAGE["500"]
    });
});

app.post('/api', (req, res) => {
    res.json({
        message: 'post',
        data: req.body,
        version: 'v1'
    });
});

app.put('/api', (req, res) => {
    res.json({
        message: `put`,
        updatedData: req.body,
        version: 'v1'
    });
});

app.delete('/api', (req, res) => {
    res.json({
        message: `delete`,
        version: 'v1'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
