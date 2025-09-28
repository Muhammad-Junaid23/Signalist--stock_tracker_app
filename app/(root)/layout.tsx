// import Header from "@/components/Header";
// import {auth} from "@/lib/better-auth/auth";
// import {headers} from "next/headers";
// import {redirect} from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen text-gray-400'>
      {/* <Header user={user} /> */}

      <div className='container py-10'>{children}</div>
    </main>
  );
};
export default Layout;
