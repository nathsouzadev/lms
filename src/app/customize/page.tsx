"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/simple-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CustomizePage() {
  const [headerColor, setHeaderColor] = useState("#ffffff")
  const [logoColor, setLogoColor] = useState("#000000")
  const [pageTitle, setPageTitle] = useState("My Website")

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedHeaderColor = localStorage.getItem("headerColor")
    const savedLogoColor = localStorage.getItem("logoColor")
    const savedPageTitle = localStorage.getItem("pageTitle")

    if (savedHeaderColor) setHeaderColor(savedHeaderColor)
    if (savedLogoColor) setLogoColor(savedLogoColor)
    if (savedPageTitle) setPageTitle(savedPageTitle)
  }, [])

  const savePreferences = () => {
    localStorage.setItem("headerColor", headerColor)
    localStorage.setItem("logoColor", logoColor)
    localStorage.setItem("pageTitle", pageTitle)
    alert("Preferences saved!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Customize Your Header</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="headerColor">Header Color</Label>
          <Input id="headerColor" type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="logoColor">Logo Color</Label>
          <Input id="logoColor" type="color" value={logoColor} onChange={(e) => setLogoColor(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="pageTitle">Page Title</Label>
          <Input id="pageTitle" type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
        </div>
        <Button onClick={savePreferences}>Save Preferences</Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <SimpleHeader headerColor={headerColor} logoColor={logoColor} pageTitle={pageTitle} />
      </div>
    </div>
  )
}

