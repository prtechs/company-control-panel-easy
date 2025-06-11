
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Code, 
  Smartphone, 
  Globe, 
  Shield,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  Image,
  FileText
} from "lucide-react";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { PortfolioForm } from "@/components/forms/PortfolioForm";
import { TeamForm } from "@/components/forms/TeamForm";
import { TestimonialForm } from "@/components/forms/TestimonialForm";
import { SiteSettingsForm } from "@/components/forms/SiteSettingsForm";

// Mock data based on Klypso Tech website
const initialServices = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications using modern frameworks",
    icon: "Globe",
    features: ["React/Vue/Angular", "Node.js Backend", "Database Integration"],
    price: "Starting at $2,999"
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications",
    icon: "Smartphone",
    features: ["iOS & Android", "React Native", "Flutter"],
    price: "Starting at $4,999"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User-centered design for optimal user experience",
    icon: "Code",
    features: ["Wireframing", "Prototyping", "User Testing"],
    price: "Starting at $1,999"
  },
  {
    id: 4,
    title: "Cybersecurity Solutions",
    description: "Comprehensive security for your digital assets",
    icon: "Shield",
    features: ["Security Audits", "Penetration Testing", "Compliance"],
    price: "Starting at $3,999"
  }
];

const initialPortfolio = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Web Development",
    status: "Completed"
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    description: "Patient management system for healthcare providers",
    image: "/placeholder.svg",
    technologies: ["React Native", "Firebase"],
    category: "Mobile Development",
    status: "In Progress"
  }
];

const initialTeam = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO & Founder",
    image: "/placeholder.svg",
    bio: "10+ years of experience in technology leadership",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    image: "/placeholder.svg",
    bio: "Expert in full-stack development and system architecture",
    social: { linkedin: "#", github: "#" }
  }
];

const initialTestimonials = [
  {
    id: 1,
    name: "Mike Johnson",
    company: "TechCorp Inc.",
    role: "CEO",
    content: "Klypso Tech delivered an exceptional web application that exceeded our expectations.",
    rating: 5,
    image: "/placeholder.svg"
  }
];

export function ContentManagement() {
  const [services, setServices] = useState(initialServices);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [team, setTeam] = useState(initialTeam);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    setEditingType(type);
    setIsSheetOpen(true);
  };

  const handleDelete = (id: number, type: string) => {
    switch (type) {
      case 'services':
        setServices(services.filter(item => item.id !== id));
        break;
      case 'portfolio':
        setPortfolio(portfolio.filter(item => item.id !== id));
        break;
      case 'team':
        setTeam(team.filter(item => item.id !== id));
        break;
      case 'testimonials':
        setTestimonials(testimonials.filter(item => item.id !== id));
        break;
    }
  };

  const handleSave = (data: any, type: string) => {
    const newId = Date.now();
    
    switch (type) {
      case 'services':
        if (editingItem) {
          setServices(services.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setServices([...services, { ...data, id: newId }]);
        }
        break;
      case 'portfolio':
        if (editingItem) {
          setPortfolio(portfolio.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setPortfolio([...portfolio, { ...data, id: newId }]);
        }
        break;
      case 'team':
        if (editingItem) {
          setTeam(team.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setTeam([...team, { ...data, id: newId }]);
        }
        break;
      case 'testimonials':
        if (editingItem) {
          setTestimonials(testimonials.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setTestimonials([...testimonials, { ...data, id: newId }]);
        }
        break;
    }
    
    setEditingItem(null);
    setEditingType("");
    setIsSheetOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    const icons = { Globe, Smartphone, Code, Shield };
    return icons[iconName as keyof typeof icons] || Globe;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage your Klypso Tech website content</p>
        </div>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Site Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Services Management</h2>
            <Sheet open={isSheetOpen && editingType === 'services'} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => { setEditingItem(null); setEditingType('services'); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>{editingItem ? 'Edit Service' : 'Add New Service'}</SheetTitle>
                  <SheetDescription>
                    {editingItem ? 'Update service details' : 'Add a new service to your website'}
                  </SheetDescription>
                </SheetHeader>
                <ServiceForm 
                  initialData={editingItem} 
                  onSave={(data) => handleSave(data, 'services')} 
                  onCancel={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => {
                    const IconComponent = getIconComponent(service.icon);
                    return (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">{service.title}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">{service.description}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.price}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {service.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(service, 'services')}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(service.id, 'services')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Portfolio Management</h2>
            <Sheet open={isSheetOpen && editingType === 'portfolio'} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => { setEditingItem(null); setEditingType('portfolio'); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>{editingItem ? 'Edit Project' : 'Add New Project'}</SheetTitle>
                  <SheetDescription>
                    {editingItem ? 'Update project details' : 'Add a new project to your portfolio'}
                  </SheetDescription>
                </SheetHeader>
                <PortfolioForm 
                  initialData={editingItem} 
                  onSave={(data) => handleSave(data, 'portfolio')} 
                  onCancel={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project, 'portfolio')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id, 'portfolio')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Team Management</h2>
            <Sheet open={isSheetOpen && editingType === 'team'} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => { setEditingItem(null); setEditingType('team'); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>{editingItem ? 'Edit Team Member' : 'Add New Team Member'}</SheetTitle>
                  <SheetDescription>
                    {editingItem ? 'Update team member details' : 'Add a new team member'}
                  </SheetDescription>
                </SheetHeader>
                <TeamForm 
                  initialData={editingItem} 
                  onSave={(data) => handleSave(data, 'team')} 
                  onCancel={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.id}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member, 'team')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(member.id, 'team')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Testimonials Management</h2>
            <Sheet open={isSheetOpen && editingType === 'testimonials'} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => { setEditingItem(null); setEditingType('testimonials'); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Testimonial
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>{editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}</SheetTitle>
                  <SheetDescription>
                    {editingItem ? 'Update testimonial details' : 'Add a new client testimonial'}
                  </SheetDescription>
                </SheetHeader>
                <TestimonialForm 
                  initialData={editingItem} 
                  onSave={(data) => handleSave(data, 'testimonials')} 
                  onCancel={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role} at {testimonial.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial, 'testimonials')}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id, 'testimonials')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Site Settings</h2>
            <SiteSettingsForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
