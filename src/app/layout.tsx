"use client";

import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Nav, NavLink } from "@/components/Nav";
import { Provider } from "react-redux";
import store from "@/api/store";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Nav>
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/addNewUser">Add New User</NavLink>
        </Nav>
        <Provider store={store}>
          <div className="my-6 container">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
