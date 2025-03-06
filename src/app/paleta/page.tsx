import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PaletaPage() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="container mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-neutral">Paleta de Colores Personalizada</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Colores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-primary rounded-lg text-primary-foreground text-center">Primary<br/>#4A90E2</div>
            <div className="p-6 bg-secondary rounded-lg text-secondary-foreground text-center">Secondary<br/>#F0F4F8</div>
            <div className="p-6 bg-accent rounded-lg text-accent-foreground text-center">Accent<br/>#FF6B6B</div>
            <div className="p-6 bg-neutral rounded-lg text-neutral-foreground text-center">Neutral<br/>#333333</div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Botones</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Tarjetas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tarjeta Principal</CardTitle>
                <CardDescription>Descripción de la tarjeta con estilo primario</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de la tarjeta utilizando los colores de la paleta personalizada.</p>
              </CardContent>
              <CardFooter>
                <Button>Acción</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Tarjeta Secundaria</CardTitle>
                <CardDescription className="text-secondary-foreground/70">Descripción con estilo secundario</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de la tarjeta utilizando el color secundario de la paleta.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Acción</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-accent text-accent-foreground">
              <CardHeader>
                <CardTitle>Tarjeta Acento</CardTitle>
                <CardDescription className="text-accent-foreground/70">Descripción con estilo de acento</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de la tarjeta utilizando el color de acento de la paleta.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">Acción</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Formularios</h2>
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral">Nombre</label>
              <Input id="name" placeholder="Ingresa tu nombre" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral">Email</label>
              <Input id="email" type="email" placeholder="ejemplo@correo.com" />
            </div>
            <Button className="w-full">Enviar</Button>
          </div>
        </section>
      </div>
    </main>
  );
}