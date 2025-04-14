
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar, CircleUser, Truck, MessageCircle, HelpCircle, Share2 } from 'lucide-react';

// Mock item data
const MOCK_ITEMS = [
  {
    id: "1",
    title: 'Working Laptop',
    category: 'Electronics',
    description: `This is a fully functional laptop that I no longer need. It's perfect for basic computing needs like web browsing, document editing, and streaming videos. The battery still holds a good charge (about 3-4 hours of use).

Specifications:
- Intel Core i5 processor
- 8GB RAM
- 256GB SSD
- Windows 10 (freshly reset)
- 14-inch display
- Includes charger and laptop bag

It has some minor cosmetic wear on the case but nothing that affects functionality. Great for students or anyone needing a reliable computer.`,
    condition: 'Good',
    weight: '4.5 lbs',
    dimensions: '13.5 x 9.5 x 0.8 inches',
    location: 'Brooklyn, NY',
    datePosted: '2023-06-15',
    distance: 2.5,
    donor: {
      name: 'Maria S.',
      joinDate: 'January 2023',
      donations: 8,
      rating: 4.9,
    },
    pickupOnly: false,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    questions: [
      {
        id: 1,
        user: 'Alex',
        text: 'Does the laptop come with any software installed?',
        date: '2023-06-16',
        answer: 'It has a fresh Windows 10 installation with standard apps only.'
      },
      {
        id: 2,
        user: 'Sam',
        text: 'How old is the laptop?',
        date: '2023-06-17',
        answer: 'It\'s about 3 years old but has been well maintained.'
      }
    ]
  },
  {
    id: "2",
    title: 'Sofa Set',
    category: 'Furniture',
    description: 'Comfortable three-seater sofa with matching armchair. Minor wear but in good condition.',
    condition: 'Good',
    weight: '80 lbs',
    dimensions: '84 x 36 x 38 inches (sofa), 36 x 36 x 38 inches (armchair)',
    location: 'Chicago, IL',
    datePosted: '2023-06-10',
    distance: 8.1,
    donor: {
      name: 'James T.',
      joinDate: 'March 2022',
      donations: 5,
      rating: 4.7,
    },
    pickupOnly: true,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    questions: []
  }
];

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeImage, setActiveImage] = useState(0);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Find the item with the matching ID
  const item = MOCK_ITEMS.find(item => item.id === id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <p className="mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/browse">Browse Items</a>
        </Button>
      </div>
    );
  }

  const handleRequest = () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to request items.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setShowRequestDialog(true);
  };

  const submitRequest = () => {
    setLoading(true);
    
    // Mock API call timing
    setTimeout(() => {
      setLoading(false);
      setShowRequestDialog(false);
      setRequestMessage('');
      
      toast({
        title: "Request Submitted",
        description: "Your request has been sent to the donor.",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  const submitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to ask questions.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!question.trim()) {
      return;
    }
    
    toast({
      title: "Question Submitted",
      description: "Your question has been sent to the donor.",
    });
    
    setQuestion('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={item.images[activeImage]} 
                alt={item.title} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
                    activeImage === index ? 'ring-2 ring-brand-green' : ''
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${item.title} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Right column - Item details */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <Badge>{item.category}</Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin size={14} className="mr-1" />
              <span>{item.location} ({item.distance.toFixed(1)} miles away)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar size={14} className="mr-1" />
              <span>Posted on {item.datePosted}</span>
            </div>
            
            {item.pickupOnly && (
              <div className="bg-yellow-50 text-yellow-800 px-3 py-2 rounded-md text-sm mb-6">
                This item is available for local pickup only
              </div>
            )}
            
            <div className="flex space-x-2 mb-6">
              <Button onClick={handleRequest} className="flex-1">
                Request Item
              </Button>
              <Button variant="outline" size="icon">
                <Share2 size={18} />
              </Button>
            </div>
            
            {/* Donor information card */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                    <CircleUser size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.donor.name}</h3>
                    <p className="text-xs text-gray-500">Member since {item.donor.joinDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <p className="text-lg font-semibold">{item.donor.donations}</p>
                    <p className="text-xs text-gray-500">Donations</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{item.donor.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Logistics information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium flex items-center mb-3">
                  <Truck size={18} className="mr-2" />
                  Logistics Information
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {item.pickupOnly 
                    ? "This item is available for local pickup only."
                    : "This item can be shipped or picked up locally."}
                </p>
                {!item.pickupOnly && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Weight:</span>
                      <span>{item.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dimensions:</span>
                      <span>{item.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Est. shipping cost:</span>
                      <span>$15-25</span>
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Note: Recipients only pay for shipping/delivery costs, not for the item itself.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Item tabs - Description & Questions */}
      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList className="mb-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="questions">Questions ({item.questions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-2">Item Details</h2>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Condition: </span>
                    <span>{item.condition}</span>
                  </div>
                  <div>
                    <span className="font-medium">Category: </span>
                    <span>{item.category}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="whitespace-pre-line text-gray-700">{item.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Questions & Answers</h2>
                
                <div className="mb-6">
                  <form onSubmit={submitQuestion}>
                    <div className="flex items-start space-x-2">
                      <Textarea 
                        placeholder="Ask a question about this item..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-grow"
                      />
                      <Button type="submit" disabled={!question.trim()}>Ask</Button>
                    </div>
                  </form>
                </div>
                
                {item.questions.length > 0 ? (
                  <div className="space-y-6">
                    {item.questions.map(q => (
                      <div key={q.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <CircleUser size={18} />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-sm">{q.user}</h4>
                              <span className="text-xs text-gray-500 ml-2">{q.date}</span>
                            </div>
                            <p className="text-sm mt-1">{q.text}</p>
                          </div>
                        </div>
                        
                        {q.answer && (
                          <div className="flex items-start gap-3 ml-11 bg-gray-50 p-3 rounded-md">
                            <div className="h-6 w-6 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                              <CircleUser size={14} />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium text-sm">{item.donor.name}</h4>
                                <span className="text-xs text-gray-500 ml-2">Donor</span>
                              </div>
                              <p className="text-sm mt-1">{q.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No questions yet</h3>
                    <p className="text-gray-500 mb-4">Be the first to ask about this item</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request "{item.title}"</DialogTitle>
            <DialogDescription>
              This item is free. You will only pay for logistics costs if you choose delivery.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Add a message to the donor (optional)</h4>
              <Textarea
                placeholder="Introduce yourself and explain why you're interested in this item..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">How do you want to receive this item?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <Card className="relative cursor-pointer border-brand-green">
                  <CardContent className="p-4 flex items-center h-full">
                    <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-brand-green" />
                    <div>
                      <h5 className="font-medium mb-1">Local Pickup</h5>
                      <p className="text-sm text-gray-500">Arrange to meet the donor to pick up the item</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className={`relative cursor-pointer ${item.pickupOnly ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4 flex items-center h-full">
                    <div>
                      <h5 className="font-medium mb-1">Delivery</h5>
                      <p className="text-sm text-gray-500">Have the item shipped to you for a fee</p>
                      {item.pickupOnly && (
                        <p className="text-xs text-red-500 mt-1">Not available for this item</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitRequest} disabled={loading || item.pickupOnly}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemDetailPage;
