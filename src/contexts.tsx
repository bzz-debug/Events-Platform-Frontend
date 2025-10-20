import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "../firebase";

interface StaffAuthContextType {
  staff: User | null;
  setStaff: Function;
  loading: boolean;
  isStaffLoggedIn: boolean;
}

interface UserAuthContextType {
  user: UserWithId | null;
  setUser: React.Dispatch<React.SetStateAction<UserWithId | null>>;
  loading: boolean;
  isUserLoggedIn: boolean;
}

interface UserWithId {
  id: string;
  email: string;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(
  undefined
);

export function StaffAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (staff) => {
      console.log("Staff context updated:", staff);
      setStaff(staff);
      setLoading(false);
    });
  }, []);

  const isStaffLoggedIn = !!staff;

  return (
    <StaffAuthContext.Provider
      value={{ staff, setStaff, loading, isStaffLoggedIn }}
    >
      {children}
    </StaffAuthContext.Provider>
  );
}

export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithId | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
  setUser({
    id: user.uid,
    email: user.email ?? ""
    
  });
} else {
  setUser(null);
}
      setLoading(false);
    });
  }, []);

  const isUserLoggedIn = !!user;

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, loading, isUserLoggedIn }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
