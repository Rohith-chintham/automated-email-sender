
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Mail, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { EmailHistoryItem } from '@/types/email';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EmailHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [historyItems] = useState<EmailHistoryItem[]>([
    {
      id: '1',
      subject: 'Welcome to our service',
      to: 'john.doe@example.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'delivered'
    },
    {
      id: '2',
      subject: 'Your weekly report',
      to: 'jane.smith@example.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'delivered'
    },
    {
      id: '3',
      subject: 'Important announcement',
      to: 'team@example.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      status: 'failed',
      failReason: 'Recipient inbox full'
    },
    {
      id: '4',
      subject: 'Meeting reminder',
      to: 'alex@example.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
      status: 'delivered'
    },
    {
      id: '5',
      subject: 'Password reset',
      to: 'support@example.com',
      date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
      status: 'delivered'
    },
  ]);

  const filteredItems = historyItems.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const delivered = historyItems.filter(item => item.status === 'delivered').length;
  const failed = historyItems.filter(item => item.status === 'failed').length;
  const total = historyItems.length;
  
  const chartData = [
    { name: 'Delivered', value: delivered },
    { name: 'Failed', value: failed },
  ];
  
  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Email History</h2>
        <p className="text-slate-600 mb-6">
          View and search through your sent emails history
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{delivered}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failed}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex-shrink-0 mr-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-slate-500">To: {item.to}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-slate-400">
                        {format(item.date, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                      <Badge
                        variant={item.status === 'delivered' ? 'default' : 'destructive'}
                        className="ml-2"
                      >
                        {item.status === 'delivered' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Delivered
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" /> Failed
                          </>
                        )}
                      </Badge>
                    </div>
                    {item.failReason && (
                      <p className="text-xs text-red-600 mt-1">Reason: {item.failReason}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-gray-500">No emails found</div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Delivery Statistics</h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Success rate: <span className="font-bold text-green-600">{((delivered / total) * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">
          Showing most recent {filteredItems.length} emails
        </p>
        <Button variant="outline" size="sm">
          Export History
        </Button>
      </div>
    </div>
  );
};

export default EmailHistory;
