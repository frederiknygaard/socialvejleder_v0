"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OfferHistory() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [unlockedOffers, setUnlockedOffers] = useState([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API or local storage
    const mockUnlockedOffers = [
      {
        id: 1,
        title: "Local Support Group",
        description: "Join a weekly meeting with others facing similar challenges.",
        action: "Join Group",
        link: "#",
        unlockedDate: "2023-06-15",
      },
      {
        id: 2,
        title: "Mindfulness Workshop",
        description: "Learn techniques to stay present and reduce anxiety.",
        action: "Register",
        link: "#",
        unlockedDate: "2023-06-18",
      },
      {
        id: 3,
        title: "Volunteer Opportunity",
        description: "Help others and boost your mood by volunteering at the community garden.",
        action: "Sign Up",
        link: "#",
        unlockedDate: "2023-06-20",
      },
    ]
    setUnlockedOffers(mockUnlockedOffers)
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-[#2D2D2D] text-white" : "bg-[#FEF1E5]"}`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Offer History</h1>
        </div>

        <div className="space-y-6">
          {unlockedOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{offer.title}</CardTitle>
                  <CardDescription>Unlocked on: {offer.unlockedDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{offer.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={offer.link}>
                      {offer.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
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

