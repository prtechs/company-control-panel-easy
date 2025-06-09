
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Users, 
  Clock,
  User,
  Bot
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'visitor' | 'admin';
  timestamp: Date;
  senderName: string;
}

interface ChatSession {
  id: string;
  visitorName: string;
  visitorEmail?: string;
  status: 'active' | 'waiting' | 'ended';
  lastMessage: string;
  lastActivity: Date;
  unreadCount: number;
  messages: Message[];
}

export function LiveChat() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      visitorName: 'John Smith',
      visitorEmail: 'john@example.com',
      status: 'active',
      lastMessage: 'I need help with your pricing plans',
      lastActivity: new Date(Date.now() - 5 * 60000),
      unreadCount: 2,
      messages: [
        {
          id: '1',
          content: 'Hello, I need help with your pricing plans',
          sender: 'visitor',
          timestamp: new Date(Date.now() - 10 * 60000),
          senderName: 'John Smith'
        },
        {
          id: '2',
          content: 'Hi John! I\'d be happy to help you with our pricing. What specific information are you looking for?',
          sender: 'admin',
          timestamp: new Date(Date.now() - 8 * 60000),
          senderName: 'Admin'
        },
        {
          id: '3',
          content: 'I need help with your pricing plans',
          sender: 'visitor',
          timestamp: new Date(Date.now() - 5 * 60000),
          senderName: 'John Smith'
        }
      ]
    },
    {
      id: '2',
      visitorName: 'Sarah Johnson',
      status: 'waiting',
      lastMessage: 'Is anyone available to chat?',
      lastActivity: new Date(Date.now() - 15 * 60000),
      unreadCount: 1,
      messages: [
        {
          id: '1',
          content: 'Is anyone available to chat?',
          sender: 'visitor',
          timestamp: new Date(Date.now() - 15 * 60000),
          senderName: 'Sarah Johnson'
        }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chatSessions]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'admin',
      timestamp: new Date(),
      senderName: 'Admin'
    };

    setChatSessions(prev => prev.map(session => {
      if (session.id === selectedChat) {
        return {
          ...session,
          messages: [...session.messages, message],
          lastMessage: newMessage,
          lastActivity: new Date()
        };
      }
      return session;
    }));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedChatData = chatSessions.find(chat => chat.id === selectedChat);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat Sessions List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Live Chats
            <Badge variant="secondary" className="ml-auto">
              {chatSessions.filter(s => s.status === 'active').length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                  selectedChat === session.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedChat(session.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {session.visitorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(session.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{session.visitorName}</p>
                      {session.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {session.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.lastMessage}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {session.lastActivity.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2">
        {selectedChatData ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {selectedChatData.visitorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedChatData.visitorName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedChatData.status)}`} />
                    <span className="text-sm text-muted-foreground capitalize">
                      {selectedChatData.status}
                    </span>
                    {selectedChatData.visitorEmail && (
                      <span className="text-sm text-muted-foreground">
                        • {selectedChatData.visitorEmail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-[440px]">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChatData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === 'admin' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {message.sender === 'admin' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            message.senderName.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[70%] ${message.sender === 'admin' ? 'text-right' : ''}`}>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            message.sender === 'admin'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
