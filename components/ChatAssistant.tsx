
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2, X, CheckCircle, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isUpdating: boolean;
}

const ChatAssistant: React.FC<Props> = ({ messages, onSendMessage, isUpdating }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const AVATAR_URL = "https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-nBdZ6NXE5zfWOyBwvgFDCcMwYg5B9B.png";

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isUpdating) {
      onSendMessage(input);
      setInput('');
    }
  };

  if (!isOpen) {
      return (
        <div className="absolute bottom-6 right-6 z-[1000] flex flex-col items-end gap-2">
            {showHint && !isUpdating && messages.length === 0 && (
                <div 
                    className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 mb-2 animate-bounce cursor-pointer relative" 
                    onClick={() => setIsOpen(true)}
                >
                    <p className="text-sm font-bold text-indigo-600">Need recommendations?</p>
                    <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
                    <button onClick={(e) => { e.stopPropagation(); setShowHint(false); }} className="absolute -top-2 -left-2 bg-slate-200 rounded-full p-0.5"><X className="w-3 h-3 text-slate-500"/></button>
                </div>
            )}
            
            <button 
                onClick={() => { setIsOpen(true); setShowHint(false); }}
                className="w-20 h-20 transition transform hover:scale-110 group relative bg-transparent border-none outline-none focus:outline-none"
            >
                <img 
                    src={AVATAR_URL} 
                    alt="AriaTrip AI" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
                {messages.length > 0 && (
                    <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full border border-white z-10 shadow-sm"></span>
                )}
            </button>
        </div>
      );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 lg:left-auto lg:right-6 lg:bottom-6 z-[1000] flex flex-col items-end">
        <div className="bg-white w-full lg:w-96 h-[500px] max-h-[80vh] rounded-t-2xl lg:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <img src={AVATAR_URL} alt="Bot" className="w-8 h-8 rounded-full border border-white/20" />
                    <span className="font-bold text-sm">AriaTrip Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-slate-700 p-1 rounded transition">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.length === 0 && (
                    <div className="text-center text-slate-400 mt-10">
                        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Ask me anything!</p>
                        <p className="text-xs mt-1">"Best pizza nearby?"<br/>"Change Day 2 to Shopping"</p>
                    </div>
                )}
                
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                                    : msg.isPlanUpdate 
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-tl-none'
                                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                            }`}
                        >
                            {msg.isPlanUpdate && (
                                <div className="flex items-center gap-1 font-bold text-xs mb-1 text-emerald-700">
                                    <CheckCircle className="w-3 h-3" /> Plan Updated
                                </div>
                            )}
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isUpdating && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        className="w-full bg-slate-100 border-0 rounded-full pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isUpdating}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={isUpdating || !input.trim()}
                        className="absolute right-2 top-2 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ChatAssistant;
