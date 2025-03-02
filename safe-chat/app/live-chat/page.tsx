"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

export default function LiveChat() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Welcome to Live Chat! A support specialist will be with you shortly.", sender: "system" },
  ])
  const [input, setInput] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newUserMessage = { id: messages.length + 1, content: input, sender: "user" }
    setMessages([...messages, newUserMessage])
    setInput("")

    // Simulate support specialist response after a short delay
    setTimeout(() => {
      const newSupportMessage = {
        id: messages.length + 2,
        content: "Thank you for your message. A support specialist is reviewing it and will respond shortly.",
        sender: "support",
      }
      setMessages((prevMessages) => [...prevMessages, newSupportMessage])
    }, 1000)
  }

  return (
    <div className={`flex-1 flex flex-col h-screen ${isDarkMode ? "dark bg-[#2D2D2D]" : "bg-[#FEF1E5]"}`}>
      {/* Chat header */}
      <div
        className={`p-4 flex items-center justify-between border-b ${isDarkMode ? "border-gray-700" : "border-amber-200"}`}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/20">
            <Users className="h-5 w-5 text-amber-600" />
          </Avatar>
          <div>
            <h2 className="font-semibold">Live Chat Support</h2>
            <p className="text-xs opacity-70">Connect with a specialist</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? "bg-[#2D2D2D]" : "bg-[#FEF1E5]"}`}
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-6`}
              >
                {message.sender !== "user" && (
                  <Avatar className="h-8 w-8 mr-3 mt-1">
                    {message.sender === "system" ? (
                      <div className="bg-gray-500 w-full h-full flex items-center justify-center text-white">S</div>
                    ) : (
                      <Users className="h-4 w-4 text-amber-600" />
                    )}
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                        ? "bg-[#3D3D3D] text-white"
                        : "bg-white text-gray-800"
                  } shadow-sm`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-3 mt-1">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-full h-full flex items-center justify-center text-white font-medium">
                      U
                    </div>
                  </Avatar>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
      </div>

      {/* Input area */}
      <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-amber-200"}`}>
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div
            className={`flex gap-2 p-2 rounded-xl ${isDarkMode ? "bg-[#3D3D3D] border border-gray-600" : "bg-white border border-amber-200"}`}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className={`flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${isDarkMode ? "bg-[#3D3D3D] text-white" : "bg-white"}`}
            />
            <Button
              type="submit"
              size="icon"
              className={`rounded-lg ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-500 hover:bg-amber-600"}`}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-xs text-center mt-2 text-muted-foreground">
            Our support team is here to help. Please allow a few moments for a specialist to respond.
          </div>
        </form>
      </div>
    </div>
  )
}

