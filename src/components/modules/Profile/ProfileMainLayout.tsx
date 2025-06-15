"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X, User } from "lucide-react";
import { profileSettingItems } from "@/components/shared/Profile-sidebar";
import { useUser } from "@/context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { logOut } from "@/services/AuthService";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader/Loader";

interface ProfileMainLayoutProps {
  children: React.ReactNode;
}

const ProfileMainLayout = ({ children }: ProfileMainLayoutProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const handleLogout = async () => {
    await logOut();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen pt-0">
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <motion.button
            onClick={() => setNavOpen(!navOpen)}
            className="flex items-center justify-between w-full p-4 bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] shadow-md"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {navOpen ? (
              <span className="flex items-center justify-between w-full text-[#1E3A8A] font-semibold">
                Close Dashboard <X className="w-6 h-6" />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/favicon.png"
                    alt="Logo"
                    width={1000}
                    height={1000}
                    className="w-20 rounded-md"
                  />
                </Link>
                <User className="w-6 h-6 text-[#1E3A8A]" />
              </div>
            )}
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        <motion.aside
          initial={{ x: -300 }}
          animate={{
            x: navOpen || !isMobile ? 0 : -300,
            opacity: navOpen || !isMobile ? 1 : 0,
          }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed md:sticky top-0 left-0 z-40 w-64 lg:w-80 min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] text-gray-800 shadow-xl overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center py-8 border-b border-[#1E3A8A]">
              <motion.div
                className="relative shadow-lg rounded-md ring-[#1E3A8A] ring-2"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={user.profileImage}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className="object-cover w-20 h-20"
                />
              </motion.div>
              <motion.h2
                className="mt-4 text-lg font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, {user?.name}
              </motion.h2>
            </div>

            <nav className="flex flex-col flex-1 gap-2 px-4 py-6">
              {profileSettingItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive
                          ? "bg-[#1E3A8A] text-white shadow-md"
                          : "hover:bg-blue-100/80 text-gray-700 hover:text-[#1E3A8A]"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="px-4 mt-10 pb-10">
                <motion.button
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-red-600 transition bg-red-100 rounded-lg shadow-sm hover:bg-red-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </nav>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 mt-24 md:mt-0 p-4">{children}</main>
    </div>
  );
};

export default ProfileMainLayout;
