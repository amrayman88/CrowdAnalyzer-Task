const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = require('./app')
const config = require('./config')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.docsPORT, () => {
    console.log(`server is running on port :${config.docsPORT}`);
});