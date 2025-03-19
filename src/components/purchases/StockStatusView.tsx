import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StockStatusTable from './StockStatusTable';
import { fetchStockStatus, saveStockStatus } from '@/lib/database';
import { StockStatusItem } from './types';

const StockStatusView = () => {
  const [stockItems, setStockItems] = useState<StockStatusItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadStockStatus = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStockStatus();
        setStockItems(data || []);
      } catch (error) {
        console.error('Error loading stock status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStockStatus();
  }, []);

  const handleOpeningBalChange = (id: string, value: number) => {
    setStockItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, opening_bal: value } : item
      )
    );
  };

  const handleAdjustmentChange = (id: string, value: number) => {
    setStockItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, adj_plus: value } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      await saveStockStatus(stockItems);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving stock status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Stock Status</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
      <StockStatusTable
        items={stockItems}
        isLoading={isLoading}
        isEditing={isEditing}
        onOpeningBalChange={handleOpeningBalChange}
        onAdjustmentChange={handleAdjustmentChange}
      />
    </div>
  );
};

export default StockStatusView;