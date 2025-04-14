
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const MOCK_ITEMS = [
  {
    id: 1,
    title: 'Working Laptop',
    category: 'Electronics',
    description: 'Slightly used laptop in good condition. Perfect for students or basic computing needs.',
    location: 'Brooklyn, NY',
    datePosted: '2023-06-15',
    distance: 2.5,
    donor: 'Maria S.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww',
  },
  {
    id: 2,
    title: 'Sofa Set',
    category: 'Furniture',
    description: 'Comfortable three-seater sofa with armchair. Minor wear but in good condition.',
    location: 'Chicago, IL',
    datePosted: '2023-06-10',
    distance: 8.1,
    donor: 'James T.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 3,
    title: 'Computer Science Books',
    category: 'Books',
    description: 'Collection of programming and computer science textbooks. Great for CS students.',
    location: 'Austin, TX',
    datePosted: '2023-06-08',
    distance: 15.0,
    donor: 'Aisha M.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    title: 'Winter Clothing Set',
    category: 'Clothing',
    description: 'Winter coats, sweaters, and accessories. Various sizes for adults. Good condition.',
    location: 'Boston, MA',
    datePosted: '2023-06-05',
    distance: 12.3,
    donor: 'Robert K.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    title: 'Kitchen Appliances',
    category: 'Home',
    description: 'Various kitchen appliances including blender, toaster, and coffee maker. All in working condition.',
    location: 'Miami, FL',
    datePosted: '2023-05-30',
    distance: 20.5,
    donor: 'Sophia L.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 6,
    title: 'Kids Toys Assortment',
    category: 'Toys',
    description: 'Variety of children\'s toys for ages 3-8. All clean and in good condition.',
    location: 'Seattle, WA',
    datePosted: '2023-05-25',
    distance: 7.8,
    donor: 'David W.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95c3xlbnwwfHwwfHx8MA%3D%3D',
  },
];

// Categories for filtering
const CATEGORIES = [
  'Electronics', 'Furniture', 'Books', 'Clothing', 'Home', 'Toys', 'Sports', 'Other'
];

const BrowseItemsPage = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortOption, setSortOption] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort items
  const filteredItems = MOCK_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(item.category);
    const matchesDistance = item.distance <= maxDistance;
    
    return matchesSearch && matchesCategory && matchesDistance;
  }).sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
    } else if (sortOption === 'oldest') {
      return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
    } else if (sortOption === 'nearest') {
      return a.distance - b.distance;
    }
    return 0;
  });

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRequest = (itemId: number) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to request items.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your request has been sent to the donor.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Available Items</h1>
        <p className="text-gray-600">
          Explore items that people are sharing in your community. All items are free,
          you only pay for logistics if needed.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search items..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="nearest">Nearest First</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
              {selectedCategories.length > 0 && (
                <Badge className="ml-1 bg-brand-green">{selectedCategories.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Maximum Distance: {maxDistance} miles</h4>
              <Slider
                defaultValue={[maxDistance]}
                max={100}
                step={1}
                onValueChange={(values) => setMaxDistance(values[0])}
                className="mb-6"
              />
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxDistance(50);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <Badge>{item.category}</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.location} ({item.distance.toFixed(1)} miles away)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Posted on {item.datePosted}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Donated by {item.donor}</span>
                  <div className="space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/item/${item.id}`}>Details</Link>
                    </Button>
                    <Button size="sm" onClick={() => handleRequest(item.id)}>
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategories([]);
              setMaxDistance(50);
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BrowseItemsPage;
