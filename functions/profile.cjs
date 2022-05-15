const handler = async (event) => {
    return Promise.resolve({
        statusCode: 401,
    });
}

exports.handler = handler;