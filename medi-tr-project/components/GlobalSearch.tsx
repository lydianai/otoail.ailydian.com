'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  X,
  Command,
  Users,
  Activity,
  Stethoscope,
  Pill,
  TestTube,
  Scan,
  Ambulance,
  Calendar,
  DollarSign,
  Settings,
  BarChart3,
  Building2,
  UserCheck,
  Package,
  FileText,
  Heart,
  Shield,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchItem {
  id: string
  title: string
  titleTR?: string
  description: string
  descriptionTR?: string
  category: string
  categoryTR?: string
  path: string
  icon: React.ReactNode
  keywords: string[]
  keywordsTR?: string[]
}

interface GlobalSearchProps {
  items: SearchItem[]
  placeholder?: string
  language?: 'en' | 'tr'
}

const moduleIcons: Record<string, React.ReactNode> = {
  patients: <Users className="h-4 w-4" />,
  dashboard: <BarChart3 className="h-4 w-4" />,
  emergency: <Ambulance className="h-4 w-4" />,
  laboratory: <TestTube className="h-4 w-4" />,
  pharmacy: <Pill className="h-4 w-4" />,
  radiology: <Scan className="h-4 w-4" />,
  inpatient: <Activity className="h-4 w-4" />,
  appointments: <Calendar className="h-4 w-4" />,
  billing: <DollarSign className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
  analytics: <BarChart3 className="h-4 w-4" />,
  administration: <Building2 className="h-4 w-4" />,
  staff: <UserCheck className="h-4 w-4" />,
  inventory: <Package className="h-4 w-4" />,
  examination: <Stethoscope className="h-4 w-4" />,
  medula: <Heart className="h-4 w-4" />,
  enabiz: <Shield className="h-4 w-4" />,
  quality: <FileText className="h-4 w-4" />,
  'operating-room': <Activity className="h-4 w-4" />,
}

export function GlobalSearch({ items, placeholder = 'Search...', language = 'en' }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Fuzzy search algorithm - handles typos and partial matches
  const fuzzyMatch = (text: string, query: string): number => {
    const textLower = text.toLowerCase()
    const queryLower = query.toLowerCase()

    // Exact match - highest score
    if (textLower === queryLower) return 100

    // Starts with - high score
    if (textLower.startsWith(queryLower)) return 90

    // Contains - medium score
    if (textLower.includes(queryLower)) return 70

    // Fuzzy match - character by character
    let score = 0
    let queryIndex = 0

    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += 50
        queryIndex++
      }
    }

    if (queryIndex === queryLower.length) {
      return Math.min(score, 60) // Partial fuzzy match
    }

    return 0
  }

  // Search and rank results
  const filteredItems = query.trim() === ''
    ? items.slice(0, 10)
    : items
        .map(item => {
          const title = language === 'tr' && item.titleTR ? item.titleTR : item.title
          const description = language === 'tr' && item.descriptionTR ? item.descriptionTR : item.description
          const keywords = language === 'tr' && item.keywordsTR ? item.keywordsTR : item.keywords

          const titleScore = fuzzyMatch(title, query)
          const descScore = fuzzyMatch(description, query)
          const keywordScore = Math.max(...keywords.map(k => fuzzyMatch(k, query)), 0)

          const maxScore = Math.max(titleScore, descScore, keywordScore)

          return { ...item, score: maxScore }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)

  // Group results by category
  const groupedResults = filteredItems.reduce((acc, item) => {
    const category = language === 'tr' && item.categoryTR ? item.categoryTR : item.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, typeof filteredItems>)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(0)
      }

      // Arrow navigation when open
      if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % filteredItems.length)
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
        }
        if (e.key === 'Enter' && filteredItems[selectedIndex]) {
          e.preventDefault()
          handleSelect(filteredItems[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = useCallback((item: SearchItem) => {
    router.push(item.path)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [router])

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">{placeholder}</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono text-gray-500 bg-white border border-gray-300 rounded">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 mt-12 sm:mt-20">
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                  setSelectedIndex(0)
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredItems.length === 0 && query.trim() !== '' ? (
                <div className="px-4 py-12 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {language === 'tr'
                      ? 'Farklı anahtar kelimeler deneyin'
                      : 'Try different keywords'}
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category} className="mb-4">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {category}
                      </div>
                      {items.map((item, index) => {
                        const globalIndex = filteredItems.indexOf(item)
                        const isSelected = globalIndex === selectedIndex
                        const title = language === 'tr' && item.titleTR ? item.titleTR : item.title
                        const description = language === 'tr' && item.descriptionTR ? item.descriptionTR : item.description

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                              isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                            )}
                          >
                            <div className={cn(
                              "p-2 rounded-lg",
                              isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                            )}>
                              {item.icon || moduleIcons[item.id.split('/')[2]] || <FileText className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{title}</div>
                              <div className="text-sm text-gray-500 truncate">{description}</div>
                            </div>
                            {isSelected && (
                              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↑↓</kbd>
                    {language === 'tr' ? 'Gezin' : 'Navigate'}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↵</kbd>
                    {language === 'tr' ? 'Seç' : 'Select'}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">esc</kbd>
                    {language === 'tr' ? 'Kapat' : 'Close'}
                  </span>
                </div>
                <span className="hidden sm:block">
                  {filteredItems.length} {language === 'tr' ? 'sonuç' : 'results'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
