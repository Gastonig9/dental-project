import RoutesConfig from '../../routes/RoutesConfig';
import { AuthProvider } from '../../Features/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RoutesConfig />
    </AuthProvider>
  );
}

export default App;
