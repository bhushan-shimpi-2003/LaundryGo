import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Shirt,
  Star,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">LaundryGo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-lg font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium hover:text-primary"
            >
              Reviews
            </Link>
            <Link
              href="#contact"
              className="text-lg font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="flex text-lg items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" >Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Laundry Service, Simplified
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with local laundry services, schedule pickups, and
                  track your orders in real-time.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/image.png"
                alt="Laundry Service App"
                width="950"
                height="550"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features that Make Laundry Day Easier
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects you with the best laundry services in your
                area, making laundry day a breeze.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Nearby Services</h3>
              <p className="text-center text-muted-foreground">
                Find and connect with laundry services in your neighborhood.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Scheduled Pickups</h3>
              <p className="text-center text-muted-foreground">
                Schedule pickups at your convenience, with flexible time slots.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Real-time Tracking</h3>
              <p className="text-center text-muted-foreground">
                Track your laundry orders in real-time from pickup to delivery.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-center text-muted-foreground">
                Pay securely online with multiple payment options.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ratings & Reviews</h3>
              <p className="text-center text-muted-foreground">
                Read and leave reviews to help others find the best services.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Quality Guarantee</h3>
              <p className="text-center text-muted-foreground">
                All services come with a satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for you and your laundry needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Basic</h3>
                <p className="text-muted-foreground">
                  For occasional laundry needs
                </p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                9
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  /Piece
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Up to 5kg of laundry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>48-hour turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Standard cleaning</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Standard</h3>
                <p className="text-muted-foreground">
                  For regular laundry needs
                </p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                1199
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Up to 10kg of laundry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>24-hour turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Premium cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>2 orders per month</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Premium</h3>
                <p className="text-muted-foreground">
                  For frequent laundry needs
                </p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                2999
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Up to 25kg of laundry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Same-day service</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Premium cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>5 orders per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Priority scheduling</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Customers Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have
                to say about our service.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "LaundryGo has made my life so much easier. I no longer
                have to worry about finding time to do laundry."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                 src="/assets/passport.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">New York, NY</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "The service is reliable and the quality is excellent. I've been
                using LaundryGo for 6 months now and I'm very satisfied."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src="/assets/passport.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Vedant Shinde</p>
                  <p className="text-sm text-muted-foreground">
                    Parandwadi, Pune
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "I love the convenience of scheduling pickups and deliveries.
                The app is user-friendly and the service is top-notch."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src="/assets/passport.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Emily Davis</p>
                  <p className="text-sm text-muted-foreground">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get in Touch
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or need help? We're here for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <p>123 Main Street, New York, NY 10001</p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <p>(123) 456-7890</p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <p>info@LaundryGo.com</p>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter subject"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your message"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">LaundryGo</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 LaundryGo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
