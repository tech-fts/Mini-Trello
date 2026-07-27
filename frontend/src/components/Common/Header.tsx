import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "./UserAvatar";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">Mini Trello</h1>
        </div>

        <div className="header-right">
          {user ? (
            <div className="user-section">
              <UserAvatar user={user} />
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-section">
              <button className="login-btn">Login</button>
              <button className="register-btn">Register</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
