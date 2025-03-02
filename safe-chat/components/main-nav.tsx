"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, MessageCircle, Users, Gift, Sparkles } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

const aiChats = [
  { id: 1, title: "First Conversation", path: "/ai-chat/1" },
  { id: 2, title: "Previous Session", path: "/ai-chat/2" },
  { id: 3, title: "Current Session", path: "/ai-chat/3" },
]

const liveChats = [
  { id: 1, title: "Support Chat #1", path: "/live-chat/1" },
  { id: 2, title: "Ongoing Chat", path: "/live-chat/2", active: true },
]

export function MainNav() {
  const pathname = usePathname()
  const [openAIChats, setOpenAIChats] = React.useState(true)
  const [openLiveChats, setOpenLiveChats] = React.useState(true)

  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-lg font-semibold">Safe Space</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {/* AI Chat Section */}
            <Collapsible open={openAIChats} onOpenChange={setOpenAIChats}>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full">
                    <MessageCircle className="h-4 w-4" />
                    <span>AI Chat</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${openAIChats ? "rotate-180" : ""}`}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {aiChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild isActive={pathname === chat.path}>
                      <Link href={chat.path}>
                        <Sparkles className="h-4 w-4" />
                        <span>{chat.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Live Chat Section */}
            <Collapsible open={openLiveChats} onOpenChange={setOpenLiveChats}>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full">
                    <Users className="h-4 w-4" />
                    <span>Live Chat</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${openLiveChats ? "rotate-180" : ""}`}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {liveChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild isActive={pathname === chat.path}>
                      <Link href={chat.path}>
                        <Users className="h-4 w-4" />
                        <span>{chat.title}</span>
                        {chat.active && <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Mine Tilbud */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/mine-tilbud"}>
                <Link href="/mine-tilbud">
                  <Gift className="h-4 w-4" />
                  <span>Mine tilbud</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Alle Tilbud */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/alle-tilbud"}>
                <Link href="/alle-tilbud">
                  <Gift className="h-4 w-4" />
                  <span>Alle tilbud</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

