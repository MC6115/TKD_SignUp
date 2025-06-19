"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Trophy, Weight, Download, Printer, Filter, AlertTriangle } from "lucide-react"
import Navigation from "@/components/navigation"
import { sortCompetitors } from "@/lib/logic"

type Competitor = {
  name: string
  age: number
  weight: number
  gender: string
  events: string[]
  belt: string
}

// Define age groups locally to match the logic file
const AgeGroups = [
  { name: "dragons", minAge: 6, maxAge: 7 },
  { name: "tigers", minAge: 8, maxAge: 9 },
  { name: "youth", minAge: 10, maxAge: 11 },
  { name: "cadet", minAge: 12, maxAge: 14 },
  { name: "junior", minAge: 15, maxAge: 17 },
  { name: "senior", minAge: 18, maxAge: 33 },
  { name: "ultra", minAge: 32, maxAge: Number.POSITIVE_INFINITY },
]

// Local helper functions
function findAgeGroup(age: number) {
  return AgeGroups.find((group) => age >= group.minAge && age <= group.maxAge)?.name || null
}

export default function AdminPage() {
  const [data, setData] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [brackets, setBrackets] = useState<unknown[]>([])
  type UnmatchedCompetitor = Competitor & { event: string; reason?: string }
  const [unmatched, setUnmatched] = useState<UnmatchedCompetitor[]>([])
  const [filters, setFilters] = useState({
    ageGroup: "",
    weightClass: "",
    event: "",
    belt: "",
    gender: "",
  })
  const [unmatchedFilters, setUnmatchedFilters] = useState({
    event: "",
    belt: "",
    gender: "",
    reason: "",
  })
  const [filterOptions, setFilterOptions] = useState<{
    ageGroups: string[]
    weightClasses: string[]
    events: string[]
    belts: string[]
    genders: string[]
    reasons: string[]
  }>({
    ageGroups: [],
    weightClasses: [],
    events: [],
    belts: [],
    genders: [],
    reasons: [],
  })
  const bracketsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((competitors) => {
        setData(competitors)
        setLoading(false)

        // Generate brackets using the provided logic
        const result = sortCompetitors(competitors)

        // Convert the result to a format suitable for display
        const allBrackets = [
          ...Object.entries(result.sparringBrackets).map(([key, bracket]) => ({
            id: key,
            name: `Sparring: ${key.replace(/-/g, " ")}`,
            type: "sparring",
            contactRule: bracket.contactRule,
            competitors: bracket.competitors,
            key,
          })),
          ...Object.entries(result.formsGroups).map(([key, competitors]) => ({
            id: key,
            name: `Forms: ${key.replace(/-/g, " ")}`,
            type: "forms",
            competitors,
            key,
          })),
          ...Object.entries(result.breakingGroups).map(([key, competitors]) => ({
            id: key,
            name: `Breaking: ${key.replace(/-/g, " ")}`,
            type: "breaking",
            competitors,
            key,
          })),
        ]

        setBrackets(allBrackets)

        // Type guard to ensure object has all Competitor properties
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function isCompetitor(obj: any): obj is Competitor {
          return (
            obj &&
            typeof obj.name === "string" &&
            typeof obj.age === "number" &&
            typeof obj.weight === "number" &&
            typeof obj.gender === "string" &&
            Array.isArray(obj.events) &&
            typeof obj.belt === "string"
          )
        }

        const allUnmatched: UnmatchedCompetitor[] = [
          ...result.unmatchedSparring.filter(isCompetitor).map((c) => ({ ...c, event: "sparring" })),
          ...result.unmatchedForms.filter(isCompetitor).map((c) => ({ ...c, event: "forms" })),
          ...result.unmatchedBreaking.filter(isCompetitor).map((c) => ({ ...c, event: "breaking" })),
        ]
        setUnmatched(allUnmatched)
        setUnmatched(allUnmatched)

        // Get filter options from the actual data
        const ageGroups = [...new Set(competitors.map((c: { age: number }) => findAgeGroup(c.age)).filter(Boolean))] as string[]
        const events = ["sparring", "forms", "breaking"]
        const belts = ["yellow", "green", "blue", "red", "black"]
        const genders = [...new Set(competitors.map((c: { gender: boolean }) => c.gender))] as string[]
        const reasons = [...new Set(allUnmatched.map((c) => c.reason).filter(Boolean))]

        setFilterOptions({
          ageGroups,
          weightClasses: [],
          events,
          belts,
          genders,
          reasons: reasons.filter((r): r is string => typeof r === "string"),
        })
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  const getBeltColor = (belt: string) => {
    const colors = {
      yellow: "bg-yellow-100 text-yellow-800",
      green: "bg-green-100 text-green-800",
      blue: "bg-blue-100 text-blue-800",
      red: "bg-red-100 text-red-800",
      black: "bg-gray-900 text-white",
    }
    return colors[belt as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getEventIcon = (event: string) => {
    if (event === "sparring") return "🥊"
    if (event === "forms") return "🥋"
    if (event === "breaking") return "🧱"
    return "🏆"
  }

  const stats = {
    total: data.length,
    sparring: data.filter((c) => c.events.includes("sparring")).length,
    forms: data.filter((c) => c.events.includes("forms")).length,
    breaking: data.filter((c) => c.events.includes("breaking")).length,
    men: data.filter((c) => c.gender === "Men").length,
    women: data.filter((c) => c.gender === "Women").length,
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleUnmatchedFilterChange = (key: string, value: string) => {
    setUnmatchedFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredBrackets = brackets.filter((bracket) => {
    if (
      typeof bracket === "object" &&
      bracket !== null &&
      "key" in bracket &&
      "type" in bracket
    ) {
      const b = bracket as { key: string; type: string }
      if (filters.ageGroup && !b.key.includes(filters.ageGroup)) return false
      if (filters.gender && !b.key.includes(filters.gender)) return false
      if (filters.weightClass && !b.key.includes(filters.weightClass)) return false
      if (filters.event && b.type !== filters.event) return false
      if (filters.belt && !b.key.includes(filters.belt)) return false
      return true
    }
    return false
  })

  const filteredUnmatched = unmatched.filter((competitor) => {
    if (typeof competitor !== "object" || competitor === null) return false
    const c = competitor as { event?: string; belt?: string; gender?: string; reason?: string }
    if (unmatchedFilters.event && c.event !== unmatchedFilters.event) return false
    if (unmatchedFilters.belt && c.belt !== unmatchedFilters.belt) return false
    if (unmatchedFilters.gender && c.gender !== unmatchedFilters.gender) return false
    if (unmatchedFilters.reason && c.reason !== unmatchedFilters.reason) return false
    return true
  })

  const printBrackets = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const content = bracketsRef.current?.innerHTML || ""

    printWindow.document.write(`
      <html>
        <head>
          <title>Tournament Brackets</title>
          <style>
            body { font-family: system-ui, sans-serif; }
            .bracket { page-break-after: always; margin-bottom: 30px; }
            h2 { margin-bottom: 20px; }
            .competitor { padding: 5px; margin: 5px 0; background: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>Tournament Brackets</h1>
          ${content}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const downloadBracketsJSON = () => {
    const dataStr = JSON.stringify(brackets, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "tournament-brackets.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading competitor data...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      <div className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Admin Panel</h1>
            <p className="text-slate-600">Manage and view all registered competitors</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🥊</span>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Sparring</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.sparring}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🥋</span>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Forms</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.forms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🧱</span>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Breaking</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.breaking}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Weight className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">M / W</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.men} / {stats.women}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="brackets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="brackets">Tournament Brackets</TabsTrigger>
              <TabsTrigger value="unmatched">
                Unmatched ({unmatched.length})
                {unmatched.length > 0 && <AlertTriangle className="h-4 w-4 ml-1 text-orange-500" />}
              </TabsTrigger>
              <TabsTrigger value="competitors">Competitor List</TabsTrigger>
            </TabsList>

            {/* Brackets Tab */}
            <TabsContent value="brackets" className="space-y-6">
              {/* Filters and Actions */}
              <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-wrap gap-2 items-center">
                  <Filter className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">Filter Brackets:</span>

                  <Select
                    value={filters.event === "allEvents" ? "" : filters.event}
                    onValueChange={(value) => handleFilterChange("event", value === "allEvents" ? "" : value)}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allEvents">All Events</SelectItem>
                      {filterOptions.events.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.gender === "allGenders" ? "" : filters.gender}
                    onValueChange={(value) => handleFilterChange("gender", value === "allGenders" ? "" : value)}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allGenders">All Genders</SelectItem>
                      {filterOptions.genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.belt === "allBelts" ? "" : filters.belt}
                    onValueChange={(value) => handleFilterChange("belt", value === "allBelts" ? "" : value)}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Belt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allBelts">All Belts</SelectItem>
                      {filterOptions.belts.map((belt) => (
                        <SelectItem key={belt} value={belt}>
                          {belt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={printBrackets}>
                    <Printer className="h-4 w-4 mr-1" /> Print
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadBracketsJSON}>
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                </div>
              </div>

              {/* Brackets Display */}
              <div className="space-y-8" ref={bracketsRef}>
                {filteredBrackets.length > 0 ? (
                  filteredBrackets.map((bracket, index) => (
                    <Card key={index} className="bracket overflow-hidden">
                      <CardHeader className="bg-slate-50">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getEventIcon((bracket as { type: string }).type)}
                          {(bracket as { name: string }).name}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div>{(bracket as { competitors: Competitor[] }).competitors.length} competitors</div>
                          {typeof bracket === "object" &&
                            bracket !== null &&
                            "contactRule" in bracket &&
                            (bracket as { contactRule?: string }).contactRule && (
                              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Contact Rule: {(bracket as { contactRule?: string }).contactRule}
                              </div>
                            )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-3">
                          {(bracket as { competitors: Competitor[] }).competitors.map((competitor: Competitor, compIndex: number) => (
                            <div
                              key={compIndex}
                              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium">
                                  {compIndex + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{competitor.name}</div>
                                  <div className="text-sm text-slate-600">
                                    Age: {competitor.age} | Weight: {competitor.weight}kg
                                  </div>
                                </div>
                              </div>
                              <Badge className={`capitalize ${getBeltColor(competitor.belt)}`}>{competitor.belt}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No brackets match your filter criteria</p>
                    <p className="text-slate-400 text-sm mt-2">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Unmatched Tab */}
            <TabsContent value="unmatched">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Unmatched Competitors
                  </CardTitle>
                  <CardDescription>
                    Competitors who couldn&#39;t be placed in brackets ({filteredUnmatched.length} of {unmatched.length}{" "}
                    shown)
                  </CardDescription>
                </CardHeader>

                {/* Unmatched Filters */}
                {unmatched.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2 items-center bg-orange-50 p-3 rounded-lg">
                      <Filter className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Filter Unmatched:</span>

                      <Select
                        value={unmatchedFilters.event}
                        onValueChange={(value) =>
                          handleUnmatchedFilterChange("event", value === "allEvents" ? "" : value)
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue placeholder="Event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allEvents">All Events</SelectItem>
                          {filterOptions.events.map((event) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={unmatchedFilters.gender}
                        onValueChange={(value) =>
                          handleUnmatchedFilterChange("gender", value === "allGenders" ? "" : value)
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allGenders">All Genders</SelectItem>
                          {filterOptions.genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={unmatchedFilters.belt}
                        onValueChange={(value) =>
                          handleUnmatchedFilterChange("belt", value === "allBelts" ? "" : value)
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue placeholder="Belt" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allBelts">All Belts</SelectItem>
                          {filterOptions.belts.map((belt) => (
                            <SelectItem key={belt} value={belt}>
                              {belt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={unmatchedFilters.reason}
                        onValueChange={(value) =>
                          handleUnmatchedFilterChange("reason", value === "allReasons" ? "" : value)
                        }
                      >
                        <SelectTrigger className="w-[180px] h-8 text-xs">
                          <SelectValue placeholder="Reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allReasons">All Reasons</SelectItem>
                          {filterOptions.reasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <CardContent>
                  {filteredUnmatched.length > 0 ? (
                    <div className="space-y-4">
                      {filteredUnmatched.map((competitor, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-orange-50 border-orange-200 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg text-slate-800">{competitor.name}</h3>
                                <span className="text-2xl">{getEventIcon(competitor.event)}</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Age: {competitor.age}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Weight: {competitor.weight}kg
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {competitor.gender}
                                </Badge>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {competitor.event}
                                </Badge>
                              </div>

                              <div className="text-sm text-orange-700 bg-orange-100 px-2 py-1 rounded">
                                <strong>Reason:</strong> {competitor.reason}
                              </div>
                            </div>

                            <Badge className={`capitalize ${getBeltColor(competitor.belt)}`}>
                              {competitor.belt} Belt
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : unmatched.length > 0 ? (
                    <div className="text-center py-12">
                      <Filter className="h-12 w-12 text-orange-300 mx-auto mb-4" />
                      <p className="text-orange-600">No unmatched competitors match your filter criteria</p>
                      <p className="text-slate-400 text-sm mt-2">Try adjusting your filters</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <p className="text-green-600 text-lg">All competitors successfully matched!</p>
                      <p className="text-slate-400 text-sm">No unmatched competitors found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Competitors Tab */}
            <TabsContent value="competitors">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Registered Competitors
                  </CardTitle>
                  <CardDescription>Complete list of all tournament participants</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.length > 0 ? (
                    <div className="space-y-4">
                      {data.map((competitor: Competitor, index: number) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg text-slate-800">{competitor.name}</h3>
                                <div className="flex gap-1">
                                  {competitor.events.map((event) => (
                                    <span key={event} className="text-lg">
                                      {getEventIcon(event)}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Age: {competitor.age}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Weight: {competitor.weight}kg
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {competitor.gender}
                                </Badge>
                                {competitor.events.map((event) => (
                                  <Badge key={event} variant="outline" className="text-xs capitalize">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Badge className={`capitalize ${getBeltColor(competitor.belt)}`}>
                              {competitor.belt} Belt
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 text-lg">No competitors registered yet</p>
                      <p className="text-slate-400 text-sm">Competitors will appear here once they register</p>
                    </div>
                  )}
                </CardContent>

                {/* Raw Data Section */}
                <CardFooter className="bg-slate-50 border-t">
                  <details className="w-full">
                    <summary className="cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                      View Raw JSON Data
                    </summary>
                    <Separator className="my-2" />
                    <pre className="bg-slate-100 p-4 rounded-md text-xs overflow-auto max-h-64 text-slate-800 mt-2">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </details>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
