"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "",
    event: "",
    belt: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", form)
    // Add your form submission logic here
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Competitor Registration</CardTitle>
        <CardDescription>Enter competitor details for the tournament</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter competitor's name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Enter age"
              value={form.age}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              placeholder="Enter weight in kg"
              value={form.weight}
              onChange={handleChange}
              min="1"
              step="0.1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={form.gender} onValueChange={(value) => handleSelectChange("gender", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">Event Category</Label>
            <Select value={form.event} onValueChange={(value) => handleSelectChange("event", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sparring">Sparring</SelectItem>
                <SelectItem value="poomsae">Poomsae</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="belt">Belt Level</Label>
            <Select value={form.belt} onValueChange={(value) => handleSelectChange("belt", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select belt level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="white">White Belt</SelectItem>
                <SelectItem value="yellow">Yellow Belt</SelectItem>
                <SelectItem value="blue">Blue Belt</SelectItem>
                <SelectItem value="red">Red Belt</SelectItem>
                <SelectItem value="black">Black Belt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Add Competitor
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
