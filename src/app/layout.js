import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "@/context/userContext";
import UserProvider from "@/context/userProvider";
import {connectDb} from "@/helper/db";

const inter = Inter({ subsets: ['latin'] })
connectDb();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>

      <ToastContainer />
      <Navbar/>

      {children}


          <div className={`absolute bottom-0`}>  <Footer/></div>
      </UserProvider>


      </body>
    </html>
  )
}
