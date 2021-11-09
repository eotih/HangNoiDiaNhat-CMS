import JWTDecode from 'jwt-decode';

function requireAuth(req, res, next) {
  const token = localStorage.getItem('token');
  const data = JWTDecode(token);
  if (!token) {
    res.redirect('/login');
  }
}
export default requireAuth;
