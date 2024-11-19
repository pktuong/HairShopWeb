
module.exports = {
    // Middleware kiểm tra xem người dùng có phải là quản trị viên không
    checkAdmin: (req, res, next) => {
      if (req.session.role !== 'admin') {
        return res.status(403).send('Bạn không có quyền truy cập vào trang này');
      }
      next(); // Nếu người dùng là quản trị viên, tiếp tục yêu cầu
    },
  
    // Middleware kiểm tra xem người dùng có phải là nhân viên không
    checkEmployee: (req, res, next) => {
      if (req.session.role !== 'employee') {
        return res.status(403).send('Bạn không có quyền truy cập vào trang này');
      }
      next(); // Nếu người dùng là nhân viên, tiếp tục yêu cầu
    }
  };
  