import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Check, 
  X, 
  Clock, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  Package,
  Calendar,
  TrendingUp,
  Users,
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Trash2,
  MessageSquare,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

const API_URL = 'http://localhost:3001/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loginError, setLoginError] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        fetchRequests(token);
        fetchStatistics(token);
      } else {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchRequests(data.token);
        fetchStatistics(data.token);
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to connect to server. Please try again.');
    }
  };

  const fetchRequests = async (token = null) => {
    const authToken = token || localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_URL}/admin/inquiries`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const fetchStatistics = async (token = null) => {
    const authToken = token || localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_URL}/admin/statistics`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStatistics(data.data || statistics);
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  const updateRequestStatus = async (id, status) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_URL}/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, note: adminNote })
      });

      if (response.ok) {
        fetchRequests();
        fetchStatistics();
        setAdminNote('');
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_URL}/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchRequests();
        fetchStatistics();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
    }
  };

  const exportData = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_URL}/admin/export`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inquiries_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
    await fetchStatistics();
    setTimeout(() => setRefreshing(false), 500);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.country?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-2">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/656480d8b8b69d5d843a3f68b4f58718" 
              alt="Croxy Exim" 
              className="h-20 mx-auto mb-4 object-contain"
            />
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  defaultValue="admin"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter admin password"
                  required
                  className="mt-1"
                />
              </div>
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                  {loginError}
                </div>
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/656480d8b8b69d5d843a3f68b4f58718" 
                alt="Croxy Exim" 
                className="h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className={refreshing ? 'animate-spin' : ''}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                variant="destructive"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  setIsAuthenticated(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold">{statistics.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-orange-600">{statistics.today}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, email, company, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All ({statistics.total})
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pending')}
            >
              Pending ({statistics.pending})
            </Button>
            <Button
              variant={filterStatus === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('approved')}
            >
              Approved ({statistics.approved})
            </Button>
            <Button
              variant={filterStatus === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('rejected')}
            >
              Rejected ({statistics.rejected})
            </Button>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="grid gap-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No inquiries found</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-xl">{request.name}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status || 'pending'}
                          </span>
                        </Badge>
                        <Badge variant="outline">
                          {request.inquiry_type === 'product-request' ? 'Product Request' : 'General Inquiry'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{request.company || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{request.country || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <span>{request.product_interest || request.custom_product || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(request.created_at), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                      </div>
                      
                      {request.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">
                            <strong>Message:</strong> {request.message}
                          </p>
                        </div>
                      )}
                      
                      {request.quantity && (
                        <div className="mt-2 text-sm">
                          <strong>Quantity:</strong> {request.quantity}
                          {request.delivery_port && <span> | <strong>Port:</strong> {request.delivery_port}</span>}
                          {request.target_price && <span> | <strong>Target Price:</strong> {request.target_price}</span>}
                        </div>
                      )}
                      
                      {request.certifications && (
                        <div className="mt-2">
                          <strong className="text-sm">Required Certifications:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.certifications.split(',').map((cert, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cert.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={request.status === 'approved'}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        disabled={request.status === 'rejected'}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteRequest(request.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Inquiry Details</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRequest(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{selectedRequest.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label>Company</Label>
                  <p className="font-medium">{selectedRequest.company || 'N/A'}</p>
                </div>
                <div>
                  <Label>Country</Label>
                  <p className="font-medium">{selectedRequest.country || 'N/A'}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status || 'pending'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label>Product Interest</Label>
                <p className="font-medium">{selectedRequest.product_interest || selectedRequest.custom_product || 'N/A'}</p>
              </div>
              
              {selectedRequest.message && (
                <div>
                  <Label>Message</Label>
                  <p className="font-medium whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              )}
              
              <div>
                <Label>Add Note</Label>
                <Textarea
                  placeholder="Add an admin note..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    updateRequestStatus(selectedRequest.id, 'approved');
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    updateRequestStatus(selectedRequest.id, 'rejected');
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;