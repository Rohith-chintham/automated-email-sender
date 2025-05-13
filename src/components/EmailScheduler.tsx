
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Repeat, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScheduledEmail } from '@/types/email';

const EmailScheduler = () => {
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([
    {
      id: '1',
      subject: 'Weekly Newsletter',
      to: 'subscribers@example.com',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      frequency: 'weekly',
      status: 'scheduled',
    },
    {
      id: '2',
      subject: 'Monthly Report',
      to: 'team@example.com',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      frequency: 'monthly',
      status: 'scheduled',
    }
  ]);

  const [newSchedule, setNewSchedule] = useState<Partial<ScheduledEmail>>({
    subject: '',
    to: '',
    date: new Date(),
    frequency: 'once' as 'once' | 'daily' | 'weekly' | 'monthly',
    status: 'scheduled',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule({
      ...newSchedule,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setNewSchedule({
        ...newSchedule,
        date: date,
      });
    }
  };

  const handleFrequencyChange = (value: string) => {
    setNewSchedule({
      ...newSchedule,
      frequency: value as 'once' | 'daily' | 'weekly' | 'monthly',
    });
  };

  const scheduleEmail = () => {
    if (!newSchedule.subject || !newSchedule.to || !newSchedule.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    const email: ScheduledEmail = {
      id: Date.now().toString(),
      subject: newSchedule.subject || '',
      to: newSchedule.to || '',
      date: newSchedule.date || new Date(),
      frequency: newSchedule.frequency || 'once',
      status: 'scheduled',
    };

    setScheduledEmails([...scheduledEmails, email]);
    setNewSchedule({
      subject: '',
      to: '',
      date: new Date(),
      frequency: 'once',
      status: 'scheduled',
    });
    toast.success('Email scheduled successfully');
  };

  const deleteScheduledEmail = (id: string) => {
    setScheduledEmails(scheduledEmails.filter(email => email.id !== id));
    toast.info('Scheduled email removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Email Scheduler</h2>
        <p className="text-slate-600 mb-6">
          Schedule emails to be sent automatically at specific times
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            name="to"
            placeholder="recipient@example.com"
            value={newSchedule.to}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Email subject"
            value={newSchedule.subject}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newSchedule.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newSchedule.date ? format(newSchedule.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newSchedule.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select 
              value={newSchedule.frequency} 
              onValueChange={handleFrequencyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={scheduleEmail}>
            <Clock className="mr-2 h-4 w-4" />
            Schedule Email
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Scheduled Emails</h3>
        
        <div className="border rounded-lg overflow-hidden">
          {scheduledEmails.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledEmails.map((email) => (
                  <tr key={email.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{email.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(email.date, "PPP")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Repeat className="mr-1 h-4 w-4 text-blue-500" />
                        {email.frequency.charAt(0).toUpperCase() + email.frequency.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteScheduledEmail(email.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No scheduled emails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailScheduler;
