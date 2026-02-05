import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'

const Footer = () => (
  <footer className="w-full border-t bg-muted/40">
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold">📚 BookStore</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage, borrow, and explore books easily with our modern system.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 font-medium">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#books">Books</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-3 font-medium">Newsletter</h4>
          <div className="flex gap-2">
            <Input placeholder="Your email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </div>
  </footer>
)

export default Footer
