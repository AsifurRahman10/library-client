import { Github, Menu } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Separator } from '../components/ui/separator'

export const Navbar = () => {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          📚 BookStore
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2" href="#">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2" href="#books">
                Books
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2" href="#about">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <Input placeholder="Search books..." className="w-56" />
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
          <Button>Login</Button>
        </div>

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
                Books
              </a>
              <a href="#about" className="text-sm font-medium">
                About
              </a>
              <Separator />
              <Input placeholder="Search books..." />
              <Button className="w-full">Login</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
