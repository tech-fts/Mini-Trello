import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "./UserAvatar";

/**
 * App header bar. Only rendered when the user is authenticated (KanbanShell),
 * so there is no "logged out" branch — the login/register pages have their own layout.
 */
export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">Mini Trello</h1>
        </div>

        <div className="header-right">
          {user && (
            <div className="user-section">
              <UserAvatar user={user} />
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
