"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function MineTilbud() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const offers = [
    {
      id: 1,
      title: "Local Support Group",
      description: "Join a weekly meeting with others facing similar challenges.",
      unlockDate: "2024-02-28",
      action: "Join Group",
      link: "#",
    },
    {
      id: 2,
      title: "Mindfulness Workshop",
      description: "Learn techniques to stay present and reduce anxiety.",
      unlockDate: "2024-02-27",
      action: "Register",
      link: "#",
    },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-[#2D2D2D] text-white" : "bg-[#FEF1E5]"}`}>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Mine tilbud</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{offer.title}</CardTitle>
                  <CardDescription>Unlocked: {offer.unlockDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{offer.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={offer.link}>{offer.action}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

