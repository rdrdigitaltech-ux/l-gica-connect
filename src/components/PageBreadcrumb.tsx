import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Início</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
