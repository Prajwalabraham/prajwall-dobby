import { Navigate } from "react-router-dom";
import {useAuth} from './components/auth'

const Protected = ({ children }) => {

  const auth = useAuth()

  if (!auth.user) {
    return <Navigate to="/" />;
  }
  
  return children;
  
};
export default Protected;