
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Gift, Truck, Calendar, MapPin, Heart } from 'lucide-react';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Mock data for demonstration
  const myDonations = [
    {
      id: 1,
      title: 'Working Laptop',
      category: 'Electronics',
      status: 'available',
      datePosted: '2023-06-15',
      location: 'Brooklyn, NY',
      requests: 2,
    },
    {
      id: 2,
      title: 'Children\'s Books',
      category: 'Books',
      status: 'claimed',
      datePosted: '2023-06-10',
      location: 'Brooklyn, NY',
      requests: 3,
    },
    {
      id: 3,
      title: 'Kitchen Appliances',
      category: 'Home',
      status: 'delivered',
      datePosted: '2023-06-05',
      location: 'Brooklyn, NY',
      requests: 1,
    },
  ];

  const myRequests = [
    {
      id: 101,
      title: 'Office Chair',
      category: 'Furniture',
      status: 'pending',
      dateRequested: '2023-06-17',
      owner: 'James T.',
      location: 'Queens, NY',
    },
    {
      id: 102,
      title: 'Winter Coat',
      category: 'Clothing',
      status: 'approved',
      dateRequested: '2023-06-12',
      owner: 'Sophia L.',
      location: 'Bronx, NY',
    },
    {
      id: 103,
      title: 'Art Supplies',
      category: 'Crafts',
      status: 'rejected',
      dateRequested: '2023-06-08',
      owner: 'Miguel R.',
      location: 'Manhattan, NY',
    },
  ];

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'claimed':
        return <Badge className="bg-blue-500">Claimed</Badge>;
      case 'delivered':
        return <Badge className="bg-gray-500">Delivered</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Declined</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser.name}! Manage your donations and requests here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">My Donations</CardTitle>
            <CardDescription className="text-2xl font-bold">{myDonations.length}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Gift className="h-5 w-5 text-brand-green mr-2" />
              <span className="text-sm text-gray-600">Items shared with others</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">My Requests</CardTitle>
            <CardDescription className="text-2xl font-bold">{myRequests.length}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-brand-orange mr-2" />
              <span className="text-sm text-gray-600">Items requested from others</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Impact</CardTitle>
            <CardDescription className="text-2xl font-bold">12 kg</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-600">Waste diverted through sharing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Items you've recently offered to the community</CardDescription>
              </CardHeader>
              <CardContent>
                {myDonations.slice(0, 3).map(donation => (
                  <div key={donation.id} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{donation.title}</h4>
                      {getStatusBadge(donation.status)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted {donation.datePosted}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{donation.location}</span>
                      {donation.requests > 0 && (
                        <Badge variant="outline" className="ml-2">
                          {donation.requests} request{donation.requests > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/dashboard/donations">View All Donations</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription>Items you've recently requested</CardDescription>
              </CardHeader>
              <CardContent>
                {myRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{request.title}</h4>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Requested {request.dateRequested}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>From {request.owner} in {request.location}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/dashboard/requests">View All Requests</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button asChild className="h-auto py-6 flex flex-col">
                  <Link to="/donate">
                    <Gift className="h-6 w-6 mb-2" />
                    <span>Donate Item</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-6 flex flex-col">
                  <Link to="/browse">
                    <Package className="h-6 w-6 mb-2" />
                    <span>Browse Items</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="h-auto py-6 flex flex-col">
                  <Link to="/logistics">
                    <Truck className="h-6 w-6 mb-2" />
                    <span>Manage Logistics</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>My Donations</CardTitle>
              <CardDescription>All items you're currently offering or have donated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myDonations.length === 0 ? (
                  <div className="text-center py-10">
                    <Gift className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No donations yet</h3>
                    <p className="text-gray-500 mb-4">Start sharing items you no longer need.</p>
                    <Button asChild>
                      <Link to="/donate">Donate an item</Link>
                    </Button>
                  </div>
                ) : (
                  myDonations.map(donation => (
                    <div key={donation.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-lg font-medium">{donation.title}</h4>
                        {getStatusBadge(donation.status)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">Category: </span>
                          <span>{donation.category}</span>
                        </div>
                        <div>
                          <span className="font-medium">Date Posted: </span>
                          <span>{donation.datePosted}</span>
                        </div>
                        <div>
                          <span className="font-medium">Location: </span>
                          <span>{donation.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {donation.requests} request{donation.requests !== 1 ? 's' : ''}
                        </span>
                        <div className="space-x-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/donations/${donation.id}`}>View Details</Link>
                          </Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/donate">Donate New Item</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>Items you've requested from others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.length === 0 ? (
                  <div className="text-center py-10">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No requests yet</h3>
                    <p className="text-gray-500 mb-4">Browse items and request what you need.</p>
                    <Button asChild>
                      <Link to="/browse">Browse Items</Link>
                    </Button>
                  </div>
                ) : (
                  myRequests.map(request => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-lg font-medium">{request.title}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">Category: </span>
                          <span>{request.category}</span>
                        </div>
                        <div>
                          <span className="font-medium">Date Requested: </span>
                          <span>{request.dateRequested}</span>
                        </div>
                        <div>
                          <span className="font-medium">From: </span>
                          <span>{request.owner} in {request.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        {request.status === 'approved' && (
                          <Button asChild size="sm">
                            <Link to={`/logistics/${request.id}`}>Arrange Logistics</Link>
                          </Button>
                        )}
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/requests/${request.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics">
          <Card>
            <CardHeader>
              <CardTitle>Logistics</CardTitle>
              <CardDescription>Manage pickup and delivery arrangements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Pending Logistics</h3>
                  <div className="space-y-4">
                    {myRequests.filter(req => req.status === 'approved').length === 0 ? (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <Truck className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No pending logistics arrangements</p>
                      </div>
                    ) : (
                      myRequests
                        .filter(req => req.status === 'approved')
                        .map(request => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{request.title}</h4>
                                <p className="text-sm text-gray-500">From {request.owner} in {request.location}</p>
                              </div>
                              <Badge className="bg-yellow-500">Logistics Needed</Badge>
                            </div>
                            <div className="mt-4 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Estimated cost:</span>
                                <span className="text-sm">$15-$25</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Estimated distance:</span>
                                <span className="text-sm">5.3 miles</span>
                              </div>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button asChild variant="outline" size="sm">
                                  <Link to={`/logistics/${request.id}/pickup`}>Arrange Pickup</Link>
                                </Button>
                                <Button asChild size="sm">
                                  <Link to={`/logistics/${request.id}/delivery`}>Schedule Delivery</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Logistics History</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Children's Books</h4>
                          <p className="text-sm text-gray-500">To Rebecca J. in Manhattan, NY</p>
                        </div>
                        <Badge className="bg-green-500">Completed</Badge>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Delivery date:</span>
                          <span className="text-sm">June 12, 2023</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Cost paid:</span>
                          <span className="text-sm">$18.50</span>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button asChild variant="ghost" size="sm">
                            <Link to="/logistics/history/1">View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
