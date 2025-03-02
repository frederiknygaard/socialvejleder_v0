"use client"

import { useState } from "react"
import { Moon, Sun, Settings, LogOut, History, Gift, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={`w-64 flex-shrink-0 border-r rounded-l-xl ${isDarkMode ? "bg-[#1F1F1F] border-gray-700" : "bg-[#FFDFBF] border-amber-200"} flex flex-col h-screen`}
    >
      {/* New chat button */}
      <div className="p-4">
        <Link href="/">
          <Button
            className={`w-full justify-start gap-2 rounded-xl p-2 ${
              isDarkMode ? "bg-[#3D3D3D] hover:bg-[#4D4D4D] text-white" : "bg-white hover:bg-gray-50 text-black"
            }`}
          >
            <span className="font-semibold">Socialvejleder</span>
          </Button>
        </Link>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 overflow-y-auto p-2">
        <h3 className={`px-2 py-1 text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-amber-700"}`}>MENU</h3>

        {/* AI Chat */}
        <Link href="/" passHref legacyBehavior>
          <Button
            variant="ghost"
            className={`w-full justify-between rounded-lg ${pathname === "/" ? "bg-secondary" : ""}`}
          >
            <div className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>AI Chat</span>
            </div>
          </Button>
        </Link>

        {/* Live Chat */}
        <Link href="/live-chat" passHref legacyBehavior>
          <Button
            variant="ghost"
            className={`w-full justify-between rounded-lg ${pathname === "/live-chat" ? "bg-secondary" : ""}`}
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Live Chat</span>
            </div>
          </Button>
        </Link>

        {/* Mine tilbud */}
        <Link href="/mine-tilbud" passHref legacyBehavior>
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-lg ${pathname === "/mine-tilbud" ? "bg-secondary" : ""}`}
          >
            <Gift className="mr-2 h-4 w-4" />
            <span>Mine tilbud</span>
          </Button>
        </Link>

        {/* Alle tilbud */}
        <Link href="/alle-tilbud" passHref legacyBehavior>
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-lg ${pathname === "/alle-tilbud" ? "bg-secondary" : ""}`}
          >
            <Gift className="mr-2 h-4 w-4" />
            <span>Alle tilbud</span>
          </Button>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="p-4 border-t border-b border-amber-200">
        <h3 className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-amber-700"}`}>
          PROGRESS TO SOCIAL OFFERS
        </h3>
        <Progress value={progress} className="w-full rounded-full" />
        {progress === 100 && (
          <Link href="/social-offers" className="block mt-2">
            <Button className="w-full rounded-lg">View Social Offers</Button>
          </Link>
        )}
      </div>

      {/* User settings */}
      <div className={`p-4 ${isDarkMode ? "border-gray-700" : "border-amber-200"}`}>
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/offer-history">
            <Button variant="ghost" size="icon" className="rounded-full">
              <History className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-full h-full flex items-center justify-center text-white font-medium">
              U
            </div>
          </Avatar>
          <div className="text-sm font-medium">User</div>
        </div>
      </div>
    </div>
  )
}

