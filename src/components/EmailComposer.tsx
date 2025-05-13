
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { EmailTemplate } from '@/types/email';
import { PlusCircle, Save, SendHorizontal } from 'lucide-react';

const EmailComposer = () => {
  const [email, setEmail] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to our service!',
      body: 'Dear {{name}},\n\nWelcome to our service! We are excited to have you onboard.\n\nBest regards,\nThe Team'
    },
    {
      id: '2',
      name: 'Meeting Reminder',
      subject: 'Reminder: Upcoming Meeting on {{date}}',
      body: 'Hello {{name}},\n\nThis is a friendly reminder about our scheduled meeting on {{date}} at {{time}}.\n\nBest regards,\nThe Team'
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    body: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTemplate({
      ...newTemplate,
      [name]: value,
    });
  };

  const loadTemplate = (template: EmailTemplate) => {
    setEmail({
      ...email,
      subject: template.subject,
      body: template.body,
    });
    toast.info(`Template "${template.name}" loaded`);
  };

  const saveTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast.error('Please fill in all template fields');
      return;
    }

    const template = {
      id: Date.now().toString(),
      ...newTemplate
    };
    
    setTemplates([...templates, template]);
    setNewTemplate({ name: '', subject: '', body: '' });
    toast.success('Template saved successfully');
  };

  const sendEmail = () => {
    if (!email.to || !email.subject || !email.body) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real application, we would send this to the backend
    console.log('Sending email:', email);
    toast.success('Email sent successfully');
  };

  const recipients = email.to.split(',').filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Email Composer</h2>
        <p className="text-slate-600 mb-6">
          Create and send emails or save templates for later use
        </p>
      </div>

      <Tabs defaultValue="compose">
        <TabsList className="mb-4">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="create">Create Template</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <div>
              <Input
                id="to"
                name="to"
                placeholder="recipient@example.com (separate multiple emails with commas)"
                value={email.to}
                onChange={handleChange}
              />
              {recipients.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {recipients.map((recipient, index) => (
                    <Badge key={index} variant="secondary">
                      {recipient.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                name="cc"
                placeholder="cc@example.com"
                value={email.cc}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcc">BCC</Label>
              <Input
                id="bcc"
                name="bcc"
                placeholder="bcc@example.com"
                value={email.bcc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Email subject"
              value={email.subject}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              name="body"
              placeholder="Type your message here..."
              rows={10}
              value={email.body}
              onChange={handleChange}
              className="font-mono"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={sendEmail}>
              <SendHorizontal className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                  onClick={() => loadTemplate(template)}
                >
                  <h3 className="font-medium text-blue-700">{template.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{template.subject}</p>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {template.body}
                  </p>
                </div>
              ))}
            </div>
            {templates.length === 0 && (
              <p className="text-center text-slate-500 py-8">No templates available</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              name="name"
              placeholder="e.g., Welcome Email"
              value={newTemplate.name}
              onChange={handleTemplateChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateSubject">Subject</Label>
            <Input
              id="templateSubject"
              name="subject"
              placeholder="Email subject"
              value={newTemplate.subject}
              onChange={handleTemplateChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateBody">Template Content</Label>
            <p className="text-xs text-slate-500">
              Use {'{{name}}'} syntax for variables (e.g., {'{{name}}'}, {'{{date}}'})
            </p>
            <Textarea
              id="templateBody"
              name="body"
              placeholder="Type your template here..."
              rows={10}
              value={newTemplate.body}
              onChange={handleTemplateChange}
              className="font-mono"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={saveTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailComposer;
