import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ProfileMenu } from "../../features/auth/ui/components/ProfileMenu";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

export function AppShell({ children, title, showBack = false }: AppShellProps) {
  return (
    <div className="dashboard">
      <header className="dashboard__topbar">
        <div className="dashboard__brand">
          <Link to="/" className="dashboard__brand-link">
            <span className="dashboard__logo">FS</span>
            <span>Feria Salesiano</span>
          </Link>
          {title && <span className="dashboard__page-title">{title}</span>}
        </div>
        <div className="dashboard__actions">
          {showBack && (
            <Link to="/" className="dashboard__nav-link">
              Inicio
            </Link>
          )}
          <Link to="/history" className="dashboard__nav-link">
            Historial
          </Link>
          <ProfileMenu />
        </div>
      </header>
      <main className="dashboard__content">{children}</main>
    </div>
  );
}
