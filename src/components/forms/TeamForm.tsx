
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TeamFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function TeamForm({ initialData, onSave, onCancel }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    image: initialData?.image || "/placeholder.svg",
    bio: initialData?.bio || "",
    linkedin: initialData?.social?.linkedin || "",
    twitter: initialData?.social?.twitter || "",
    github: initialData?.social?.github || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      position: formData.position,
      image: formData.image,
      bio: formData.bio,
      social: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github
      }
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
          placeholder="Enter job position"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Enter bio description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Profile Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="/placeholder.svg"
        />
      </div>

      <div className="space-y-4">
        <Label>Social Media Links</Label>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="LinkedIn profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            value={formData.twitter}
            onChange={(e) => handleChange("twitter", e.target.value)}
            placeholder="Twitter profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="GitHub profile URL"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {initialData ? "Update Team Member" : "Add Team Member"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
