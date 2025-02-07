'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

import { FileText, Image } from 'lucide-react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface ActionSearchBarProps {
  onTabChange: (tab: 'posts' | 'photos') => void;
  activeTab: 'posts' | 'photos';
  actions?: Action[];
}

// export interface Action {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   description?: string;
//   short?: string;
//   end?: string;
// }

export interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
  type: 'posts' | 'photos';
}

interface SearchResult {
  actions: Action[];
}

// const allActions = [
//   {
//     id: '1',
//     label: 'Book tickets',
//     icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
//     description: 'Operator',
//     short: '⌘K',
//     end: 'Agent',
//   },
//   {
//     id: '2',
//     label: 'Summarize',
//     icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
//     description: 'gpt-4o',
//     short: '⌘cmd+p',
//     end: 'Command',
//   },
//   {
//     id: '3',
//     label: 'Screen Studio',
//     icon: <Video className="h-4 w-4 text-purple-500" />,
//     description: 'gpt-4o',
//     short: '',
//     end: 'Application',
//   },
//   {
//     id: '4',
//     label: 'Talk to Jarvis',
//     icon: <AudioLines className="h-4 w-4 text-green-500" />,
//     description: 'gpt-4o voice',
//     short: '',
//     end: 'Active',
//   },
//   {
//     id: '5',
//     label: 'Translate',
//     icon: <Globe className="h-4 w-4 text-blue-500" />,
//     description: 'gpt-4o',
//     short: '',
//     end: 'Command',
//   },
// ];

// const allActions: Action[] = [
//   {
//     id: 'posts',
//     label: 'View Posts',
//     icon: <FileText className="h-4 w-4 text-blue-500" />,
//     description: 'Switch to posts view',
//     short: '⌘P',
//     end: 'Posts',
//     type: 'posts',
//   },
//   {
//     id: 'photos',
//     label: 'View Photos',
//     icon: <Image className="h-4 w-4 text-green-500" />,
//     description: 'Switch to photos view',
//     short: '⌘I',
//     end: 'Photos',
//     type: 'photos',
//   },
// ];

const defaultActions: Action[] = [
  {
    id: 'posts',
    label: 'Default View Posts',
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    description: 'Switch to posts view',
    type: 'posts',
  },
  {
    id: 'photos',
    label: 'Default View Photos',
    icon: <Image className="h-4 w-4 text-green-500" />,
    description: 'Switch to photos view',
    type: 'photos',
  },
];

function ActionSearchBar({
  onTabChange,
  activeTab,
  actions = defaultActions,
}: ActionSearchBarProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery) {
      setResult({ actions });
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredActions = actions.filter(action => {
      const searchableText = action.label.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    setResult({ actions: filteredActions });
  }, [debouncedQuery, isFocused, actions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action);
    setQuery(action.label);
    onTabChange(action.type);
    setIsFocused(false);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Reset selectedAction when focusing the input
  const handleFocus = () => {
    setSelectedAction(null);
    setIsFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !inputRef.current?.contains(event.target as Node) &&
        !suggestionsRef.current?.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <label
        className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block"
        htmlFor="search"
      >
        Search Commands
      </label>
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full max-w-sm sticky top-0 z-10 pb-1 dark:bg-neutral-950">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="What's up?"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              // onBlur={handleBlur}
              className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <AnimatePresence mode="popLayout">
                {query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {isFocused && result && !selectedAction && (
          <div
            ref={suggestionsRef}
            className="w-full max-w-sm absolute z-50 top-[36px]"
          >
            <AnimatePresence>
              <motion.div
                className="w-full border border-neutral-200 rounded-md shadow-sm overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <ScrollArea className="h-[150px]">
                  <motion.ul>
                    {result.actions.map(action => (
                      <motion.li
                        key={action.id}
                        className="px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900  cursor-pointer rounded-md"
                        variants={item}
                        layout
                        onClick={() => handleActionSelect(action)}
                      >
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{action.icon}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {action.label}
                            </span>
                            <span className="text-xs text-gray-400">
                              {action.description}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {action.short}
                          </span>
                          <span className="text-xs text-gray-400 text-right">
                            {action.end}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </ScrollArea>
                <div className="mt-2 px-3 py-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Press ⌘K to open commands</span>
                    <span>ESC to cancel</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export { ActionSearchBar };
