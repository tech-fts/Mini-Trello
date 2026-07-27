import { User } from "../../types/index";

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
  const initials = user.email
    .split("@")[0]
    .split("")
    .slice(0, 2)
    .map((c) => c.toUpperCase())
    .join("");

  return (
    <div className="user-avatar">
      <div className="avatar-circle">
        {initials}
      </div>
    </div>
  );
}

export default UserAvatar;
