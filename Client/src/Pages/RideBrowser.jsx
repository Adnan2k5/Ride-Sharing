"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { MapPin, MoveRight, CalendarClock, CreditCard, ChevronRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { bookRide, fetchRides } from "../Api/Ride_Api"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../Components/ui/card"
import { Button } from "../Components/ui/button"
import { Input } from "../Components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar"
import { Badge } from "../Components/ui/badge"
import { Separator } from "../Components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"

export const RideBrowser = () => {
  const time = new Date().getHours()
  const user = useSelector((state) => state.user.user)
  const [greet, setGreet] = useState("Good Morning")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    if (time > 12 && time < 18) {
      setGreet("Good Afternoon")
    } else if (time >= 18) {
      setGreet("Good Evening")
    } else if (time > 0 && time < 4) {
      setGreet("Good Night")
    }
  }, [time])

  const RideFetch = async () => {
    setIsLoading(true)
    try {
      const res = await fetchRides()
      if (res !== "No rides found") {
        setData(res.filter((ride) => ride.status === "active"))
      }
      else {
        setData(null)
      }
    } catch (error) {
      console.error("Error fetching rides:", error)
      toast.error("Error fetching rides", {
        description: "Please try again later",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    RideFetch()
  }, [])

  const rides =
    data !== "No rides found"
      ? data?.map((ride) => ({
        key: ride.id,
        from: ride.source,
        to: ride.destination,
        time: ride.time,
        price: ride.price,
        date: ride.date,
        captain: {
          name: ride.captainName,
          image: "/placeholder.svg", // Using placeholder for now
          rating: "4.5",
          id: ride.captainId,
        },
      }))
      : []

  const RideBook = async (ride) => {
    try {
      const response = await bookRide({ ...ride, userId: user.id })
      console.log(response)
      if (response.status === 200) {
        toast.success("Ride Booked Successfully");
      }
    } catch (error) {
      toast.error("Booking Failed", {
        description: "There was an error booking your ride",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-5 md:px-0">
      <div className="backdrop-blur-sm border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col mb-4 md:mb-0"
          >
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {greet}, {user?.name || "Rider"}
            </h1>
            <p className="text-slate-500">Ready for your next journey?</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to="/dashboard">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Find Your Ride</CardTitle>
                  <CardDescription>Enter your destination to find available rides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                    <MapPin className="text-blue-500" />
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Where to go?"
                    />
                    <Button size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-700">Available Rides</h2>
                <Badge variant="outline" className="bg-blue-50">
                  <Sparkles className="h-3 w-3 mr-1 text-blue-500" />
                  Rides
                </Badge>
              </div>

              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {isLoading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i} className="bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex animate-pulse flex-col gap-4">
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                            <div className="flex justify-between">
                              <div className="h-10 bg-slate-200 rounded w-1/4"></div>
                              <div className="h-10 bg-slate-200 rounded w-1/4"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : rides && rides.length > 0 ? (
                  rides.map((ride, index) => (
                    <motion.div key={ride.key || index} variants={item}>
                      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <MapPin className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="font-medium text-slate-700 uppercase">{ride.from}</span>
                                <div className="flex-1 border-t border-dashed border-slate-300 mx-2"></div>
                                <div className="bg-purple-100 p-2 rounded-full">
                                  <MapPin className="h-4 w-4 text-purple-600" />
                                </div>
                                <span className="font-medium text-slate-700 uppercase">{ride.to}</span>
                              </div>

                              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <CalendarClock className="h-4 w-4" />
                                  <span>{ride.time}</span>
                                </div>
                                <div className="flex items-center gap-1 font-semibold text-green-600">
                                  <span>₹{ride.price}</span>
                                  <Badge variant="outline" className="ml-1 bg-green-50 text-green-600 border-green-200">
                                    Best Price
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={ride.captain.image} alt={ride.captain.name} />
                                  <AvatarFallback>{ride.captain.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{ride.captain.name}</p>
                                  <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm">{ride.captain.rating}</span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                onClick={() => RideBook(ride)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md"
                              >
                                Book Ride
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <p className="text-slate-500 py-8">No rides available at the moment</p>
                      <Button variant="outline" onClick={RideFetch}>
                        Refresh
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Account Balance</p>
                      <h3 className="text-2xl font-bold">₹3,000</h3>
                    </div>
                  </div>
                  <Separator className="my-4 bg-white/20" />
                  <div className="flex justify-between items-center">
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Past Rides</CardTitle>
                  <CardDescription>Your recent journey history</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {rides && rides.length > 0 ? (
                      rides.slice(0, 3).map((ride, index) => (
                        <motion.div key={index} variants={item}>
                          <Card className="bg-slate-50 border-none">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-medium text-slate-500 uppercase">{ride.from}</span>
                                      <MoveRight className="h-3 w-3 text-slate-400" />
                                      <span className="text-xs font-medium text-slate-500 uppercase">{ride.to}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{ride.date || "Today"}</p>
                                  </div>
                                </div>
                                <span className="font-medium text-green-600">₹{ride.price}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-slate-500 py-4">No past rides</p>
                    )}
                  </motion.div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/dashboard">
                    <Button variant="ghost" className="w-full justify-between">
                      View All Rides
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

