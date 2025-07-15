import ContactForm from "@/components/public/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="text-lg text-center mt-4 text-gray-600">
          Have a project in mind? We'd love to hear about it.
        </p>
        <div className="mt-12 p-8 border rounded-lg shadow-sm bg-white">
            <ContactForm />
        </div>
      </div>
    </div>
  );
}