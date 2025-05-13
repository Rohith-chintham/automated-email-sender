
export interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  useSSL: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface ScheduledEmail {
  id: string;
  subject: string;
  to: string;
  date: Date;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  status: 'scheduled' | 'sent' | 'failed';
}

export interface EmailHistoryItem {
  id: string;
  subject: string;
  to: string;
  date: Date;
  status: 'delivered' | 'failed';
  failReason?: string;
}
