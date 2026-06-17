import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
const user = JSON.parse(sessionStorage.getItem("user"));
const token = sessionStorage.getItem("token");

if (!user || !token) {
return <Navigate to="/login" replace />;
}

if (role && user.role !== role) {
return <Navigate to="/dashboard" replace />;
}

return children;
};

export default ProtectedRoute;
