import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Cómo la IA está transformando las pymes argentinas",
    excerpt: "Descubrí cómo las pequeñas y medianas empresas están aprovechando la inteligencia artificial para competir en el mercado actual.",
    date: "10 Mayo, 2023",
    readTime: "5 min",
    category: "Inteligencia Artificial"
  },
  {
    id: 2,
    title: "5 herramientas de automatización que toda pyme debería usar",
    excerpt: "Estas herramientas te ayudarán a optimizar procesos, ahorrar tiempo y reducir costos operativos en tu negocio.",
    date: "22 Abril, 2023",
    readTime: "7 min",
    category: "Automatización"
  },
  {
    id: 3,
    title: "Guía para implementar un CRM en tu empresa",
    excerpt: "Todo lo que necesitás saber para elegir e implementar un sistema de gestión de clientes que se adapte a tus necesidades.",
    date: "15 Marzo, 2023",
    readTime: "8 min",
    category: "Sistemas de Gestión"
  },
  {
    id: 4,
    title: "Transformación digital: por dónde empezar",
    excerpt: "Los primeros pasos que toda pyme debe dar para iniciar su proceso de transformación digital de manera efectiva.",
    date: "28 Febrero, 2023",
    readTime: "6 min",
    category: "Transformación Digital"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Blog
            </h1>
            <p className="text-xl text-neutral/80">
              Ideas, consejos y novedades sobre tecnología para pymes
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="text-sm text-neutral/60 mb-2 flex items-center gap-2">
                    <span className="bg-secondary px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-neutral/80">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center text-sm text-neutral/60 gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Leer más
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold text-primary">
              Suscribite a nuestro newsletter
            </h2>
            <p className="text-neutral/80">
              Recibí las últimas novedades y consejos sobre tecnología para pymes directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 flex-grow"
              />
              <Button className="bg-accent hover:bg-primary transition-colors">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}