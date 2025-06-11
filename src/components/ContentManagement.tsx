
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Globe, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Search
} from "lucide-react";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { PortfolioForm } from "@/components/forms/PortfolioForm";
import { TeamForm } from "@/components/forms/TeamForm";
import { TestimonialForm } from "@/components/forms/TestimonialForm";
import { SiteSettingsForm } from "@/components/forms/SiteSettingsForm";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { 
  servicesService, 
  portfolioService, 
  teamService, 
  testimonialsService, 
  siteSettingsService 
} from "@/services/firebaseService";

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Firebase data hooks
  const { data: services, loading: servicesLoading, addItem: addService, updateItem: updateService, deleteItem: deleteService } = useFirebaseData(servicesService, "Service");
  const { data: portfolio, loading: portfolioLoading, addItem: addPortfolio, updateItem: updatePortfolio, deleteItem: deletePortfolio } = useFirebaseData(portfolioService, "Portfolio");
  const { data: team, loading: teamLoading, addItem: addTeam, updateItem: updateTeam, deleteItem: deleteTeam } = useFirebaseData(teamService, "Team Member");
  const { data: testimonials, loading: testimonialsLoading, addItem: addTestimonial, updateItem: updateTestimonial, deleteItem: deleteTestimonial } = useFirebaseData(testimonialsService, "Testimonial");
  const { data: siteSettings, loading: settingsLoading, addItem: addSetting, updateItem: updateSetting, deleteItem: deleteSetting } = useFirebaseData(siteSettingsService, "Site Setting");

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSave = async (data: any) => {
    const currentService = getCurrentService();
    const currentUpdateFunction = getCurrentUpdateFunction();
    const currentAddFunction = getCurrentAddFunction();

    if (editingItem) {
      await currentUpdateFunction(editingItem.id, data);
    } else {
      await currentAddFunction(data);
    }
    
    setEditingItem(null);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    const currentDeleteFunction = getCurrentDeleteFunction();
    await currentDeleteFunction(id);
  };

  const getCurrentService = () => {
    switch (activeTab) {
      case "services": return servicesService;
      case "portfolio": return portfolioService;
      case "team": return teamService;
      case "testimonials": return testimonialsService;
      case "settings": return siteSettingsService;
      default: return servicesService;
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "services": return services;
      case "portfolio": return portfolio;
      case "team": return team;
      case "testimonials": return testimonials;
      case "settings": return siteSettings;
      default: return services;
    }
  };

  const getCurrentAddFunction = () => {
    switch (activeTab) {
      case "services": return addService;
      case "portfolio": return addPortfolio;
      case "team": return addTeam;
      case "testimonials": return addTestimonial;
      case "settings": return addSetting;
      default: return addService;
    }
  };

  const getCurrentUpdateFunction = () => {
    switch (activeTab) {
      case "services": return updateService;
      case "portfolio": return updatePortfolio;
      case "team": return updateTeam;
      case "testimonials": return updateTestimonial;
      case "settings": return updateSetting;
      default: return updateService;
    }
  };

  const getCurrentDeleteFunction = () => {
    switch (activeTab) {
      case "services": return deleteService;
      case "portfolio": return deletePortfolio;
      case "team": return deleteTeam;
      case "testimonials": return deleteTestimonial;
      case "settings": return deleteSetting;
      default: return deleteService;
    }
  };

  const getCurrentForm = () => {
    switch (activeTab) {
      case "services":
        return <ServiceForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
      case "portfolio":
        return <PortfolioForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
      case "team":
        return <TeamForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
      case "testimonials":
        return <TestimonialForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
      case "settings":
        return <SiteSettingsForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
      default:
        return <ServiceForm initialData={editingItem} onSave={handleSave} onCancel={() => setDialogOpen(false)} />;
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case "services": return servicesLoading;
      case "portfolio": return portfolioLoading;
      case "team": return teamLoading;
      case "testimonials": return testimonialsLoading;
      case "settings": return settingsLoading;
      default: return servicesLoading;
    }
  };

  const filteredData = getCurrentData().filter(item => 
    Object.values(item).some(value => 
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const ContentCard = ({ item }: { item: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {item.title || item.name || item.key || "Untitled"}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {item.company && <Badge variant="secondary">{item.company}</Badge>}
        {item.role && <Badge variant="secondary">{item.role}</Badge>}
        {item.category && <Badge variant="secondary">{item.category}</Badge>}
        {item.rating && (
          <div className="flex">
            {[...Array(item.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {item.description || item.content || item.value || "No description available"}
        </CardDescription>
        {item.price && <p className="text-sm font-semibold mt-2 text-primary">{item.price}</p>}
        {item.technologies && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.technologies.map((tech: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Website Content Management</h2>
          <p className="text-muted-foreground">Manage all your website content from one place</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the details below" : "Fill in the details below to add new content"}
              </DialogDescription>
            </DialogHeader>
            {getCurrentForm()}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
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
            Settings
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="text-sm">
              {filteredData.length} items
            </Badge>
          </div>

          {getCurrentLoading() ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <TabsContent value={activeTab} className="mt-0">
              {filteredData.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Globe className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No content found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? "No items match your search." : "Get started by adding your first item."}
                    </p>
                    <Button onClick={() => setDialogOpen(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add New {activeTab.slice(0, -1)}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredData.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}
