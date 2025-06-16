
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer";
//import { AuthProvider } from "../context/AuthContext";
import SessionWrapper from "./SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Twitter Clone",
  description: "Generated Twitter clone app",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        > 
          <main className="flex-grow">
            <SessionWrapper>
              {children}
            </SessionWrapper>
          </main>      
          <Footer/> 
        </body>
      </html>
    
  );
}
