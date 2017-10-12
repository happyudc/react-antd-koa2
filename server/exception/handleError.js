/**
 * Created by happyu on 2017/10/12.
 */

module.exports = function (err, ctx) {
  if(!err.status) err.status = 500;
  ctx.status = err.status;
  ctx.body = {
      success: false,
      message: err.message,
      code: ctx.status,
      data: null
  }
};