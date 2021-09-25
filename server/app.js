require('dotenv').config();
const cors = require('cors');   //chia sẻ tài nguyên của các domain khác nhau cho nhau
const logger = require('morgan');
const express = require('express');

const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
const bookStockRoute = require('./routes/bookStock')
const bookTypeRoute = require('./routes/bookType');
const cartRoute = require('./routes/cart');
const customerRoute = require('./routes/customer');
const historyDetailRoute = require('./routes/historyDetail');
const historyRoute = require('./routes/history');
const roleRoute = require('./routes/role');
const userRoute = require('./routes/user');

const app = express();
const { PORT } = require('./config/variable');
const port = PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

require('./middleware/passport');

app.use('/authors', authorRoute);
app.use('/books', bookRoute);
app.use('/book-stocks', bookStockRoute);
app.use('/book-types', bookTypeRoute);
app.use('/carts', cartRoute);
app.use('/customers', customerRoute);
app.use('/history-details', historyDetailRoute);
app.use('/histories', historyRoute);
app.use('/roles', roleRoute);
app.use('/users', userRoute);

app.get('/', (req, res, next) => {
    //throw new Error('Error catch!!');
    return res.status(200).json({
        message: 'Server is OK!'
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    const error = app.get('env') === 'development' ? err : {};  // app.get('env'): nhận được giá trị của môi trường, trả về 'development' nếu NODE_ENV không được xác định
    const status = err.status || 500;
    
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
});

app.listen(port, 
    () => console.log(`Server is listening on port ${port}`)
);