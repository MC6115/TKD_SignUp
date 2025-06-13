"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/navigation"
import { toast } from "sonner"
import { useTheme } from "next-themes"

type Competitor = {
  name: string
  age: number
  weight: number
  gender: string
  events: string[]
  belt: string
}

export default function Home() {
  const [data, setData] = useState<Competitor[]>([])
  const [form, setForm] = useState<Competitor>({
    name: "",
    age: 0,
    weight: 0,
    gender: "Men",
    events: [],
    belt: "yellow",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleEventChange = (event: string, checked: boolean) => {
    if (checked) {
      setForm({ ...form, events: [...form.events, event] })
    } else {
      setForm({ ...form, events: form.events.filter((e) => e !== event) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.events.length === 0) {
      toast.error("Please select at least one event")
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading("Registering competitor...")

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        const updated = await res.json()
        setData(updated)

        const competitorName = form.name
        const eventCount = form.events.length
        const eventsList = form.events.join(", ")

        setForm({
          name: "",
          age: 0,
          weight: 0,
          gender: "Men",
          events: [],
          belt: "yellow",
        })

        toast.dismiss(loadingToast)
        toast.success(
          `${competitorName} successfully registered for ${eventCount} event${eventCount > 1 ? "s" : ""}!`,
          {
            description: `Events: ${eventsList}`,
            duration: 4000,
          },
        )
      } else {
        const errorData = await res.json()
        toast.dismiss(loadingToast)
        toast.error("Registration failed", {
          description: errorData.error || "Failed to register competitor",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.dismiss(loadingToast)
      toast.error("Network error", {
        description: "Unable to connect to server. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const availableEvents = [
    { id: "sparring", label: "Sparring", icon: "🥊" },
    { id: "forms", label: "Forms", icon: "🥋" },
    { id: "breaking", label: "Breaking", icon: "🧱" },
  ]

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-800">Tournament Manager</h1>
              <h2 className="text-xl font-semibold text-slate-600">Competitor Registration</h2>
              <p className="text-slate-500">Register new competitors for the tournament</p>
            </div>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-slate-50 rounded-t-lg">
                <CardTitle className="text-slate-800">Add New Competitor</CardTitle>
                <CardDescription>Enter competitor details for the tournament</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-6">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Tournament Manager</h1>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300">Competitor Registration</h2>
            <p className="text-slate-500 dark:text-slate-400">Register new competitors for the tournament</p>

            {/* Theme toggle button */}
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs"
              >
                {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </Button>
            </div>
          </div>

          <Card className="shadow-lg border-0 dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-slate-50 rounded-t-lg dark:bg-slate-700">
              <CardTitle className="text-slate-800 dark:text-slate-100">Add New Competitor</CardTitle>
              <CardDescription className="dark:text-slate-300">
                Enter competitor details for the tournament
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-slate-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter competitor's name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="dark:text-slate-200">
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter age"
                    value={form.age || ""}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    required
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="dark:text-slate-200">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter weight in kg"
                    value={form.weight || ""}
                    onChange={handleChange}
                    min="1"
                    step="0.1"
                    required
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="dark:text-slate-200">
                    Gender
                  </Label>
                  <Select value={form.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="dark:text-slate-200">Event Categories</Label>
                  <div className="space-y-3">
                    {availableEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={event.id}
                          checked={form.events.includes(event.id)}
                          onCheckedChange={(checked) => handleEventChange(event.id, checked as boolean)}
                          className="dark:border-slate-500"
                        />
                        <Label
                          htmlFor={event.id}
                          className="flex items-center space-x-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-200"
                        >
                          <span className="text-lg">{event.icon}</span>
                          <span>{event.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {form.events.length === 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400">Please select at least one event</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="belt" className="dark:text-slate-200">
                    Belt Level
                  </Label>
                  <Select value={form.belt} onValueChange={(value) => handleSelectChange("belt", value)}>
                    <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                      <SelectValue placeholder="Select belt level" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="yellow">Yellow Belt</SelectItem>
                      <SelectItem value="green">Green Belt</SelectItem>
                      <SelectItem value="blue">Blue Belt</SelectItem>
                      <SelectItem value="red">Red Belt</SelectItem>
                      <SelectItem value="black">Black Belt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.events.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Selected Events:</p>
                    <div className="flex flex-wrap gap-2">
                      {form.events.map((eventId) => {
                        const event = availableEvents.find((e) => e.id === eventId)
                        return (
                          <div
                            key={eventId}
                            className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-800/50 px-2 py-1 rounded"
                          >
                            <span>{event?.icon}</span>
                            <span className="text-sm text-blue-800 dark:text-blue-200">{event?.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || form.events.length === 0}>
                  {isLoading ? "Adding..." : "Add Competitor"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
