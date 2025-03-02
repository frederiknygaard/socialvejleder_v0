"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { useChat } from "ai/react"

const topics = [
  "Tankemylder og bekymringer",
  "Tristhed og ked-af-det-hed",
  "Ensomhed og at blive udelukket",
  "Konflikter og samarbejdsproblemer med familie og venner",
  "Mobning",
  "Spørgsmål om seksualitet og kønsidentitet",
  "Lavt selvværd",
  "Pres for at præstere og være perfekt",
  "Uregelmæssig hverdag",
  "Manglende støtte fra voksne",
  "For meget forældrebestemmelse",
  "Problemer med stoffer",
  "At holde sine følelser inde",
  "For meget tid foran skærmen og digitale udfordringer",
  "Usund mad og dårlig ernæring",
  "Selvmordstanker",
]

const TopicCard: React.FC<{ topic: string; isSelected: boolean; onClick: () => void; isDarkMode: boolean }> = ({
  topic,
  isSelected,
  onClick,
  isDarkMode,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`cursor-pointer rounded-lg p-4 transition-all duration-300 ${
      isSelected
        ? isDarkMode
          ? "bg-blue-600 text-white"
          : "bg-blue-100 text-blue-800"
        : isDarkMode
          ? "bg-gray-700 text-gray-200"
          : "bg-white text-gray-800"
    } shadow-md hover:shadow-lg relative overflow-hidden`}
  >
    <div className="flex items-center justify-between">
      <p className={`text-sm md:text-base ${isSelected ? "font-bold" : ""}`}>{topic}</p>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`rounded-full p-1 ${isDarkMode ? "bg-blue-400" : "bg-blue-200"}`}
        >
          <Check className="w-4 h-4" />
        </motion.div>
      )}
    </div>
    {isSelected && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        className="absolute inset-0 bg-blue-500 rounded-lg"
        style={{ zIndex: -1 }}
      />
    )}
  </motion.div>
)

export default function AIChat() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [isChatStarted, setIsChatStarted] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const startChat = () => {
    if (selectedTopics.length > 0) {
      setIsChatStarted(true)
      const topicsMessage = `Hej, jeg vil gerne tale om følgende emner: ${selectedTopics.join(", ")}. Kan du hjælpe mig med det?`
      handleSubmit(new Event("submit") as any, { body: { messages: [{ role: "user", content: topicsMessage }] } })
    }
  }

  return (
    <div className={`flex-1 flex flex-col h-screen ${isDarkMode ? "dark bg-[#2D2D2D]" : "bg-[#FEF1E5]"}`}>
      {!isChatStarted ? (
        <div className="flex-1 p-6 overflow-y-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
          >
            Vælg emner du vil tale om
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {topics.map((topic, index) => (
              <TopicCard
                key={index}
                topic={topic}
                isSelected={selectedTopics.includes(topic)}
                onClick={() => toggleTopic(topic)}
                isDarkMode={isDarkMode}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <Button
              onClick={startChat}
              disabled={selectedTopics.length === 0}
              className={`px-8 py-3 text-lg md:text-xl font-semibold rounded-full transition-all duration-300 ${
                selectedTopics.length > 0
                  ? isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              Start Chat
            </Button>
          </motion.div>
        </div>
      ) : (
        <>
          <div
            className={`p-4 flex items-center justify-between border-b ${isDarkMode ? "border-gray-700" : "border-amber-200"}`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-blue-500">
                <Sparkles className="h-5 w-5 text-white" />
              </Avatar>
              <div>
                <h2 className="font-semibold">AI Chat</h2>
                <p className="text-xs opacity-70">Powered by AI</p>
              </div>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? "bg-[#2D2D2D]" : "bg-[#FEF1E5]"}`}>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-6`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mr-3 mt-1">
                        <Sparkles className="h-4 w-4 text-white" />
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? isDarkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : isDarkMode
                            ? "bg-[#3D3D3D] text-white"
                            : "bg-white text-gray-800"
                      } shadow-md text-sm md:text-base leading-relaxed`}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 ml-3 mt-1">
                        <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-full h-full flex items-center justify-center text-white font-medium">
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

          <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-amber-200"}`}>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div
                className={`flex gap-2 p-2 rounded-full ${isDarkMode ? "bg-[#3D3D3D] border border-gray-600" : "bg-white border border-amber-200"} shadow-md`}
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className={`flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    isDarkMode ? "bg-[#3D3D3D] text-white placeholder-gray-400" : "bg-white placeholder-gray-500"
                  } text-sm md:text-base`}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className={`rounded-full ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-500 hover:bg-amber-600"
                  }`}
                  disabled={isLoading}
                >
                  <Send className="h-5 w-5 text-white" />
                </Button>
              </div>
              <div className="text-xs md:text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
                AI Chat is designed to provide support, not professional therapy. If you're in crisis, please contact a
                mental health professional.
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

