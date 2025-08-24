import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      // Fetch requests from localStorage
      const storedRequests = JSON.parse(localStorage.getItem('clientRequests') || '[]');
      setRequests(storedRequests);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - replace with proper authentication in production
    if (e.target.password.value === '70709081@MDsaad') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const updateRequestStatus = (id, status) => {
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('clientRequests', JSON.stringify(updatedRequests));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <img 
                src="/images/croxy-exim-logo.png" 
                alt="Croxy Exim Admin" 
                className="h-12 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold">Admin Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                name="password"
                placeholder="Enter admin password"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setIsAuthenticated(false);
            }}
          >
            Logout
          </Button>
        </div>
        
        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">{request.name}</h3>
                    <p className="text-gray-600">Email: {request.email}</p>
                    <p className="text-gray-600">Phone: {request.phone || 'N/A'}</p>
                    <p className="text-gray-600">Company: {request.company || 'N/A'}</p>
                    <p className="text-gray-600">Country: {request.country || 'N/A'}</p>
                    <p className="text-gray-600">Product: {request.productInterest || request.product || 'N/A'}</p>
                    {request.quantity && <p className="text-gray-600">Quantity: {request.quantity}</p>}
                    {request.deliveryPort && <p className="text-gray-600">Delivery Port: {request.deliveryPort}</p>}
                    {request.targetPrice && <p className="text-gray-600">Target Price: {request.targetPrice}</p>}
                    <p className="text-gray-600">Message: {request.message || 'No message provided'}</p>
                    <p className="text-sm text-gray-500">
                      Submitted on: {new Date(request.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => updateRequestStatus(request.id, 'approved')}
                      className={`${
                        request.status === 'approved' 
                          ? 'bg-green-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                      disabled={request.status === 'approved'}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateRequestStatus(request.id, 'rejected')}
                      variant="destructive"
                      disabled={request.status === 'rejected'}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status || 'Pending'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {requests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
