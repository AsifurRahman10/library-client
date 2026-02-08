import { Menu } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'

export const Navbar = () => {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4 gap-20">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          📚 BookStore
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2 font-semibold" href="/">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 font-semibold"
                href="/books"
              >
                All Books
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 font-semibold"
                href="/add-book"
              >
                Add Book
              </NavigationMenuLink>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 font-semibold"
                href="/borrow-summery"
              >
                Borrow Summary
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="mt-6 flex flex-col gap-4">
              <a href="#" className="text-sm font-medium">
                Home
              </a>
              <a href="#books" className="text-sm font-medium">
                Add Book
              </a>
              <a href="#about" className="text-sm font-medium">
                All Books
              </a>
              <a href="#about" className="text-sm font-medium">
                Borrow Summary
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
