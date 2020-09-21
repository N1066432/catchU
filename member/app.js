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

//店家資訊
var store_list = require('./routes/store_list');

//會員
var member_list = require('./routes/member_list') ;
var member_add_form = require('./routes/member_add_form');
var member_add = require('./routes/member_add');
var member_remove_form = require('./routes/member_remove_form');
var member_remove = require('./routes/member_remove');
var member_update_no = require('./routes/member_update_no');
var member_update_form = require('./routes/member_update_form');
var member_update = require('./routes/member_update');
var member_one = require('./routes/member_one');

//計算時間
var caltime_add = require('./routes/caltime_add');
var caltime_add_form = require('./routes/caltime_add_form');
var caltime_addend = require('./routes/caltime_addend');
var caltime_addend_form = require('./routes/caltime_addend_form');

//查看菜單
var food_list = require('./routes/food_list');

//訂單明細
var orderdetail_add = require('./routes/orderdetail_add');
var orderdetail_remove_form = require('./routes/orderdetail_remove_form');
var orderdetail_remove = require('./routes/orderdetail_remove')
var orderdetail_update_no = require('./routes/orderdetail_update_no');
var orderdetail_update_form = require('./routes/orderdetail_update_form');
var orderdetail_update = require('./routes/orderdetail_update');
var orderdetail_list = require('./routes/orderdetail_list');
var orderdetail_one = require('./routes/orderdetail_one');

//登入登出
var user_login_form = require('./routes/user_login_form');
var user_login = require('./routes/user_login');
var user_logout = require('./routes/user_logout');
var user_show = require('./routes/user_show');
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

//店家資訊
app.use('/store/list', store_list);

//會員資料
app.use('/member/list', member_list);
app.use('/member/add/form', member_add_form);
app.use('/member/add', member_add);
app.use('/member/remove/form', member_remove_form);
app.use('/member/remove', member_remove);
app.use('/member/update/no', member_update_no);
app.use('/member/update/form', member_update_form);
app.use('/member/update', member_update);
app.use('/member/one', checkAuth, member_one);

//計算時間
app.use('/caltime/add', caltime_add);
app.use('/caltime/add/form', caltime_add_form);
app.use('/caltime/addend', caltime_addend);
app.use('/caltime/addend/form', caltime_addend_form);

//查看菜單
app.use('/food/list', food_list);

//訂單明細
app.use('/orderdetail/add', orderdetail_add);
app.use('/orderdetail/remove/form', orderdetail_remove_form);
app.use('/orderdetail/remove', orderdetail_remove);
app.use('/orderdetail/update/no', orderdetail_update_no);
app.use('/orderdetail/update/form', orderdetail_update_form);
app.use('/orderdetail/update', orderdetail_update);
app.use('/orderdetail/list', orderdetail_list);
app.use('/orderdetail/one', checkAuth, orderdetail_one);

//登入登出
app.use('/user/login/form', user_login_form);
app.use('/user/login', user_login);
app.use('/user/logout', user_logout);
app.use('/user/show', user_show);


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
