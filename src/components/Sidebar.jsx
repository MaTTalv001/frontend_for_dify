// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../configs/menuItems';

export default function Sidebar() {
  const location = useLocation();

  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li className="mb-4">
        <h1 className="text-2xl font-bold">アプリ名</h1>
      </li>
      
      {menuItems.map((item, index) => (
        <li key={index} className="tooltip tooltip-bottom" data-tip={item.description}>
          <Link 
            to={item.path} 
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.icon}
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}