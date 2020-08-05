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
app.use(session({secret: 'recommand 128 bytes random string', cookie: { maxAge: 1*60*60*1000 }}));
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
app.use('/food/add', food_add);
app.use('/food/add/form', food_add_form);
app.use('/food/remove', food_remove);
app.use('/food/remove/form', food_remove_form);
app.use('/food/update/no', foodupdateno);
app.use('/food/update/form',  foodupdateform);
app.use('/food/update', foodupdate);
app.use('/staff/list', stafflist);
app.use('/staff/add', staffadd);
app.use('/staff/add/form', staffaddform);
app.use('/store/list', storelist);
app.use('/store/add', storeadd);
app.use('/store/add/form', storeaddform);
app.use('/store/remove', storeremove);
app.use('/store/remove/form', storeremoveform);
app.use('/store/update/no', storeupdateno);
app.use('/store/update/form', storeupdateform);
app.use('/store/update', storeupdate);
app.use('/staff/remove/form', staffremoveform);
app.use('/staff/remove', staffremove)
app.use('/staff/update/no', staffupdateno);
app.use('/staff/update/form', staffupdateform);
app.use('/staff/update', staffupdate);
app.use('/order/list', orderlist);
app.use('/checkout/list', checkoutlist);
app.use('/topup/add', topupadd);
app.use('/topup/add/form', topupaddform);
app.use('/item/list', itemlist);
app.use('/item/add', itemadd);
app.use('/item/add/form', itemaddform);
app.use('/item/remove', itemremove);
app.use('/item/remove/form', itemremoveform);
app.use('/item/update/no', itemupdateno);
app.use('/item/update/form', itemupdateform);
app.use('/item/update', itemupdate);
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





