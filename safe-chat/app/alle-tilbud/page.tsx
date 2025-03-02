"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Category = {
  mainTitle: string
  subtitles: string[]
  infoText: string
  offers: {
    id: number
    title: string
    description: string
    action: string
    link: string
  }[]
}

const CategoryCard = ({ category, isDarkMode }: { category: Category; isDarkMode: boolean }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } transition-all duration-300 ease-in-out hover:shadow-lg h-full flex flex-col`}
      >
        <CardHeader className="p-4 transition-all duration-300 ease-in-out bg-gradient-to-r from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-600">
          <CardTitle className="text-xl font-bold transition-colors duration-300 ease-in-out text-amber-800 dark:text-amber-300">
            {category.mainTitle}
          </CardTitle>
          <div className="flex flex-wrap gap-2 my-2">
            {category.subtitles.map((subtitle, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ease-in-out ${
                  isDarkMode
                    ? "bg-amber-700 text-amber-100 hover:bg-amber-600"
                    : "bg-amber-200 text-amber-800 hover:bg-amber-300"
                }`}
              >
                {subtitle}
              </span>
            ))}
          </div>
          <CardDescription>{category.infoText}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="grid gap-4 mt-4">
            {category.offers.map((offer) => (
              <Card key={offer.id} className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
                <CardHeader>
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{offer.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary">
                    <a href={offer.link}>{offer.action}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AlleTilbud() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const categories: Category[] = [
    {
      mainTitle: "Børne- og ungeliv",
      subtitles: ["Opvækst", "Skole", "Venskaber", "Trivsel"],
      infoText: "Navigér gennem ungdommens udfordringer og muligheder.",
      offers: [
        {
          id: 1,
          title: "Ungdomsrådgivning",
          description: "Få hjælp og vejledning om alt fra skole til venskaber.",
          action: "Book tid",
          link: "#",
        },
        {
          id: 2,
          title: "Skoletrivsel Workshop",
          description: "Deltag i vores workshop om at trives i skolen.",
          action: "Tilmeld",
          link: "#",
        },
      ],
    },
    {
      mainTitle: "Sociale relationer og fællesskab",
      subtitles: ["Ensomhed og fællesskaber", "Socialt udsatte"],
      infoText: "Opbyg meningsfulde forbindelser og find dit fællesskab.",
      offers: [
        {
          id: 3,
          title: "Fællesskabscafé",
          description: "Mød andre i vores hyggelige café og skab nye venskaber.",
          action: "Se åbningstider",
          link: "#",
        },
        {
          id: 4,
          title: "Mentorordning",
          description: "Få støtte fra en erfaren mentor til at opbygge sociale relationer.",
          action: "Ansøg nu",
          link: "#",
        },
      ],
    },
    {
      mainTitle: "Voksenliv og familie",
      subtitles: ["Familieliv", "Pårørende", "Seniorliv"],
      infoText: "Styrk dine relationer og find balance i familielivet.",
      offers: [
        {
          id: 5,
          title: "Familieterapi",
          description: "Få professionel hjælp til at styrke jeres familiedynamik.",
          action: "Book session",
          link: "#",
        },
        {
          id: 6,
          title: "Senioraktiviteter",
          description: "Deltag i vores mange aktiviteter for seniorer.",
          action: "Se program",
          link: "#",
        },
      ],
    },
    {
      mainTitle: "Identitet og tilhørsforhold",
      subtitles: ["Kønsidentitet og seksuel orientering", "Flygtninge og indvandrere"],
      infoText: "Udforsk og omfavn din unikke identitet og plads i verden.",
      offers: [
        {
          id: 7,
          title: "LGBTQ+ Support Gruppe",
          description: "Mød andre i et trygt og støttende miljø.",
          action: "Bliv medlem",
          link: "#",
        },
        {
          id: 8,
          title: "Kulturel Integration",
          description: "Få hjælp til at navigere i det danske samfund.",
          action: "Læs mere",
          link: "#",
        },
      ],
    },
    {
      mainTitle: "Kriseforløb og traumer",
      subtitles: ["Livskrise", "Mental sundhed", "Vold og misbrug"],
      infoText: "Find styrke og støtte til at overkomme livets udfordringer.",
      offers: [
        {
          id: 9,
          title: "Krisecenter",
          description: "Akut hjælp og beskyttelse for voldsramte.",
          action: "Kontakt os",
          link: "#",
        },
        {
          id: 10,
          title: "Traumebehandling",
          description: "Professionel behandling af traumer og PTSD.",
          action: "Book forløb",
          link: "#",
        },
      ],
    },
    {
      mainTitle: "Praktiske udfordringer",
      subtitles: ["Jura og økonomi", "Sundhed", "Misbrug", "Indsatte", "Veteraner", "Handicap"],
      infoText: "Få hjælp til at navigere hverdagens komplekse problemstillinger.",
      offers: [
        {
          id: 11,
          title: "Juridisk Rådgivning",
          description: "Gratis juridisk rådgivning om hverdagens udfordringer.",
          action: "Book tid",
          link: "#",
        },
        {
          id: 12,
          title: "Økonomisk Vejledning",
          description: "Få hjælp til at styre din økonomi og komme ud af gæld.",
          action: "Start her",
          link: "#",
        },
      ],
    },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-[#2D2D2D] text-white" : "bg-[#FEF1E5]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Alle tilbud</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  )
}

