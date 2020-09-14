var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------

var food_list = require('./routes/food_list');
var food_add = require('./routes/food_add');
var food_add_form = require('./routes/food_add_form');
var food_remove = require('./routes/food_remove');
var food_remove_form = require('./routes/food_remove_form');
var staffone = require('./routes/staffone');
var stafflist = require('./routes/stafflist');
var staffadd = require('./routes/staffadd');
var staffaddform = require('./routes/staffaddform');
var staffremoveform = require('./routes/staffremoveform');
var staffremove = require('./routes/staffremove');
var staffupdateno = require('./routes/staffupdateno');
var staffupdateform = require('./routes/staffupdateform');
var staffupdate = require('./routes/staffupdate');
var storelist = require('./routes/storelist');
var storeadd = require('./routes/storeadd');
var storeaddform = require('./routes/storeaddform');
var storeremove = require('./routes/storeremove');
var storeremoveform = require('./routes/storeremoveform');
var storeupdateno = require('./routes/storeupdateno');
var storeupdateform = require('./routes/storeupdateform');
var storeupdate = require('./routes/storeupdate');
var foodupdateno = require('./routes/foodupdateno');
var foodupdateform = require('./routes/foodupdateform');
var foodupdate = require('./routes/foodupdate');
var orderlist = require('./routes/orderlist');
var checkoutlist = require('./routes/checkoutlist');
var topupadd = require('./routes/topupadd');
var topupaddform = require('./routes/topupaddform');
var itemlist = require('./routes/itemlist');
var itemadd = require('./routes/itemadd');
var itemaddform = require('./routes/itemaddform');
var itemremoveform = require('./routes/itemremoveform');
var itemremove = require('./routes/itemremove');
var itemupdateno = require('./routes/itemupdateno');
var itemupdateform = require('./routes/itemupdateform');
var itemupdate = require('./routes/itemupdate');
var userloginform = require('./routes/userloginform');
var userlogin = require('./routes/userlogin');
var userlogout = require('./routes/userlogout');
var registeradd = require('./routes/registeradd');
var registeraddform = require('./routes/registeraddform');
var usershow = require('./routes/usershow');
var caltimeadd = require('./routes/caltimeadd');
var caltimeaddform = require('./routes/caltimeaddform');
var checkAuth = require('./routes/checkAuth');


//------------------------------------------------------------


var app = express();

//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: 'recommand 128 bytes random string', cookie: { maxAge: 24*60*60*1000 }}));
//--------------------------------------------------------------------



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//-----------------------------------------
// 設定模組使用方式
//-----------------------------------------

app.use('/food/list',checkAuth, food_list);
app.use('/food/add',checkAuth, food_add);
app.use('/food/add/form',checkAuth, food_add_form);
app.use('/food/remove',checkAuth, food_remove);
app.use('/food/remove/form',checkAuth, food_remove_form);
app.use('/food/update/no',checkAuth, foodupdateno);
app.use('/food/update/form',checkAuth,  foodupdateform);
app.use('/food/update',checkAuth, foodupdate);
app.use('/staff/one',checkAuth, checkAuth, staffone);
app.use('/staff/list',checkAuth, stafflist);
app.use('/staff/add',checkAuth, staffadd);
app.use('/staff/add/form',checkAuth, staffaddform);
app.use('/store/list',checkAuth, storelist);
app.use('/store/add',checkAuth, storeadd);
app.use('/store/add/form',checkAuth, storeaddform);
app.use('/store/remove',checkAuth, storeremove);
app.use('/store/remove/form',checkAuth, storeremoveform);
app.use('/store/update/no',checkAuth, storeupdateno);
app.use('/store/update/form',checkAuth, storeupdateform);
app.use('/store/update',checkAuth, storeupdate);
app.use('/staff/remove/form',checkAuth, staffremoveform);
app.use('/staff/remove',checkAuth, staffremove)
app.use('/staff/update/no',checkAuth, staffupdateno);
app.use('/staff/update/form',checkAuth, staffupdateform);
app.use('/staff/update',checkAuth, staffupdate);
app.use('/order/list',checkAuth, orderlist);
app.use('/checkout/list',checkAuth, checkoutlist);
app.use('/topup/add',checkAuth, topupadd);
app.use('/topup/add/form',checkAuth, topupaddform);
app.use('/item/list',checkAuth, itemlist);
app.use('/item/add',checkAuth, itemadd);
app.use('/item/add/form',checkAuth, itemaddform);
app.use('/item/remove',checkAuth, itemremove);
app.use('/item/remove/form',checkAuth, itemremoveform);
app.use('/item/update/no',checkAuth, itemupdateno);
app.use('/item/update/form',checkAuth, itemupdateform);
app.use('/item/update',checkAuth, itemupdate);
app.use('/user/login/form', userloginform);
app.use('/user/login', userlogin);
app.use('/user/logout', userlogout);
app.use('/user/show', usershow);
app.use('/register/add', registeradd);
app.use('/register/add/form', registeraddform);
app.use('/caltime/add', caltimeadd);
app.use('/caltime/add/form', caltimeaddform);
//-----------------------------------------

//----------------------------------------
// 可由外部直接取用資料夾
//----------------------------------------
app.use(express.static('public/picture'));
//-----------------------------------------



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





