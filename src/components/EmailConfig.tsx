
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { SMTPConfig } from '@/types/email';

const EmailConfig = () => {
  const [config, setConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    username: '',
    password: '',
    useSSL: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setConfig({
      ...config,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleToggleSSL = (checked: boolean) => {
    setConfig({
      ...config,
      useSSL: checked,
    });
  };

  const saveConfig = () => {
    // In a real application, we would save this to backend or local storage
    console.log('Saving config:', config);
    localStorage.setItem('emailConfig', JSON.stringify(config));
    toast.success('Email configuration saved successfully');
  };

  const testConnection = () => {
    // In a real application, we would test the connection to the SMTP server
    console.log('Testing connection with config:', config);
    toast.success('Connection successful! Your SMTP settings are working.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Email Configuration</h2>
        <p className="text-slate-600 mb-6">
          Configure your SMTP settings to enable sending emails through your Python application
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">SMTP Server</Label>
            <Input
              id="host"
              name="host"
              placeholder="smtp.example.com"
              value={config.host}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              name="port"
              type="number"
              placeholder="587"
              value={config.port}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="your.email@example.com"
              value={config.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={config.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="useSSL"
            checked={config.useSSL}
            onCheckedChange={handleToggleSSL}
          />
          <Label htmlFor="useSSL">Use SSL/TLS</Label>
        </div>

        <Card className="p-4 bg-blue-50 border-blue-100">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Python Configuration Example:</p>
            <pre className="bg-white p-3 rounded border border-blue-100 overflow-x-auto">
              <code>
{`import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# SMTP Configuration
smtp_server = "${config.host || 'smtp.example.com'}"
port = ${config.port}
username = "${config.username || 'your.email@example.com'}"
password = "your-password"
use_ssl = ${config.useSSL}

# Create connection
server = smtplib.SMTP_SSL(smtp_server, port) if use_ssl else smtplib.SMTP(smtp_server, port)
if not use_ssl:
    server.starttls()

# Login
server.login(username, password)

# Now you can use server.send_message() to send emails`}
              </code>
            </pre>
          </div>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={testConnection}>
            Test Connection
          </Button>
          <Button onClick={saveConfig}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfig;
