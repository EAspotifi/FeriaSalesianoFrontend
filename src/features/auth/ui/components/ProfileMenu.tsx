import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProfileMenu() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const displayName = session?.user.nombre ?? session?.user.username ?? "Usuario";
  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goTo(path: string) {
    setOpen(false);
    navigate(path);
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        type="button"
        className="profile-menu__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="profile-menu__avatar">{initial}</span>
        <span className="profile-menu__name">{displayName}</span>
      </button>

      {open && (
        <div className="profile-menu__dropdown" role="menu">
          <button
            type="button"
            className="profile-menu__item"
            role="menuitem"
            onClick={() => goTo("/profile")}
          >
            Mi perfil
          </button>
          <button
            type="button"
            className="profile-menu__item"
            role="menuitem"
            onClick={() => goTo("/devices")}
          >
            Mis dispositivos
          </button>
          <button
            type="button"
            className="profile-menu__item profile-menu__item--danger"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
