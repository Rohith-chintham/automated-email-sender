
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailConfig from "@/components/EmailConfig";
import EmailComposer from "@/components/EmailComposer";
import EmailScheduler from "@/components/EmailScheduler";
import EmailHistory from "@/components/EmailHistory";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Python Email Automation</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Configure, compose, and schedule your emails with ease using this Python-powered email automation tool
          </p>
        </header>

        <Card className="border-blue-100 shadow-md">
          <CardContent className="p-0">
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-none rounded-t-lg bg-blue-50">
                <TabsTrigger value="config" className="data-[state=active]:bg-white">Configuration</TabsTrigger>
                <TabsTrigger value="compose" className="data-[state=active]:bg-white">Compose</TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-white">Schedule</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white">History</TabsTrigger>
              </TabsList>
              <TabsContent value="config" className="p-6">
                <EmailConfig />
              </TabsContent>
              <TabsContent value="compose" className="p-6">
                <EmailComposer />
              </TabsContent>
              <TabsContent value="schedule" className="p-6">
                <EmailScheduler />
              </TabsContent>
              <TabsContent value="history" className="p-6">
                <EmailHistory />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>
            Python Email Automation • Built with React and shadcn/ui
          </p>
          <p className="mt-1">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-mono">
              pip install automated-email-sender
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
