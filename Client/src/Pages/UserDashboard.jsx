"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { CreditCard, Clock, CalendarClock, ChevronRight, MapPin, MoveRight, Car, History, Calendar } from "lucide-react"
import { fetchBookings } from "../Api/Ride_Api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../Components/ui/card"
import { Button } from "../Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar"
import { Badge } from "../Components/ui/badge"
import { Separator } from "../Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../Components/ui/dialog"
import { Label } from "../Components/ui/label"
import { Input } from "../Components/ui/input"

export const UserDashboard = () => {
  const state = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [pastRides, setPastRides] = useState([])
  const [futureRides, setFutureRides] = useState([])
  const [user, setuser] = useState()
  const [balance, setBalance] = useState(3000) // Mock balance - would come from API in real app
  const [addMoneyOpen, setAddMoneyOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (state.loading === false && state.user == null) {
      navigate("/login")
      return
    }
    setuser(state.user)
    loadRides()
  }, [state, navigate])

  const loadRides = async () => {
    setIsLoading(true)
    if (state.user !== null) {
      try {
        const allRides = await fetchBookings()

        // Filter rides for this user
        const userRides = Array.isArray(allRides) ? allRides.filter((ride) => ride.bookedBy === state.user?.id) : []

        console.log(userRides)

        const currentDate = new Date().getTime()

        // Split into past and future rides
        const past = []
        const future = []

        userRides.forEach((ride) => {
          const rideDate = new Date(ride.date).getTime()
          if (rideDate < currentDate) {
            past.push(ride)
          } else {
            future.push(ride)
          }
        })
        setPastRides(past)
        setFutureRides(future)
      } catch (error) {
        console.error("Error fetching rides:", error)
        toast.error("Failed to load your rides")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Animation variants
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

  const formatRideData = (rides) => {
    return rides.map((ride) => ({
      id: ride.id,
      from: ride.source,
      to: ride.destination,
      date: ride.date,
      time: ride.time,
      price: ride.price,
      status: ride.status,
      captainName: ride.captainName,
    }))
  }

  const formattedPastRides = formatRideData(pastRides)
  const formattedFutureRides = formatRideData(futureRides)

  const handleAddMoney = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev + Number(amount))
      setIsProcessing(false)
      setAddMoneyOpen(false)
      setAmount("")
      toast.success(`$${amount} added to your wallet`, {
        description: `Your new balance is $${(balance + Number(amount)).toFixed(2)}`,
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="backdrop-blur-sm border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your Dashboard
            </h1>
            <p className="text-slate-500">Manage your rides and account</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-10 w-10 border-2 border-blue-200">
              <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        {/* User Info & Balance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>Your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-blue-200">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name || "User"}</h3>
                      <p className="text-slate-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 md:ml-auto">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <History className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Past Rides</p>
                        <p className="font-semibold">{formattedPastRides.length}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Upcoming Rides</p>
                        <p className="font-semibold">{formattedFutureRides.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-600 to-purple-600 text-white h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Account Balance</p>
                    <h3 className="text-2xl font-bold">${balance.toFixed(2)}</h3>
                  </div>
                </div>
                <Separator className="my-4 bg-white/20" />
                <div className="flex justify-between items-center mt-auto">
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rides Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Rides</TabsTrigger>
              <TabsTrigger value="past">Past Rides</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Upcoming Rides</CardTitle>
                  <CardDescription>Rides you have scheduled for the future</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="animate-pulse flex flex-col gap-2">
                            <div className="h-20 bg-slate-200 rounded w-full"></div>
                          </div>
                        ))}
                    </div>
                  ) : formattedFutureRides.length > 0 ? (
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                      {formattedFutureRides.map((ride, index) => (
                        <motion.div key={ride.id || index} variants={item}>
                          <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                      <MapPin className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-slate-700 uppercase">{ride.from}</span>
                                    <MoveRight className="h-4 w-4 text-slate-400" />
                                    <div className="bg-purple-100 p-2 rounded-full">
                                      <MapPin className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <span className="font-medium text-slate-700 uppercase">{ride.to}</span>
                                  </div>

                                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                      <CalendarClock className="h-4 w-4" />
                                      <span>
                                        {ride.date} at {ride.time}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Car className="h-4 w-4" />
                                      <span>Captain: {ride.captainName || "Not assigned"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-green-600">${ride.price}</span>
                                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
                                  <Button size="sm" variant="outline">
                                    Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-500">You don't have any upcoming rides</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
                        Book a Ride
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="past">
              <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Past Rides</CardTitle>
                  <CardDescription>History of your completed rides</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="animate-pulse flex flex-col gap-2">
                            <div className="h-20 bg-slate-200 rounded w-full"></div>
                          </div>
                        ))}
                    </div>
                  ) : formattedPastRides.length > 0 ? (
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                      {formattedPastRides.map((ride, index) => (
                        <motion.div key={ride.id || index} variants={item}>
                          <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                      <MapPin className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-slate-700 uppercase">{ride.from}</span>
                                    <MoveRight className="h-4 w-4 text-slate-400" />
                                    <div className="bg-purple-100 p-2 rounded-full">
                                      <MapPin className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <span className="font-medium text-slate-700 uppercase">{ride.to}</span>
                                  </div>

                                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>
                                        {ride.date} at {ride.time}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Car className="h-4 w-4" />
                                      <span>Captain: {ride.captainName || "Not assigned"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-slate-700">${ride.price}</span>
                                  <Badge variant="outline" className="bg-slate-100">
                                    Completed
                                  </Badge>
                                  <Button size="sm" variant="outline">
                                    Receipt
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-500">You don't have any past rides</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full justify-between">
                    View All History
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
            <DialogDescription>Enter the amount you want to add to your wallet.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  placeholder="0.00"
                  min="1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMoneyOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddMoney}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Processing...
                </>
              ) : (
                "Add Money"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
