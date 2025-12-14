// in the (auth) group, this is the layout file for writing common code that is shared across all auth pages like login, register, etc.

import AuthLayout from "@/features/auth/components/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
  <AuthLayout>
  {children}
  </AuthLayout>
)
}
export default Layout;