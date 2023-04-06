"use client";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function LogOut() {
  return (
    <button onClick={() => signOut()}>
      <LogOutIcon
        size={18}
        className="text-gray-100 hover:text-gray-200 ml-4"
      />
    </button>
  );
}
