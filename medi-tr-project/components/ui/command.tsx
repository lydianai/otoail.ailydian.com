"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
}

interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  onSelect?: () => void
}

interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandContext = React.createContext<{
  search: string
  setSearch: (search: string) => void
}>({
  search: "",
  setSearch: () => {},
})

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => {
    const [search, setSearch] = React.useState("")

    return (
      <CommandContext.Provider value={{ search, setSearch }}>
        <div
          ref={ref}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-gray-950",
            className
          )}
          {...props}
        />
      </CommandContext.Provider>
    )
  }
)
Command.displayName = "Command"

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, setSearch } = React.useContext(CommandContext)

    return (
      <div className="flex items-center border-b border-gray-200 px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          ref={ref}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
        {...props}
      />
    )
  }
)
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => {
    const { search } = React.useContext(CommandContext)

    if (!search) return null

    return (
      <div
        ref={ref}
        className={cn("py-6 text-center text-sm text-gray-500", className)}
        {...props}
      />
    )
  }
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden p-1 text-gray-950",
          className
        )}
        {...props}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
            {heading}
          </div>
        )}
        {children}
      </div>
    )
  }
)
CommandGroup.displayName = "CommandGroup"

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, disabled, onSelect, children, ...props }, ref) => {
    const { search } = React.useContext(CommandContext)

    // Simple search filter
    const text = React.useMemo(() => {
      const getText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node
        if (typeof node === "number") return String(node)
        if (Array.isArray(node)) return node.map(getText).join("")
        if (React.isValidElement(node) && node.props.children) {
          return getText(node.props.children)
        }
        return ""
      }
      return getText(children).toLowerCase()
    }, [children])

    const matches = !search || text.includes(search.toLowerCase())

    if (!matches) return null

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={() => !disabled && onSelect?.()}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandItem.displayName = "CommandItem"

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-gray-500",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 h-px bg-gray-200", className)}
      {...props}
    />
  )
)
CommandSeparator.displayName = "CommandSeparator"

const CommandDialog = ({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange?.(false)
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full max-w-lg">
        {children}
      </div>
    </div>
  )
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandDialog,
}
