import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickReplies = [
  { id: 'dog-care', label: '🐶 Dog Care', emoji: '🐶' },
  { id: 'cat-care', label: '🐱 Cat Care', emoji: '🐱' },
  { id: 'hamster-care', label: '🐹⚙️ Hamster Care', emoji: '🐹⚙️' },
  { id: 'guinea-pig-care', label: '🐹🥕 Guinea Pig Care', emoji: '🐹🥕' },
  { id: 'fun-facts', label: '🐾 Fun Pet Facts', emoji: '🐾' },
  { id: 'why-paws', label: '❤️ Why Paws & Purpose?', emoji: '❤️' },
];

export function PawsBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: "Hi there! I'm PawsBot 🐾 I'm here to help you care for your furry (and scaly!) friends. Who would you like to learn about today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (userMessage: string, quickReply?: string) => {
    if (!userMessage.trim() && !quickReply) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage || quickReplies.find(q => q.id === quickReply)?.label || '',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('pawsbot-chat', {
        body: {
          messages: [...messages, userMsg].filter(m => m.id !== 'greeting').map(m => ({
            role: m.role,
            content: m.content,
          })),
          quickReply,
        },
      });

      if (error) throw error;

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('PawsBot error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Oops! I'm having a little trouble right now. Please try again! 🐾",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (quickReplyId: string) => {
    const reply = quickReplies.find(q => q.id === quickReplyId);
    if (reply) {
      sendMessage(reply.label, quickReplyId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-[hsl(340,60%,75%)] to-[hsl(280,45%,70%)]",
          "hover:scale-110 hover:shadow-xl",
          "animate-bounce-subtle"
        )}
        aria-label="Open PawsBot chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden",
          "bg-gradient-to-b from-[hsl(340,50%,97%)] to-[hsl(145,40%,97%)]",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(340,60%,80%)] to-[hsl(280,45%,75%)] p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-2xl shadow-md">
                🐾
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">PawsBot</h3>
              <p className="text-white/80 text-sm">Your friendly pet helper</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm",
                  msg.role === 'user'
                    ? "bg-gradient-to-br from-[hsl(280,45%,70%)] to-[hsl(340,60%,75%)] text-white rounded-br-md"
                    : "bg-white text-foreground rounded-bl-md border border-[hsl(340,30%,90%)]"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-[hsl(340,30%,90%)]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[hsl(340,60%,75%)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[hsl(280,45%,70%)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[hsl(145,50%,70%)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply.id)}
                disabled={isLoading}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full transition-all",
                  "bg-white border border-[hsl(340,30%,85%)] text-foreground",
                  "hover:bg-[hsl(340,50%,95%)] hover:border-[hsl(340,50%,75%)] hover:scale-105",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "shadow-sm"
                )}
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 pt-2 border-t border-[hsl(340,30%,90%)]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about pets..."
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-full px-4 py-2.5 text-sm border-2 transition-all",
                "border-[hsl(340,30%,88%)] bg-white",
                "focus:outline-none focus:border-[hsl(340,60%,75%)] focus:ring-2 focus:ring-[hsl(340,60%,75%)]/20",
                "placeholder:text-muted-foreground/60",
                "disabled:opacity-50"
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className={cn(
                "rounded-full h-10 w-10 shrink-0",
                "bg-gradient-to-br from-[hsl(340,60%,75%)] to-[hsl(280,45%,70%)]",
                "hover:from-[hsl(340,65%,70%)] hover:to-[hsl(280,50%,65%)]",
                "disabled:opacity-50"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
