import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StockStatusItem } from './types';

interface StockStatusTableProps {
  items: StockStatusItem[];
  isLoading: boolean;
  isEditing: boolean;
  onOpeningBalChange: (id: string, value: number) => void;
  onAdjustmentChange: (id: string, value: number) => void;
}

const StockStatusTable: React.FC<StockStatusTableProps> = ({
  items,
  isLoading,
  isEditing,
  onOpeningBalChange,
  onAdjustmentChange,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Opening Bal</TableHead>
            <TableHead className="text-right">Purchases</TableHead>
            <TableHead className="text-right">Utilised</TableHead>
            <TableHead className="text-right">Adj+/-</TableHead>
            <TableHead className="text-right">Closing Bal</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <Skeleton className="h-6 w-full" />
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={item.opening_bal}
                      onChange={(e) =>
                        onOpeningBalChange(item.id, parseFloat(e.target.value) || 0)
                      }
                      className="w-20 text-right"
                    />
                  ) : (
                    item.opening_bal.toFixed(2)
                  )}
                </TableCell>
                <TableCell className="text-right">{item.purchases.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.utilised.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={item.adj_plus}
                      onChange={(e) =>
                        onAdjustmentChange(item.id, parseFloat(e.target.value) || 0)
                      }
                      className="w-20 text-right"
                    />
                  ) : (
                    item.adj_plus.toFixed(2)
                  )}
                </TableCell>
                <TableCell className="text-right">{(item.opening_bal + item.purchases - item.utilised + item.adj_plus).toFixed(2)}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockStatusTable;