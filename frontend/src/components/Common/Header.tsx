import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import UserAvatar from "./UserAvatar";
import { SunIcon, MoonIcon, LogOutIcon } from "./Icons";

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">Mini Trello</h1>
        </div>

        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          {user && (
            <div className="user-section">
              <UserAvatar user={user} />
              <span className="user-email">{user.email}</span>
              <button
                className="btn btn-ghost"
                onClick={logout}
                style={{ color: "inherit", borderColor: "rgba(255,255,255,0.15)" }}
              >
                <LogOutIcon size={16} />
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
