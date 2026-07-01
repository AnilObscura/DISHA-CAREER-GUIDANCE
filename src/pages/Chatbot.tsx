// src/pages/Chatbot.tsx

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const { user, isLoading: userLoading } = useUser({ shouldRedirect: true });
  const [newMessage, setNewMessage] = useState("");
  const chatHistory = useQuery(api.chatbot.getHistory);
  const sendMessage = useMutation(api.chatbot.sendMessage);
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    setTimeout(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]');
            if (viewport) {
              viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, 100);
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const messageToSend = newMessage;
    setNewMessage("");
    setIsSending(true);

    try {
      await sendMessage({ message: messageToSend });
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessage(messageToSend);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Disha AI Mentor</CardTitle>
              <CardDescription>Your personal career assistant. Powered by Gemini.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {chatHistory === undefined || userLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-12 w-3/4 ml-auto" />
                  <Skeleton className="h-12 w-2/4" />
                </div>
              ) : (
                chatHistory.map((entry, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-blue-600 text-white p-3 rounded-lg max-w-sm">
                        <p>{entry.message}</p>
                      </div>
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name?.charAt(0) || <User />}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gray-200"><Bot /></AvatarFallback>
                      </Avatar>
                      <div className={cn("bg-gray-100 p-3 rounded-lg max-w-sm", entry.response === "..." && "animate-pulse")}>
                        {entry.response === "..." ? (
                           <div className="flex items-center gap-2">
                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                           </div>
                        ) : (
                          <p>{entry.response}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask about colleges, careers, assessments..."
              disabled={isSending}
            />
            <Button type="submit" disabled={!newMessage.trim() || isSending}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}