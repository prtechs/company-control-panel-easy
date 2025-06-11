
import { useState, useEffect } from 'react';
import { FirebaseService } from '@/services/firebaseService';
import { useToast } from '@/hooks/use-toast';

export function useFirebaseData(service: FirebaseService, collectionName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = service.subscribe((newData) => {
      setData(newData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [service]);

  const addItem = async (itemData: any) => {
    try {
      await service.add(itemData);
      toast({
        title: "Success",
        description: `${collectionName} added successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add ${collectionName}`,
        variant: "destructive",
      });
    }
  };

  const updateItem = async (id: string, itemData: any) => {
    try {
      await service.update(id, itemData);
      toast({
        title: "Success",
        description: `${collectionName} updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${collectionName}`,
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await service.delete(id);
      toast({
        title: "Success",
        description: `${collectionName} deleted successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${collectionName}`,
        variant: "destructive",
      });
    }
  };

  return {
    data,
    loading,
    addItem,
    updateItem,
    deleteItem
  };
}
