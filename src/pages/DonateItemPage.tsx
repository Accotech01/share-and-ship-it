
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, X } from 'lucide-react';

const DonateItemPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [pickupOnly, setPickupOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImages([...images, reader.result]);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !location || !condition) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call to save the donation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Donation Listed",
        description: "Your item has been listed for donation.",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Donate an Item</h1>
        <p className="text-gray-600">
          Share an item you no longer need with someone who could benefit from it.
          Fill in the details below to list your donation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Information</CardTitle>
          <CardDescription>
            Provide accurate details to help potential recipients find your item.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="E.g., Working Laptop, Winter Coat, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your item's condition, features, history, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home">Home & Kitchen</SelectItem>
                    <SelectItem value="Toys">Toys & Games</SelectItem>
                    <SelectItem value="Sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={condition} onValueChange={setCondition} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New (never used)</SelectItem>
                    <SelectItem value="Like New">Like New (used once or twice)</SelectItem>
                    <SelectItem value="Good">Good (some signs of use)</SelectItem>
                    <SelectItem value="Fair">Fair (noticeable wear but works fine)</SelectItem>
                    <SelectItem value="Poor">Poor (significant wear, still usable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Approximate Weight (optional)</Label>
                <Input
                  id="weight"
                  placeholder="E.g., 5 lbs, 2 kg, etc."
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions (optional)</Label>
                <Input
                  id="dimensions"
                  placeholder="E.g., 12 x 8 x 3 inches"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Your Location *</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Images (up to 5)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative h-32 rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={image} 
                      alt={`Item ${index + 1}`} 
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 bg-gray-50">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Add Photo</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tip: Clear photos from multiple angles help recipients make decisions.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="pickupOnly"
                checked={pickupOnly}
                onCheckedChange={(checked) => setPickupOnly(checked as boolean)}
              />
              <Label htmlFor="pickupOnly" className="text-sm cursor-pointer">
                This item is available for local pickup only (not eligible for shipping)
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Donate Item'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonateItemPage;
