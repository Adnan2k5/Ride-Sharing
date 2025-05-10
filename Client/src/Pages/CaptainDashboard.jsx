"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { AddRide, GetRides, RideDelelte, UpdateRide } from "../Api/Ride_Api"
import { MapPin, Clock, Calendar, Plus, Pencil, DollarSign, BarChart3, Car, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export const CaptainDashboard = () => {
  const captain = useSelector((state) => state.user.user)
  const [rides, setRides] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editRide, setEditRide] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  let profit = 0
  if (rides?.length !== 0 && rides !== "No rides found") {
    for (let i = 0; i < rides.length; i++) {
      const price = Number.parseFloat(rides[i]?.status === "booked" ? rides[i]?.price : 0)
      profit = profit + price
    }
  } else {
    profit = 0
  }

  const formattedRides =
    rides !== "No rides found"
      ? rides?.map((ride) => ({
        key: ride.id,
        source: ride.source,
        destination: ride.destination,
        date: ride.date,
        time: ride.time,
        price: ride.price,
        status: ride.status,
      }))
      : []

  const getRides = async () => {
    setIsLoading(true)
    if (captain?.id) {
      try {
        const res = await GetRides(captain?.id)
        if (res) {
          setRides(res.sort((a, b) => new Date(b.date) - new Date(a.date)))
        } else {
          setRides([])
        }
      } catch (err) {
        console.log(err)
        toast.error("Failed to fetch rides")
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (captain) {
      getRides()
    }
  }, [captain])

  // Handle form submissions
  const onSubmit = async (data) => {
    try {
      const captain_id = captain.id
      const captainName = captain.name
      const ride = { ...data, captain_id, captainName }

      const res = await AddRide(ride)
      if (res) {
        toast.success("Ride added successfully")
        getRides()
        reset()
      }
    } catch (error) {
      toast.error("Failed to add ride")
    }
  }

  const onEdit = async (data) => {
    try {
      const res = await UpdateRide(data)
      if (res) {
        setIsOpen(false)
        toast.success("Ride updated successfully")
        getRides()
      }
    } catch (error) {
      toast.error("Failed to update ride")
    }
  }

  const handleEdit = (ride) => {
    setEditRide(ride)
    setIsOpen(true)
    setValue("source", ride.source)
    setValue("destination", ride.destination)
    setValue("date", ride.date)
    setValue("time", ride.time)
    setValue("price", ride.price)
    setValue("status", ride.status)
    setValue("id", ride.key)
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    if (status === "booked") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Booked</Badge>
    } else if (status === "expired") {
      return <Badge variant="destructive">Expired</Badge>
    } else {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Active
        </Badge>
      )
    }
  }

  const deleteRide = async (id) => {
    try {
      const res = await RideDelelte(id);
      if (res) {
        toast.success("Ride deleted successfully")
        getRides()
      }
    }
    catch (error) {
      toast.error("Failed to delete ride")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="backdrop-blur-sm border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome, {captain?.name || "Captain"}
            </h1>
            <p className="text-slate-500">Manage your rides and earnings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-10 w-10 border-2 border-blue-200">
              <AvatarImage src="/placeholder.svg" alt={captain?.name || "Captain"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {captain?.name?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Revenue</p>
                  <h3 className="text-2xl font-bold">₹{profit.toFixed(2)}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Rides</p>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {rides !== "No rides found" ? rides?.length || 0 : 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Booked Rides</p>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {rides !== "No rides found" ? rides?.filter((ride) => ride.status === "booked").length || 0 : 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="rides" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="rides">Manage Rides</TabsTrigger>
            <TabsTrigger value="add">Add New Ride</TabsTrigger>
          </TabsList>

          <TabsContent value="rides">
            <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Rides</CardTitle>
                <CardDescription>View and manage all your rides</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col gap-4">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="animate-pulse flex flex-col gap-2">
                          <div className="h-10 bg-slate-200 rounded w-full"></div>
                          <div className="h-10 bg-slate-200 rounded w-full"></div>
                        </div>
                      ))}
                  </div>
                ) : formattedRides.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formattedRides.map((ride) => (
                          <TableRow key={ride.key}>
                            <TableCell className="font-medium uppercase">{ride.source}</TableCell>
                            <TableCell className="uppercase">{ride.destination}</TableCell>
                            <TableCell>{ride.date}</TableCell>
                            <TableCell>{ride.time}</TableCell>
                            <TableCell>₹{ride.price}</TableCell>
                            <TableCell>
                              <StatusBadge status={ride.status} />
                            </TableCell>
                            <TableCell className="flex gap-5">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(ride)}
                                className="flex items-center gap-1"
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this ride?")) {
                                    deleteRide(ride.key);
                                  }
                                }}
                              >
                                <Trash className="h-3 w-3" />
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-slate-500">No rides found. Add your first ride!</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.querySelector('[data-value="add"]').click()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ride
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Add New Ride</CardTitle>
                <CardDescription>Create a new ride for passengers to book</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="source"
                          className="pl-10"
                          placeholder="Departure location"
                          {...register("source", { required: "Source is required" })}
                        />
                      </div>
                      {errors.source && <p className="text-sm text-red-500">{errors.source.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="destination"
                          className="pl-10"
                          placeholder="Destination location"
                          {...register("destination", { required: "Destination is required" })}
                        />
                      </div>
                      {errors.destination && <p className="text-sm text-red-500">{errors.destination.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="date"
                          className="pl-10"
                          type="date"
                          {...register("date", { required: "Date is required" })}
                        />
                      </div>
                      {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="time"
                          className="pl-10"
                          type="time"
                          {...register("time", { required: "Time is required" })}
                        />
                      </div>
                      {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="price"
                          className="pl-10"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register("price", {
                            required: "Price is required",
                            min: { value: 0.01, message: "Price must be greater than 0" },
                          })}
                        />
                      </div>
                      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ride
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Ride Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ride</DialogTitle>
            <DialogDescription>Make changes to your ride details here.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
            <input type="hidden" {...register("id")} />

            <div className="space-y-2">
              <Label htmlFor="edit-source">From</Label>
              <Input id="edit-source" {...register("source", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-destination">To</Label>
              <Input id="edit-destination" {...register("destination", { required: true })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input id="edit-date" type="date" {...register("date", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input id="edit-time" type="time" {...register("time", { required: true })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (₹)</Label>
              <Input id="edit-price" type="number" step="0.01" {...register("price", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select onValueChange={(value) => setValue("status", value)} defaultValue={editRide?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

